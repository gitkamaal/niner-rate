import React from 'react';
import { CardHeader, CardContent, CardTitle } from './ui/card';
import SearchInput from './searchInput';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`flex justify-center items-center min-h-screen`}>
      <div
        className={`max-w-2xl w-full mx-auto bg-[#A49665] text-center py-8 px-4 rounded-lg ${className}`}
      >
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            Enter Your Course Here
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <SearchInput
            className="w-full max-w-lg mx-auto"
            placeholder="Search courses..."
          />
          <p className="text-lg text-white">
            University of North Carolina Charlotte
          </p>
        </CardContent>
        {children}
      </div>
    </div>
  );
};

export default Card;
