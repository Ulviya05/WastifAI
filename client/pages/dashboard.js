import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const companyEmail = localStorage.getItem("email");
      if (!companyEmail) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/dashboard', {
          params: { email: companyEmail }
        });
        const availableMaterialsResponse = await axios.get('http://localhost:5000/dashboard/available-materials', {
          params: { email: companyEmail }
        });

        setDashboardData({
          ...response.data,
          availableMaterials: availableMaterialsResponse.data.availableMaterials,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header isLoggedIn={true} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Welcome, {dashboardData?.companyName}</h1>
        
        <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">AI-Powered Waste Exchange Platform</h2>
          <p className="mb-4">Connect and transform waste products or by-products into valuable resources for effective waste management across diverse industries</p>
        </section>

        <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">AI Recommendations</h2>
          <p className="mb-4">Based on your company profile, we recommend these materials:</p>
          <ul className="space-y-4">
            {dashboardData?.recommendedWastes?.length > 0 ? (
              dashboardData.recommendedWastes.map((material, index) => (
                <li key={index} className="bg-blue-50 p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-blue-700">{material.type}</h3>
                  <p className="text-gray-600">{material.description}</p>
                  <p className="mt-2"><strong>Quantity:</strong> {material.quantity} {material.unit}</p>
                  <p className="mt-2"><strong>Supplier:</strong> {material.companyEmail}</p>
                  <a
                    href={`mailto:${material.companyEmail}`}
                    className="mt-2 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Contact Supplier
                  </a>
                </li>
              ))
            ) : (
              <p>No recommendations available.</p>
            )}
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Available Materials</h2>
          <ul className="space-y-4">
            {dashboardData?.availableMaterials?.length > 0 ? (
              dashboardData.availableMaterials.map((material, index) => (
                <li key={index} className="bg-blue-50 p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-blue-700">{material.type}</h3>
                  <p className="text-gray-600">{material.description}</p>
                  <p className="mt-2"><strong>Quantity:</strong> {material.quantity} {material.unit}</p>
                  <p className="mt-2"><strong>Supplier:</strong> {material.companyEmail}</p>
                  <a
                    href={`mailto:${material.companyEmail}`}
                    className="mt-2 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Contact Supplier
                  </a>
                </li>
              ))
            ) : (
              <p>No materials available.</p>
            )}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;





