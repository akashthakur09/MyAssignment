import React from 'react';
import { Link } from 'react-router-dom';

function UnAuthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Login or Register</h1>
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-green-500 text-white rounded">Register</button>
        </Link>
      </div>
    </div>
  );
}

export default UnAuthPage;
