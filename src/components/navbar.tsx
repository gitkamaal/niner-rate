'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchInput from './searchInput';

const Navbar: React.FC = ({}) => {
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
        <Link className="text-white pr-4 hover:underline" href="#">
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
        <Link className="text-white px-4 hover:underline" href="/login">
          Login
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
