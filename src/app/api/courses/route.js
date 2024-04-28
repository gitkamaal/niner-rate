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

export async function POST(req) {
  try {
    // Wait for the client connection
    const client = await clientPromise;

    // Access the database from the client
    const db = client.db('niner-rate');

    // Accesses the 'courses' collection from the MongoDB database, creating a reference to the collection
    const coursesCollection = db.collection('courses');

    // Parse the request body to get the course data
    const requestBody = await req.json();
    const { code, title, courseDescription, unccCatalogID, unccCourseID } = requestBody;

    // Create a new course object
    const newCourse = {
      code,
      title,
      courseDescription,
      unccCatalogID,
      unccCourseID,
    };

    console.log('New course:', newCourse);

    // Insert the new course into the database
    const result = await coursesCollection.insertOne(newCourse);

    // Check if the insertion was successful
    if (result.insertedId) {
      console.log('Inserted course:', newCourse);

      // Respond with the inserted course
      return NextResponse.json(newCourse, { status: 201 });
    } else {
      console.error('Failed to insert course: Inserted ID is missing');
      return new NextResponse('Failed to insert course', { status: 500 });
    }
  } catch (error) {
    // Log and return the error
    console.error('Failed to post course:', error);
    return new NextResponse('Failed to post course', { status: 500 });
  }
}