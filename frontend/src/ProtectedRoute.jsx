import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ element, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  // Not logged in - redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // User doesn't have permission - redirect to appropriate page
    return user.role === 'ADMIN' ? (
      <Navigate to="/manageProject" replace />
    ) : (
      <Navigate to="/dashboard" replace />
    );
  }

  // User is authenticated and has correct role
  return element;
};

export default ProtectedRoute;