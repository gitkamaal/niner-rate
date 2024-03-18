// app/api/instructors/route.js
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
