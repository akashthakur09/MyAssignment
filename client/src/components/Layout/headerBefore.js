import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full p-4 bg-blue-500 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">EdTech</h1>
        <nav>
          
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/signup" className="mr-4">Sign Up</Link>
          
        </nav>
      </div>
    </header>
  );
};

export default Header;
