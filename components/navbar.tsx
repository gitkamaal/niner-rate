import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-green-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          NinerRate
        </Link>
        <div>
          <Link href="/login" className="text-white px-4">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
