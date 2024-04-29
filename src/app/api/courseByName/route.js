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

    // Accesses the 'courses' collection from the MongoDB database, creating a reference to the collection
    const coursesCollection = db.collection('courses');

    // Parse the URL and query parameters
    const parsedUrl = url.parse(req.url, true);

    // Get the course code from the parsed query parameters
    const courseCode = parsedUrl.query.code;
    // Queries the 'courses' collection to find a document with the given course code
    const course = await coursesCollection.findOne({ code: courseCode });

    // If no course was found, return an error
    if (!course) {
      console.error(`No course found with code: ${courseCode}`);
      return new NextResponse(`No course found with code: ${courseCode}`, {
        status: 404,
      });
    }

    // Send a successful response with the course data
    return NextResponse.json(course);
  } catch (error) {
    // Handle errors if fetching the course fails
    console.error('Error fetching course:', error);
    // Use NextResponse to return an error
    return new NextResponse('Failed to fetch course', { status: 500 });
  }
}
