import Card from '@/components/card';
import Navbar from '@/components/navbar';
import React from 'react';

const LandingPage: React.FC = ({}) => {
  return (
    <>
      <Navbar />
      <Card children={undefined} />
    </>
  );
};

export default LandingPage;
