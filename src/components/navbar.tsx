'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchInput from './searchInput';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

const Navbar: React.FC = ({}) => {
  const { data: session } = useSession();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const pathname = usePathname();
  return (
    <header
      key="1"
      className="flex items-center justify-between w-full h-20 px-8 bg-[#005035]"
    >
      <Link className="text-2xl font-bold text-white" href="/">
        NinerRate
      </Link>

      <div className="flex-grow mx-8">
        {pathname !== '/' && (
          <SearchInput
            className="w-full max-w-lg mx-auto"
            placeholder="Search..."
          />
        )}
      </div>

      <div className="flex items-center">
        <Link className="text-white pr-4 hover:underline" href="/courses">
          Courses
        </Link>
        <span className="text-white">|</span>
        <Link className="text-white px-4 hover:underline" href="/instructors">
          Instructors
        </Link>
        <span className="text-white">|</span>
        <Link className="text-white px-4 hover:underline" href="/review">
          Review
        </Link>
        <span className="text-white">|</span>
        
        
        {session ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white px-4 hover:underline"
            >
              {session.user?.name}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                <Link href="/user/profile" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
                  
                    Profile
                  
                </Link>
                <Link href="/api/auth/signout" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login" className="text-white px-4 hover:underline">Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
