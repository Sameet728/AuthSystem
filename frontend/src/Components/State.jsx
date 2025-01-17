import React, { useEffect, useState } from 'react';
import axios from 'axios';

const State = () => {
  const [status, setStatus] = useState('buffering');
  const [message, setMessage] = useState('Waiting for response...');

  useEffect(() => {
    const fetchData = async () => {
      setStatus('buffering');
      setMessage('Waiting for response...');

      try {
        // Simulate Axios request (replace with actual URL)
        const response = await axios.post('https://authsystem-yerf.onrender.com/api/auth/state');
        console.log(response.data); 
        if(response.data.status){
          setStatus('active');
          setMessage('Site Backend Active !');
        }else{
          setStatus('buffering');
        setMessage('Something went wrong, please try again.');
        }
        // Simulate processing the response
     
      } catch (error) {
        setStatus('buffering');
        setMessage('Something went wrong, please try again.');
      }
    };

    fetchData();
  }, []); // Run once when the component is mounted

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <div className={`flex items-center justify-center p-4 rounded-lg ${status === 'active' ? 'bg-green-200' : 'bg-red-200'}`}>
          <div className="text-center">
            {status === 'buffering' ? (
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-gray-500"></div> // Rotating circle
            ) : null}
            <p className={`text-lg font-semibold ${status === 'active' ? 'text-green-700' : 'text-red-700'}`}>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default State;

