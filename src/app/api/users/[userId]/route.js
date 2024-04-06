import { NextResponse } from 'next/server';
import clientPromise from '../../../../../mongodb';

// Named export for the GET HTTP method
export async function GET(req) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const userId = url.pathname.split('/').pop();
    const client = await clientPromise;
    const db = client.db('niner-rate');
    const user = await db.collection('users').findOne({ userId });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    const { _id, ...userWithoutId } = user;
    console.log('User:', userWithoutId);
    return new Response(JSON.stringify(userWithoutId), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return new Response('Failed to fetch user', { status: 500 });
  }
}

export async function PUT(req) {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const userId = url.pathname.split('/').pop();
  
      const filter = { userId };
  
      const updatedFields = await req.json(); 
  
      const client = await clientPromise;
      const db = client.db('niner-rate');
  
      const updateResult = await db.collection('users').updateOne(filter, { $set: updatedFields });
  
      if (!updateResult.matchedCount) {
        return new Response('User not found', { status: 404 });
      }
  
      const updatedUser = await db.collection('users').findOne(filter);
  
      const { _id, ...userWithoutId } = updatedUser;
  
      return new Response(JSON.stringify(userWithoutId), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Failed to update user:', error);
      return new Response('Failed to update user', { status: 500 });
    }
  }