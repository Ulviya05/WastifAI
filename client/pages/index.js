import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to WastifAI</h1>
        <p className="text-xl text-center mb-8">
          Join WastifAI to optimize your company's waste management efforts and connect with innovative solutions for a sustainable future
        </p>
        <div className="text-center">
          {isLoggedIn ? (
            <Link href="/dashboard" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 mr-4">
                Login
              </Link>
              <Link href="/profile" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Create Your Company Profile
              </Link>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;