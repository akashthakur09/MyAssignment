import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full p-4 bg-blue-500 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">EdTech</h1>
        <nav>
          <Link to="/home" className="mr-4">Home</Link>
          {/* <Link to="/login" className="mr-4">Login</Link>
           */}
          <Link to="/payment" className="mr-4">Payment</Link>
          <Link to="/admin" className="mr-4">Admin</Link>
          <Link to="/" className="mr-4" onClick={()=>{localStorage.removeItem('userEmail')}}>Logout</Link>

          
        </nav>
      </div>
    </header>
  );
};

export default Header;
