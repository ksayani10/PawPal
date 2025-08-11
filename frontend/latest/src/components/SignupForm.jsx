import React from 'react';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Sign Up for PawPal</h2>
        <form>
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          Already have an account? <a href="/login" className="text-orange-500 underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;