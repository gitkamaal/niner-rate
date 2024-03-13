const Navbar: React.FC = ({}) => {
  return (
    <nav className="flex items-center justify-between p-6 bg-green">
      <div className="text-white text-2xl">NinerRate</div>
      <ul className="flex items-center space-x-4">
        <li>
          <a href="/login" className="text-white">
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
