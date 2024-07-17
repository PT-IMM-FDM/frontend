import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-4">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="text-indigo-600 hover:text-indigo-500">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
