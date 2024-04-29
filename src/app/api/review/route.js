import clientPromise from '../../../../mongodb';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../config/auth-config';

async function connectToDatabase() {
  const client = await clientPromise;
  return client.db('niner-rate');
}

export async function POST(req) {
  try {
    console.log('POST request received');

    const session = await getServerSession(authOptions);
    console.log('User session: ', session);

    if (!session) {
      throw new Error('User is not authenticated');
    }

    const db = await connectToDatabase();
    console.log('Connected to the database');

    const requestBody = await req.json();
    console.log('Request Body:', requestBody);

    const { courseId, studentName, rating, review } = requestBody;

    const course = await db
      .collection('courses')
      .findOne({ _id: new ObjectId(courseId) });

    console.log('Course:', course);

    if (course) {
      const reviewId = new ObjectId();

      const newReview = {
        _id: reviewId,
        courseId,
        rating,
        studentName,
        review,
        host: session.user.id,
        createdAt: new Date(),
      };

      const result = await db.collection('reviews').insertOne(newReview);
      console.log('Insert Result:', result);

      if (result.insertedId) {
        console.log('Inserted review:', newReview);
        return new Response(JSON.stringify(newReview), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        console.error('Failed to insert review: Inserted ID is missing');
        return new Response('Failed to insert review', { status: 500 });
      }
    } else {
      console.log('No match found for course');
      return new Response(
        JSON.stringify({ message: 'No matching course found' }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  } catch (error) {
    console.error('Failed to post review:', error);
    return new Response(JSON.stringify({ message: 'Failed to post review' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function GET(req) {
  try {
    // Connect to the database
    const db = await connectToDatabase();

    // Log the request query parameters
    console.log('Request Query:', req.query);

    // Extract courseName from query parameters
    const { courseName } = req.query || {}; // Destructure courseName or default to an empty object if req.query is undefined
    console.log('Course Name:', courseName); // Log the courseName

    // Check if courseName is defined
    if (!courseName) {
      throw new Error('No courseName provided in the query parameters');
    }

    // Fetch reviews for the specified courseName
    const reviews = await db
      .collection('reviews')
      .find({ courseName })
      .toArray();

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
