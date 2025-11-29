import React from 'react';

const NewDonorForm = ({setShowAddForm}) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold text-green-700 mb-8">নতুন দাতা</h2>

      <form className="space-y-4">
        {/* পাতার নাম */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            দাতার নাম
          </label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-600 bg-white">
            <option>মোঃ আনোয়ার হোসেন</option>
          </select>
        </div>

        {/* পরিচয়পত্র */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            প্রতি ধাপে পরিমাণ
          </label>
          <input
            type="text"
            defaultValue="৫০০৳"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-800"
          />
        </div>

        {/* পাতার নাম (again) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            নাম্বার
          </label>
          <input
            type="tel"
            defaultValue="+৮৮০১৭৭৫৬২৩২৬"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-800"
          />
        </div>

        {/* পরিচিতি */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ঠিকানা  
          </label>
          <input
            type="tel"
            defaultValue="মুগদা, মান্দা, ঢাকা"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-800"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-start gap-4 pt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition shadow-md"
          >
            সেভ করুন
          </button>
          <button
            onClick={() => setShowAddForm(false)}
            type="button"
            className="px-8 py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition rounded-md"
          >
            বাতিল করুন
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewDonorForm;