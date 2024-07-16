import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

const ProtectedRoute = ({ allowedRoles }) => {
  const { token, user } = useAuthStore((state) => ({
    token: state.token,
    user: state.user,
  }));

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (user && allowedRoles.includes(user.role.name)) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
