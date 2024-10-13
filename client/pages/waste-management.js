import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WasteInputForm from '../components/WasteInputForm';

const WasteManagementPage = () => {
  const [companyData, setCompanyData] = useState(null);
  const [wastes, setWastes] = useState([]);
  const [timerExpired, setTimerExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerExpired(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (timerExpired) {
      setIsLoading(false);
    }
  }, [timerExpired]);

  useEffect(() => {
    const fetchData = async () => {
      const companyEmail = localStorage.getItem("email");

      if (!companyEmail) {
        router.push('/login');
        return;
      }

      try {
        const companyResponse = await axios.get(`http://localhost:5000/companies/profile`, {
          params: { email: companyEmail }
        });
        setCompanyData(companyResponse.data);

        const wastesResponse = await axios.get(`http://localhost:5000/wastes/${companyEmail}`);
        setWastes(wastesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleWasteAdded = (newWaste) => {
    setWastes(prevWastes => [newWaste, ...prevWastes]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={true} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Waste Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Add New Waste</h2>
            {companyData ? (
              <WasteInputForm onWasteAdded={handleWasteAdded} />
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Waste History</h2>
            <ul className="space-y-4">
              {wastes.map((waste, index) => (
                <li key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                  <h3 className="font-semibold text-lg">{waste.type}</h3>
                  <p className="text-sm"><strong>Quantity:</strong> <span className="font-medium">{waste.quantity} {waste.unit}</span></p>
                  <p className="text-sm"><strong>Description:</strong> <span className="font-medium">{waste.description}</span></p>
                  <p className="text-sm"><strong>Date of Generation:</strong> <span className="font-medium">{new Date(waste.date).toISOString().split('T')[0]}</span></p>
                </li>
              ))}
              {wastes.length === 0 && <p className="text-gray-500">No waste records found.</p>}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WasteManagementPage;


