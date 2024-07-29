import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {

  const userEmail = localStorage.getItem('userEmail');
  const adminEmail = 'admin0218@gmail.com';
  if (userEmail && userEmail !== adminEmail){
    alert('You are not authorized!');
    return <Navigate to="/home" />;
  }else if (!userEmail || userEmail !== adminEmail) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
