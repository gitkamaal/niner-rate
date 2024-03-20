import { NextResponse } from 'next/server';
import clientPromise from '../../../../mongodb';

// Fetch the courses from the 'niner-rate.courses' collection
export async function GET(_req) {
  try {
    // Wait for the client connection
    const client = await clientPromise; 

    // Access the database from the client
    const db = client.db('niner-rate'); 
    
    // Accesses the 'courses' collection from the MongoDB database, creating a reference to the collection
    const coursesCollection = db.collection('courses');
    
    // Queries the 'courses' collection to find all documents within it and returns the result as an array
    const courses = await coursesCollection.find({}).toArray();

    // Send a successful response with the courses data
    return NextResponse.json(courses);

  } catch (error) {
    // Handle errors if fetching courses fails
    console.error('Error fetching courses:', error);
    // Use NextResponse to return an error
    return new NextResponse('Failed to fetch courses', { status: 500 }); 
  }
}