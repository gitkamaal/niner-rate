import Link from 'next/link';

const Navbar: React.FC = ({}) => {
  return (
    <header
      key="1"
      className="flex items-center justify-between w-full h-20 px-8 bg-[#005035]"
    >
      <Link className="text-2xl font-bold text-white" href="/">
        NinerRate
      </Link>

      {/* <div className="flex-grow mx-8">
        <SearchInput className="w-full max-w-lg mx-auto" />
      </div> */}

      <div className="flex items-center">
        <Link className="text-white pr-4 hover:underline" href="#">
          Courses
        </Link>
        <span className="text-white">|</span>
        <Link className="text-white px-4 hover:underline" href="#">
          Instructors
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
