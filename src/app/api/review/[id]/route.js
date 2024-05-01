import clientPromise from '../../../../../mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(req) {
  try {

    const url = new URL(req.url, `http://${req.headers.host}`);
    const courseId = url.pathname.split('/').pop();

    console.log('Review ID:', courseId);

    const client = await clientPromise;
    const db = client.db('niner-rate');

    const result = await db.collection('reviews').deleteMany({ courseId: courseId });

    // Change: return success even if no reviews were deleted
    return new Response(JSON.stringify({ message: "Reviews deleted or none existed", deletedCount: result.deletedCount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Failed to delete review:', error);
    return new Response('Failed to delete review', { status: 500 });
  }
}
