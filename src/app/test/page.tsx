'use client';
import React, { useState } from 'react';
import Layout from './layout';

interface FetchedItem {
  _id: string;
  message: string;
  date: string;
}

const TestPage: React.FC = () => {
  const [items, setItems] = useState<FetchedItem[]>([]);
  const handlePost = async () => {
    const response = await fetch('/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // If you need to send a body, add it here
    });
    const data = await response.json();
    console.log(data);
    // Handle the response data
  };

  const handleGet = async () => {
    const response = await fetch('/api/test', {
      method: 'GET',
    });
    const data: FetchedItem[] = await response.json();
    setItems(data);
  };

  return (
    <Layout>
      <div className="container mx-auto flex items-center justify-center space-x-4">
        <button
          onClick={handlePost}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Post to database
        </button>
        <button
          onClick={handleGet}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Fetch from database
        </button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.message} - {new Date(item.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default TestPage;
