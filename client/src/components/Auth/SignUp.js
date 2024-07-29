import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { registerUser } from '../../services/firebase';  // Import the registerUser function from your firebase service file

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await registerUser(email, password);
      console.log("user registered successfully")
      navigate('/login');  // Navigate to the home page after successful sign up
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Sign Up</button>
        <p className='mt-5'>Already Have an Account <Link to="/login" className='text-sky-500'>Login Here</Link></p>
      </form>
    </div>
  );
};

export default SignUp;
