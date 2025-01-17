import { Link } from 'react-router-dom';

const Navbar = () => {
  const isAuthenticated = localStorage.getItem('token'); // Check if user is logged in by looking for a token

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/home" className="hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/" className="hover:underline">Site State</Link>
        </li>

        {!isAuthenticated ? (
          <>
            <li>
              <Link to="/login" className="hover:underline">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="hover:underline">Sign Up</Link>
            </li>
          </>
        ) : ""}
      </ul>
    </nav>
  );
};

export default Navbar;
