import clientPromise from '../../../../mongodb';
import Review from '../../schema/reviewSchema';

export default async function handler(req, res) {
  console.log('Received request:', req.method, req.url);

  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db();

      const { courseName, studentName, rating, review } = req.body;

      console.log('Received data:', { courseName, studentName, rating, review });

      // Directly create the document object for insertion
      const reviewDocument = {
        courseName,
        studentName,
        rating,
        review,
      };

      console.log('New review:', newReview);

      const insertResult = await db.collection('reviews').insertOne(reviewDocument);
      console.log('Insertion result:', insertResult);

      res.status(200).json({ message: 'Review added successfully', data: insertResult });
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ error: 'Failed to add review' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
