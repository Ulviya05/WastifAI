import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ProfileForm from '../components/ProfileForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileSubmit = async (profileData) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('companyId', data.company._id);
        router.push('/login');
      } else {
        const errorData = await response.json();
        alert(`Failed to create profile: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center my-8">Company Profile</h1>
        <ProfileForm onSubmit={handleProfileSubmit} />
        {isLoading && <p className="text-center mt-4">Creating profile...</p>}
      </main>
      <Footer />
    </div>
  );
}

