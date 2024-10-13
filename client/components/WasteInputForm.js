import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 

const WasteInputForm = ({ onWasteAdded }) => {
  const [timerExpired, setTimerExpired] = useState(false);
  const [companyData, setCompanyData] = useState(null);
  const [companyEmail, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [waste, setWaste] = useState({
    type: '',
    quantity: '',
    unit: '',
    description: '',
    date: ''
  });

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
    const getCompanyData = async () => {
      const company = localStorage.getItem("email");
      setCompany(company);

      if (companyEmail) {
        try {
          const companyResponse = await axios.get(`http://localhost:5000/companies/profile`, {
            headers: { 'Content-Type': 'application/json' },
            params: { email: companyEmail }
          });
          setCompanyData(companyResponse.data);
        } catch (error) {
          console.error('Error fetching company data:', error);
        }
      }
    };

    getCompanyData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWaste(prevWaste => ({
      ...prevWaste,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      ...waste,
      companyEmail
    };

    try {
      const response = await axios.post('http://localhost:5000/wastes', requestBody);
      onWasteAdded(response.data);
      toast.success('Waste added successfully!'); 
      setWaste({ type: '', quantity: '', unit: '', description: '', date: '' }); 
    } catch (error) {
      console.error('Error adding waste:', error);
      toast.error('Error adding waste: ' + (error.response?.data?.message || 'Unknown error')); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 border border-gray-300 rounded-lg shadow-md">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Waste Type</label>
        <input
          type="text"
          id="type"
          name="type"
          value={waste.type}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={waste.quantity}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="unit" className="block text-sm font-medium text-gray-700">Unit</label>
        <input
          type="text"
          id="unit"
          name="unit"
          value={waste.unit}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          value={waste.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date of Generation</label>
        <input
          type="date"
          id="date"
          name="date"
          value={waste.date}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Add Waste
      </button>
    </form>
  );
};

export default WasteInputForm;



