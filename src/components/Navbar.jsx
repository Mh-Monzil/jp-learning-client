import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">日本語 Learn</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/lessons" className="hover:text-blue-200">Lessons</Link>
              <Link to="/tutorials" className="hover:text-blue-200">Tutorials</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="hover:text-blue-200">Admin</Link>
              )}
              <button onClick={logout} className="hover:text-blue-200">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">Login</Link>
              <Link to="/register" className="hover:text-blue-200">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

