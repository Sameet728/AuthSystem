import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('pass');

    // Set the state with the data from localStorage
    if (storedName && storedEmail && storedPassword) {
      setUser({
        name: storedName,
        email: storedEmail,
        password: storedPassword,
      });
    } else {
      // Redirect to login page if user data is not found
      window.location.href = '/login';
    }
  }, []);

  const logoutHandler = async (e) => {
    e.preventDefault();

    try {
      // Make the logout request using axios
      const response = await axios.post('https://authsystem-yerf.onrender.com/api/auth/logout', {
        email: user.email,
        password: user.password,
      });

      const data = response.data;
      let state = data.status;
      console.log(data.status);

      if (state) {
        localStorage.removeItem('token');  // Clear the token from localStorage
 
        // Remove user data from localStorage
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('pass');

        // Redirect to login page
        window.location.href = '/login';
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error('Logout error', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Home</h2>
        <div className="mt-6 space-y-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Password:</strong> {user.password}</p>
        </div>
        <div className="mt-5">
          <button onClick={logoutHandler} className="w-full bg-red-500 text-white p-2 rounded">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
