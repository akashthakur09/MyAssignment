import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const userEmail = localStorage.getItem('userEmail');

  if (!userEmail) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
