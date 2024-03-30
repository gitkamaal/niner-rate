'use client';
import Navbar from '@/components/navbar';
import React from 'react';
import GoogleButton from 'react-google-button';
import { signIn } from 'next-auth/react';

const LoginPage: React.FC = () => {
  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md">
        <h1 className="mb-4 text-2xl text-center">Login to NinerRate</h1>
        <GoogleButton onClick={() => signIn('google', {callbackUrl: "/"})} className="mx-auto"/>
      </div>
    </div>
    </>
  );
};

export default LoginPage;