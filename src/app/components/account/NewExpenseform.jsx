import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, resetExpenseStatus } from '@/lib/features/accounts/accountSlice';

const NewExpenseform = ({setShowAddForm}) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.accounts);

  const [formData, setFormData] = useState({
    roshidNo: '',
    expenseHead: '', // Assuming 'donorName' in body is 'expenseHead' for expense
    amount: '',
    sectorName: '',
    method: '',
    receiptIssuer: '',
    additionalNotes: '',
  });

  useEffect(() => {
    if (success) {
      alert('Expense added successfully!');
      setFormData({
        roshidNo: '',
        expenseHead: '',
        amount: '',
        sectorName: '',
        method: '',
        receiptIssuer: '',
        additionalNotes: '',
      });
      dispatch(resetExpenseStatus());
      setShowAddForm(false);
    }
    if (error) {
      alert(`Failed to add expense: ${error.message || JSON.stringify(error)}`);
      dispatch(resetExpenseStatus());
    }
  }, [success, error, dispatch, setShowAddForm]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // The API body for expense seems to be the same as income,
    // so we map the form state to the expected body keys.
    // Assuming 'donorName' field is used for 'ব্যয়ের খাত' (Expense Head)
    const expenseData = {
      roshidNo: formData.roshidNo,
      donorName: formData.expenseHead, // Mapping expenseHead to donorName as per API
      amount: formData.amount,
      sectorName: formData.sectorName,
      method: formData.method,
      receiptIssuer: formData.receiptIssuer,
      additionalNotes: formData.additionalNotes
    };
    dispatch(addExpense(expenseData));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold text-green-700 mb-8">নতুন ব্যয়</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* রশিদ নম্বর */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            রশিদ নম্বর
          </label>
          <input
            type="text"
            name="roshidNo"
            value={formData.roshidNo}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-800"
            required
          />
        </div>

        {/* ব্যয়ের খাত */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ব্যয়ের খাত
          </label>
          <input
            type="text"
            name="expenseHead"
            value={formData.expenseHead}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-800"
            required
          />
        </div>

        {/* পরিমাণ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            পরিমাণ
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-800"
            required
          />
        </div>

        {/* খাতের নাম */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            খাতের নাম
          </label>
          <select
            name="sectorName"
            value={formData.sectorName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-600 bg-white"
            required
          >
            <option value="">নির্বাচন করুন</option>
            <option value="Salary">বেতন</option>
            <option value="Utility">ইউটিলিটি</option>
            <option value="Maintenance">রক্ষণাবেক্ষণ</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* পদ্ধতি */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            পদ্ধতি
          </label>
          <select
            name="method"
            value={formData.method}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-600 bg-white"
            required
          >
            <option value="">নির্বাচন করুন</option>
            <option value="Cash">নগদ</option>
            <option value="Bank Transfer">ব্যাংক ট্রান্সফার</option>
            <option value="Mobile Banking">মোবাইল ব্যাংকিং</option>
          </select>
        </div>

        {/* রসিদ প্রদানকারী */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            রসিদ প্রদানকারী
          </label>
          <input
            type="text"
            name="receiptIssuer"
            value={formData.receiptIssuer}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-800"
            required
          />
        </div>

        {/* অতিরিক্ত নোট */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            অতিরিক্ত নোট
          </label>
          <textarea
            rows={4}
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-800 resize-none"
            placeholder=""
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-start gap-4 pt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition shadow-md disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'সেভ হচ্ছে...' : 'সেভ করুন'}
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

export default NewExpenseform;