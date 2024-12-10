import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';



const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/lessons" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

