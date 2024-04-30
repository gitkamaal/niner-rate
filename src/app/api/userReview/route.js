import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';
import clientPromise from '../../../../mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../config/auth-config';

// Fetch a user's reviews from the 'reviews' collection
export async function GET(req) {
  try {
    // Get the user session
    const session = await getServerSession(authOptions);

    // If no session or user ID found, return an error
    if (!session || !session.user || !session.user.id) {
      console.error('No user session or user id found');
      return new NextResponse('User not authenticated', { status: 401 });
    }

    // Wait for the client connection
    const client = await clientPromise;

    // Access the database from the client
    const db = client.db('niner-rate');

    // Access the 'reviews' collection from the MongoDB database
    const reviewCollection = db.collection('reviews');

    // Get the host ID from the session data
    const hostId = session.user.id;

    // Query the 'reviews' collection to find documents with the given host ID
    const reviews = await reviewCollection.find({ host: hostId }).toArray();

    // If no reviews found, return an error
    if (!reviews || reviews.length === 0) {
      console.error(`No reviews found for host id: ${hostId}`);
      return new NextResponse(`No reviews found for host id: ${hostId}`, {
        status: 404,
      });
    }

    // Send a successful response with the reviews
    return NextResponse.json(reviews);
  } catch (error) {
    // Handle errors if fetching the reviews fails
    console.error('Error fetching user reviews:', error);
    // Use NextResponse to return an error
    return new NextResponse('Failed to fetch user reviews', { status: 500 });
  }
}
