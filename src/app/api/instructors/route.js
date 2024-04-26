import { NextResponse } from 'next/server';
import clientPromise from '../../../../mongodb';

// Fetch the instructors from the 'niner-rate.instructors' collection
export async function GET(_req) {
  try {
    const client = await clientPromise;
    const db = client.db('niner-rate');

    // Since the instructors are stored in an array within a single document,
    // you need to first fetch the document and then access the professors array.
    const data = await db.collection('instructors').findOne({});
    const professors = data.professors || [];

    return NextResponse.json(professors); // Use NextResponse to return JSON data
  } catch (error) {
    console.error('Failed to fetch professors:', error);
    return new NextResponse('Failed to fetch professors', { status: 500 }); // Use NextResponse to return an error
  }
}

export async function POST(req) {
  try {
      const client = await clientPromise;
      const db = client.db('niner-rate');
      const instructorData = await req.json();

      // Add a new instructor to the 'professors' array inside the instructors collection
      const result = await db.collection('instructors').updateOne(
          {}, // Assuming there's only one document that holds the array
          { $push: { professors: instructorData } },
          { upsert: true } // Creates a new document if no document matches the query
      );

      if (result.modifiedCount === 1 || result.upsertedCount === 1) {
          return new Response(JSON.stringify(instructorData), {
              status: 201,
              headers: { 'Content-Type': 'application/json' }
          });
      } else {
          throw new Error('Failed to add instructor');
      }
  } catch (error) {
      console.error('Failed to add instructor:', error);
      return new Response(JSON.stringify({ message: "Failed to add instructor", error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
      });
  }
}
