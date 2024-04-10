import clientPromise from '../../../../mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req) {
    try {
        // Connect to the database
        const client = await clientPromise;
        console.log("Connected to MongoDB"); // check to see db connection
        const db = client.db('niner-rate');

        const requestBody = await req.json();
        const { courseName, studentName, rating, review } = requestBody;

        // Create a new ObjectId for the review
        const reviewId = new ObjectId();

        // Create a new review object
        const newReview = {
            _id: reviewId, // Assign a new ObjectId as the review's _id
            courseName, 
            rating,
            studentName,
            review,
            createdAt: new Date()
        };

        // Insert the new review into the database
        const result = await db.collection('reviews').insertOne(newReview);
        console.log('Result:', result);

        // Check if the insertion was successful
        if (result.insertedId) {
            console.log('Inserted review:', newReview);

            // Respond with the inserted review
            return new Response(JSON.stringify(newReview), {
                status: 201, // 201 Created status code for successful creation
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            console.error('Failed to insert review: Inserted ID is missing');
            return new Response('Failed to insert review', { status: 500 });
        }
    } catch (error) {
        // Log and return the error
        console.error('Failed to post review:', error);
        return new Response('Failed to post review', { status: 500 });
    }
}
