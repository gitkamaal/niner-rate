import { NextResponse } from 'next/server';
import clientPromise from '../../../../mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise; // Wait for the client connection
      const db = client.db(); // Access the database from the client

      // Perform database operations here
      const coursesCollection = db.collection('courses');
      
      // Retrieve all courses from the database
      const courses = await coursesCollection.find({}).toArray();

      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
