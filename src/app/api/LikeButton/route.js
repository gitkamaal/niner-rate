import clientPromise from '../../../../mongodb';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../config/auth-config';
import url from 'url';

async function connectToDatabase() {
  const client = await clientPromise;
  return client.db('niner-rate');
}

export async function POST(req, res) {
  try {
    console.log("LIKE BUTTON POST REQUEST");
    console.log('POST request received');

    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error('User is not authenticated');
    }

    const db = await connectToDatabase();
    console.log('Connected to the database');

    const requestBody = await req.json();
    console.log('Request Body:', requestBody);

    const reviewId = requestBody.reviewId;
    console.log(reviewId);
    // Check if courseId is valid
    if (!reviewId || typeof reviewId !== 'string') {
      throw new Error('Invalid reviewId');
    }

    // Check if the course exists
    const review = await db.collection('reviews').findOne({ _id: new ObjectId(reviewId) });
    if (!review) {
      throw new Error('Review not found');
    }

    //check if there is already a reaction
    //if there is update the reaction 
    const existingReaction = await db.collection('reactions').findOne({ reviewId: reviewId });

    if (existingReaction) {
      // If a reaction exists, update it
      const updatedReaction = {
        $set: {
          likeCount: requestBody.likeCount,
          dislikeCount: requestBody.dislikeCount,
          ModifiedDate: new Date()
        }
      };

      // Subtract 1 from the counts if necessary
      if (existingReaction.likeCount !== requestBody.likeCount) {
        updatedReaction.$set.likeCount = requestBody.likeCount + 1;
      }
      if (existingReaction.dislikeCount !== requestBody.dislikeCount) {
        updatedReaction.$set.dislikeCount = requestBody.dislikeCount;
      }

      const updateResult = await db.collection('reactions').updateOne({ reviewId: reviewId }, updatedReaction);
      console.log(updateResult);

      if (updateResult.modifiedCount === 1) {
        console.log('Reaction updated successfully');
        return new Response(JSON.stringify(updateResult), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        console.error('Failed to update reaction');
        return new Response('Failed to update reaction', { status: 500 });
      }
    } else {
      // If no reaction exists, insert a new one
      let newReaction = {
        reviewId: reviewId,
        likeCount: requestBody.likeCount,
        dislikeCount: requestBody.dislikeCount,
        CreatedDate: new Date()
      };

      console.log(newReaction);

      const insertResult = await db.collection('reactions').insertOne(newReaction);
      console.log(insertResult);

      if (insertResult.insertedId) {
        console.log('Inserted reaction:', insertResult);
        return new Response(JSON.stringify(insertResult), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        console.error('Failed to insert reaction: Inserted ID is missing');
        return new Response('Failed to insert reaction', { status: 500 });
      }
    }
  } catch (error) {
    console.error('Failed to process request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function GET(req) {
  try {
    // Connect to the database
    const db = await connectToDatabase();

    // Parse the URL and query parameters
    const parsedUrl = url.parse(req.url, true);

    // Log the request query parameters
    console.log('Request Query:', parsedUrl.query);
    // Get the course code from the parsed query parameters
    const reviewId = parsedUrl.query.reviewId;
    // Extract courseName from query parameters
    console.log('Review Id:', reviewId); // Log the courseName

    // Check if courseName is defined
    if (!reviewId) {
      throw new Error('No ID provided in the query parameters');
    }

    // Fetch reviews for the specified courseName
    const reviews = await db
      .collection('reactions')
      .findOne({ reviewId: reviewId });

    // Respond with the fetched reviews
    return new Response(JSON.stringify(reviews), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to fetch reviews' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
