import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-green-600 p-4">
      {/* Container to center the content */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Branding */}
        <Link href="/">
          <a className="text-white text-lg font-bold">NinerRate</a>
        </Link>
        {/* Navigation Links */}
        <div>
          <Link href="/login">
            <a className="text-white px-4">Login</a>
          </Link>
          {/* Add more navigation links here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
