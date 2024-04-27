import { NextResponse } from 'next/server';
import clientPromise from '../../../../mongodb';
import url from 'url';

// Fetch a course from the 'niner-rate.courses' collection by its code
export async function GET(req) {
  try {
    // Wait for the client connection
    const client = await clientPromise;

    // Access the database from the client
    const db = client.db('niner-rate');

    // Accesses the 'reviews' collection from the MongoDB database
    const reviewCollection = db.collection('reviews');

    // Parse the URL and query parameters
    const parsedUrl = url.parse(req.url, true);

    // Get the course code from the parsed query parameters
    const userId = parsedUrl.query.code;
    // Queries the 'review' collection to find a document with the given userID
    const review = await reviewCollection.findOne({ code: userId });

    // If no userId was found, return an error
    if (!review) {
      console.error(`No user id: ${userId}`);
      return new NextResponse(`No id found with: ${userId}`, {
        status: 404,
      });
    }

    // Send a successful response with the review
    return NextResponse.json(review);
  } catch (error) {
    // Handle errors if fetching the userId fails
    console.error('Error fetching user id:', error);
    // Use NextResponse to return an error
    return new NextResponse('Failed to fetch user id', { status: 500 });
  }
}
