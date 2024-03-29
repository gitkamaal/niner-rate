// File: pages/api/courses/[id].js (or .ts if you're using TypeScript)
import { ObjectId } from 'mongodb';
import clientPromise from '../../../../../mongodb';

export default async function handler(req, res) {
  try {
    // Extract the course ID from the dynamic route parameter
    const { id } = req.query;
    console.log('ID from URL:', id);

    // Connect to the database
    const client = await clientPromise;
    const db = client.db('niner-rate');

    // Convert the ID from a string to an ObjectId for MongoDB querying
    const objectId = new ObjectId(id);

    // Query for the specific course by its ObjectId
    const course = await db.collection('courses').findOne({ _id: objectId });

    // If the course doesn't exist, return a 404 response
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Return the course data
    return res.status(200).json(course);
  } catch (error) {
    // Log and return the error
    console.error('Failed to fetch course:', error);
    return res.status(500).json({ message: 'Failed to fetch course', error });
  }
}
