import clientPromise from '../../../../../mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

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

    // Query for the reviews associated with the course
    const reviews = await db
      .collection('reviews')
      .find({ courseId: id })
      .toArray();

    // If the course doesn't exist, return a 404 response
    if (!course) {
      return new Response('Course not found', { status: 404 });
    }

    // Return the course data
    return new Response(JSON.stringify({ course, reviews }), {
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

  export async function PUT(req) {
    try {
      // Extract the course ID from the request URL
      const url = new URL(req.url, `http://${req.headers.host}`);
      const id = url.pathname.split('/').pop();
  
      // Convert the ID from a string to an ObjectId for MongoDB querying
      const objectId = new ObjectId(id);
  
      // Connect to the database
      const client = await clientPromise;
      const db = client.db('niner-rate');
  
      // Parse the request body to get the updated course data
      const requestBody = await req.json();
      const { code, title, courseDescription, unccCatalogID, unccCourseID } = requestBody;
  
      // Create the updated course object
      const updatedCourse = {
        code,
        title,
        courseDescription,
        unccCatalogID,
        unccCourseID,
      };
  
      // Update the course in the database
      const result = await db.collection('courses').updateOne(
        { _id: objectId },
        { $set: updatedCourse }
      );
  
      // If the course doesn't exist, return a 404 response
      if (result.matchedCount === 0) {
        return new Response('Course not found', { status: 404 });
      }
  
      // Return a success response
      return new Response('Course updated', { status: 200 });
    } catch (error) {
      // Log and return the error
      console.error('Failed to update course:', error);
      return new Response('Failed to update course', { status: 500 });
    }
  }
  
  // Named export for the DELETE HTTP method
  export async function DELETE(req) {
    try {
      // Extract the course ID from the request URL
      const url = new URL(req.url, `http://${req.headers.host}`);
      const id = url.pathname.split('/').pop();
  
      // Convert the ID from a string to an ObjectId for MongoDB querying
      const objectId = new ObjectId(id);
  
      // Connect to the database
      const client = await clientPromise;
      const db = client.db('niner-rate');
  
      // Delete the course from the database
      const result = await db.collection('courses').deleteOne({ _id: objectId });
  
      // If the course doesn't exist, return a 404 response
      if (result.deletedCount === 0) {
        return new Response('Course not found', { status: 404 });
      }
  
      // Return a success response
      return new Response('Course deleted', { status: 200 });
    } catch (error) {
      // Log and return the error
      console.error('Failed to delete course:', error);
      return new Response('Failed to delete course', { status: 500 });
    }
}
