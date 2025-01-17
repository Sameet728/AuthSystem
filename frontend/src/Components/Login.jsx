import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make the login request using axios
      const response = await axios.post('https://authsystem-yerf.onrender.com/api/auth/login', {
        email,
        password,
      });

      const data = response.data;
      let state=data.status;
console.log(data.status);
      if (state) {
        localStorage.setItem('name', data.user.name); 
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('pass', data.user.password);// Store JWT token
        window.location.href = '/home'; // Redirect to home page
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1"
              required
            />
          </div>
          <button type="submit" className="w-full mt-4">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
