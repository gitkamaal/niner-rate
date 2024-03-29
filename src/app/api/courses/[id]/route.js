import { NextResponse } from 'next/server';
import clientPromise from '../../../../../mongodb';
import { ObjectId } from 'mongodb';

// Named export for the GET HTTP method
export async function GET(req) {
  try {
    // Extract the course ID from the request URL
    // Note: Adjust the way you access `id` based on how your URL parameters are being passed.
    const url = new URL(req.url, `http://${req.headers.host}`);
    const id = url.pathname.split('/').pop();

    // Convert the ID from a string to an ObjectId for MongoDB querying
    const objectId = new ObjectId(id);

    // Connect to the database
    const client = await clientPromise;
    const db = client.db('niner-rate');

    // Query for the specific course by its ObjectId
    const course = await db.collection('courses').findOne({ _id: objectId });

    // If the course doesn't exist, return a 404 response
    if (!course) {
      return new Response('Course not found', { status: 404 });
    }

    // Return the course data
    return new Response(JSON.stringify(course), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Log and return the error
    console.error('Failed to fetch course:', error);
    return new Response('Failed to fetch course', { status: 500 });
  }
}
