import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../mongodb'; // Adjust the path as needed

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('niner-rate'); // Replace with your actual database name
    const result = await db.collection('test').insertOne({
      message: 'Test entry',
      date: new Date(),
    });
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('niner-rate');
    const result = await db.collection('test').find({}).toArray();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
