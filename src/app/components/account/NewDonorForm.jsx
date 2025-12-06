"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDonor, resetDonorStatus } from '@/lib/features/accounts/accountSlice'; // Assuming alias is configured

const NewDonorForm = ({ setShowAddForm }) => {
  const [donorName, setDonorName] = useState('');
  const [amountPerStep, setAmountPerStep] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.accounts);

  useEffect(() => {
    if (success) {
      alert('Donor added successfully!'); // Or use a more sophisticated toast notification
      setDonorName('');
      setAmountPerStep('');
      setPhone('');
      setAddress('');
      dispatch(resetDonorStatus());
      setShowAddForm(false);
    }
    if (error) {
      alert(`Error: ${error.message || error}`); // Or use a more sophisticated toast notification
      dispatch(resetDonorStatus());
    }
  }, [success, error, dispatch, setShowAddForm]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const donorData = {
      donorName,
      amountPerStep: parseFloat(amountPerStep), // Ensure amount is a number
      phone,
      address,
    };
    dispatch(addDonor(donorData));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold text-green-700 mb-8">নতুন দাতা</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="donorName" className="block text-sm font-medium text-gray-700 mb-1">
            দাতার নাম
          </label>
          <input
            id="donorName"
            type="text"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-800"
            required
          />
        </div>

        <div>
          <label htmlFor="amountPerStep" className="block text-sm font-medium text-gray-700 mb-1">
            প্রতি ধাপে পরিমাণ
          </label>
          <input
            id="amountPerStep"
            type="number"
            value={amountPerStep}
            onChange={(e) => setAmountPerStep(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-800"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            নাম্বার
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-800"
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            ঠিকানা
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-800"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-start gap-4 pt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition shadow-md"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'সেভ করুন'}
          </button>
          <button
            onClick={() => setShowAddForm(false)}
            type="button"
            className="px-8 py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition rounded-md"
            disabled={loading}
          >
            বাতিল করুন
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewDonorForm;