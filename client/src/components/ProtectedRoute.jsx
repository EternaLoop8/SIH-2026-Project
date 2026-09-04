import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, token } = useAuth();

  // 1. If not logged in, redirect them to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Role Guard: If they don't have the right role, send them to unauthorized page
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. If all checks pass, render the child component pages
  return <Outlet />;
};

export default ProtectedRoute;
