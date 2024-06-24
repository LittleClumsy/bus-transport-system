import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminRoute = () => {
  const { user } = useAuth();

  if (!user || !user.is_admin) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AdminRoute;
