import React from 'react';
import Navbar from '../components/navbar';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '5px' }}>
          <h2>Search for your courses</h2>
          {/* Add your search input and button here */}
        </div>
      </div>
    </>
  );
};

export default Home;
