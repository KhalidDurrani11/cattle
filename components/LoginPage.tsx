
import React, { useState } from 'react';
import { Page, User, Role } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
  setCurrentPage: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, setCurrentPage }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  
  // Dummy login handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ id: 'u1', name: 'Test Farmer', email: 'farmer@test.com', role: Role.FARMER, isVerified: false });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would register the user and then log them in.
    // For this demo, we'll just log them in with the details.
     onLogin({ id: 'u2', name: 'New Farmer', email: 'new@test.com', role: Role.FARMER, isVerified: false });
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800/50 p-10 rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-sm">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isLoginView ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>

        <div className="flex justify-center border-b border-gray-700">
          <button onClick={() => setIsLoginView(true)} className={`px-6 py-2 font-medium text-sm ${isLoginView ? 'border-b-2 border-teal-400 text-teal-400' : 'text-gray-400'}`}>
            Login
          </button>
          <button onClick={() => setIsLoginView(false)} className={`px-6 py-2 font-medium text-sm ${!isLoginView ? 'border-b-2 border-teal-400 text-teal-400' : 'text-gray-400'}`}>
            Register
          </button>
        </div>

        {isLoginView ? (
          <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input id="email-address" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-900 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm" placeholder="Email address" />
              </div>
              <div>
                <input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-900 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm" placeholder="Password" />
              </div>
            </div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              Sign in
            </button>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleRegisterSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
               <input name="name" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-900 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" placeholder="Full Name" />
               <input name="email" type="email" required className="appearance-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-900 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" placeholder="Email address" />
               <input name="password" type="password" required className="appearance-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-900 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" placeholder="Password" />
               <select name="role" required className="w-full bg-gray-900 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 border border-gray-600">
                    <option value={Role.FARMER}>Farmer</option>
                    <option value={Role.BUYER}>Buyer</option>
                    <option value={Role.TRADER}>Trader</option>
                    <option value={Role.VET}>Vet</option>
               </select>
            </div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
