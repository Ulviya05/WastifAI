import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header({ isLoggedIn, onLogout }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('email');
    onLogout(); 
    router.push('/');
  };

  return (
    <header className="bg-green-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">WastifAI</h1>
      <nav className="ml-auto">
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-white hover:underline">Home</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link href="/dashboard" className="text-white hover:underline">Dashboard</Link>
              </li>
              <li>
                <Link href="/waste-management" className="text-white hover:underline">Waste Management</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-white hover:underline">Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login" className="text-white hover:underline">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

Header.defaultProps = {
  onLogout: () => {}, 
};
