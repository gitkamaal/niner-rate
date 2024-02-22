import clientPromise from '../../mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('niner-rate'); // Replace with your database name

    // Example: Insert a document into the "tests" collection
    const result = await db.collection('test').insertOne({
      message: 'This is a test',
      date: new Date(),
    });

    res.status(200).json({ success: true, result: result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        error: 'Unable to connect to database or insert data',
      });
  }
}
