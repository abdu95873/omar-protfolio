import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    setError('');
    setSuccess('');

    signIn(email, password)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        navigate(from, { replace: true });
        setSuccess('Successfully logged in');
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const togglePasswordVisibility = () => {
    setShow(!show);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="container mx-auto my-4 py-5 w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h4 className="text-center text-gray-300 text-4xl mb-4" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Please login</h4>

        <form className='w-1/3 mx-auto' onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="formBasicEmail" className="block text-sm font-medium text-gray-300">Email address</label>
            <input type="email" name="email" id="formBasicEmail" placeholder="Enter email" required className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="formBasicPassword" className="block text-sm font-medium text-gray-300">Password</label>
            <input 
              type={show ? "text" : "password"} 
              name="password" 
              id="formBasicPassword" 
              placeholder="Password" 
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            />
          </div>
          <p onClick={togglePasswordVisibility} className="flex justify-end cursor-pointer text-sm text-indigo-400 hover:text-indigo-300">
            <small>
              {show ? <span>Hide</span> : <span>Show</span>}
            </small>
          </p>
          <button type="submit" className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4">
            Login
          </button>
          <p className="text-red-500 text-center mt-2">{error}</p>
          <p className="text-green-500 text-center mt-2">{success}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
