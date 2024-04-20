import clientPromise from '../../../../mongodb';
import { ObjectId } from 'mongodb';

// Function to connect to the MongoDB database
async function connectToDatabase() {
  const client = await clientPromise;
  return client.db('niner-rate');
}

// Define the route handler for creating a new review
export async function POST(req) {
  try {
    console.log('POST request received'); // Log when a POST request is received

    // Connect to the database
    const db = await connectToDatabase();
    console.log('Connected to the database'); // Log when connected to the database

    // Extract data from the request body
    const requestBody = await req.json();
    console.log('Request Body:', requestBody); // Log the request body

    const { courseId, studentName, rating, review } = requestBody;
    // Find a matching course based on the courseName
    const course = await db
      .collection('courses')
      .findOne({ _id: new ObjectId(courseId) });

    console.log('Course:', course); // Log the found course

    if (course) {
      // Create a new ObjectId for the review
      const reviewId = new ObjectId();

      // Create a new review object
      const newReview = {
        _id: reviewId, // Assign a new ObjectId as the review's _id
        courseId, // Add the courseId to the review
        rating,
        studentName,
        review,
        createdAt: new Date(),
      };

      // Insert the new review into the database
      const result = await db.collection('reviews').insertOne(newReview);
      console.log('Insert Result:', result); // Log the insert result

      // Check if the insertion was successful
      if (result.insertedId) {
        console.log('Inserted review:', newReview); // Log the inserted review

        // Respond with the inserted review
        return new Response(JSON.stringify(newReview), {
          status: 201, // 201 Created status code for successful creation
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        console.error('Failed to insert review: Inserted ID is missing');
        return new Response('Failed to insert review', { status: 500 });
      }
    } else {
      console.log('No match found for course:', courseName); // Log if no match is found
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
    console.error('Failed to post review:', error); // Log any errors that occur
    return new Response(JSON.stringify({ message: 'Failed to post review' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Define the route handler for fetching reviews for a specific course
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
