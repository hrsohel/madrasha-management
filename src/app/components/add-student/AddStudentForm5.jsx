"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMadrasaSettings } from '@/lib/features/settings/settingsSlice';

// Convert English numbers to Bangla
const toBanglaNumber = (num) => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, digit => banglaDigits[digit]);
};

export default function AddStudentForm5({ setPagination, formData, onDataChange }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { madrasaSettings, loading } = useSelector((state) => state.settings);

  // Fetch madrasa settings on component mount
  useEffect(() => {
    dispatch(fetchMadrasaSettings());
  }, [dispatch]);

  // Synchronize formData with fetched settings to remove stale fees
  useEffect(() => {
    if (madrasaSettings?.fees && formData) {
      const actualFeeNames = Object.keys(madrasaSettings.fees);
      const currentFeeNames = Object.keys(formData);
      
      const feesToUpdate = {};
      let needsSync = false;

      // Find stale fees in formData that have a value but are no longer in settings
      const fieldsToIgnore = ['helpType', 'helpAmount'];
      for (const feeName of currentFeeNames) {
        if (fieldsToIgnore.includes(feeName)) {
          continue;
        }
        if (!actualFeeNames.includes(feeName) && formData[feeName] !== undefined) {
          feesToUpdate[feeName] = undefined; // Mark for deletion
          needsSync = true;
        }
      }

      if (needsSync) {
        onDataChange(feesToUpdate);
      }
    }
  }, [madrasaSettings, formData, onDataChange]);


  // Get default fee amount from backend settings
  const getDefaultFee = (feeName) => {
    if (madrasaSettings?.fees && madrasaSettings.fees[feeName] !== undefined) {
      return madrasaSettings.fees[feeName];
    }
    return 0; // Fallback to 0 if not available
  };

  const handleFeeChange = (e) => {
    const { name, value, type, checked } = e.target;
    onDataChange({ [name]: type === 'checkbox' ? checked : value });
  };

  const handleCheckboxChange = (uiKey) => {
    const apiField = feeMapping[uiKey];
    if (apiField) {
      // Toggle a default fee amount or 0 if unchecked
      const currentAmount = formData[apiField] || 0;
      onDataChange({ [apiField]: currentAmount > 0 ? 0 : 300 }); // Assuming default fee 3000
    }
  };

  const handleHelpTypeChange = (e) => {
    onDataChange({ helpType: e.target.value });
  };

  const handleHelpAmountChange = (e) => {
    onDataChange({ helpAmount: parseInt(e.target.value) || 0 });
  };

  const isHelpSelected = Boolean(formData.helpType && formData.helpType !== '');

  // Get all fees dynamically from backend
  const allFees = madrasaSettings?.fees || {};
  const feeEntries = Object.entries(allFees);

  // Calculate total fee from selected fees
  const totalFee = feeEntries.reduce((sum, [feeName, defaultAmount]) => {
    const val = Number(formData[feeName]);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  const finalAmount = totalFee - (formData.helpAmount || 0);

  return (
    <div className="rounded-lg shadow-xl overflow-hidden w-[60%] mx-auto bg-[#F7F7F7]">
      <div className="text-[#246545] p-6">
        <h3 className="text-2xl font-bold">ফি সংক্রান্ত</h3>
      </div>

      <div className="p-8 space-y-8">
        {/* Fee Items List */}
        <div>
          {feeEntries.length === 0 ? (
            <p className="text-gray-500 text-center py-4">কোন ফি যোগ করা হয়নি। ফি ম্যানেজমেন্ট থেকে ফি যোগ করুন।</p>
          ) : (
            feeEntries.map(([feeName, defaultAmount]) => {
              // Checkbox is checked if value exists and is not 0
              const val = formData[feeName];
              const isChecked = Number(val) > 0;

              return (
                <div key={feeName} className="flex items-center justify-start gap-8 py-3">
                  <label className="flex items-center gap-4 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name={feeName}
                      checked={isChecked}
                      onChange={(e) => onDataChange({ [feeName]: e.target.checked ? getDefaultFee(feeName) : 0 })}
                      className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-lg text-gray-800 font-bold">{feeName}</span>
                  </label>
                  <div className='flex items-center justify-center gap-3'>
                    <span>= </span>
                    <input
                      type="number"
                      value={val === 0 ? '' : (val ?? '')}
                      disabled={!isChecked}
                      onChange={(e) => {
                        const inputVal = e.target.value;
                        // Store as string if empty (to keep focus/checked), number otherwise
                        onDataChange({ [feeName]: inputVal === '' ? '' : Number(inputVal) });
                      }}
                      className="text-lg font-bold text-gray-700 w-32 px-2 py-1 border border-gray-300 rounded disabled:bg-gray-200 disabled:opacity-50"
                    />
                    <span className="text-lg font-bold text-gray-700">৳</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <hr />
        {/* Total Fee */}
        <div className="text-xl font-bold text-gray-800 flex justify-start gap-8">
          <span>সর্বমোট টাকা</span>
          <div className='flex items-center justify-center gap-3'>
            <span> = </span>
            <span>{toBanglaNumber(totalFee)} ৳</span>
          </div>
        </div>

        {/* Help/Scholarship */}
        <div className="space-y-4">
          <label className="flex items-center gap-4 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isHelpSelected}
              onChange={(e) => onDataChange({ helpType: e.target.checked ? 'Orphan' : '', helpAmount: e.target.checked ? 100 : 0 })} // Default help values
              className="w-6 h-6 text-red-600 rounded focus:ring-red-500 border-gray-300"
            />
            <span className="text-lg font-semibold text-[#424D47]">
              সহযোগিতা করতে চাই
            </span>
          </label>

          {isHelpSelected && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">ধরন</label>
                <select name="helpType" className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg" value={formData.helpType || ''} onChange={handleHelpTypeChange}>
                  <option value="">নির্বাচন করুন</option>
                  <option value="Orphan">যাকাত</option>
                  <option value="Scholarship">ফিতরা</option>
                  <option value="Half Free">সদকা</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">পরিমাণ</label>
                <div className='flex items-center justify-between bg-gray-100 border border-gray-300 rounded-lg pr-1'>
                  <input
                    type="number"
                    name="helpAmount"
                    placeholder="পরিমাণ"
                    className="w-full px-4 py-3 text-lg font-bold"
                    value={formData.helpAmount || ''}
                    onChange={handleHelpAmountChange}
                  />
                  <span className="text-lg ml-2">৳</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Final Amount */}
        <div className="text-lg font-bold text-[#EC221F] flex justify-between items-center">
          <span>সহযোগিতা পর সর্বমোট টাকা </span>
          <span>{toBanglaNumber(finalAmount)} ৳</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="bg-gray-50 px-8 py-6 flex justify-between items-center border-t">
        <button onClick={() => setPagination(4)} className="flex items-center gap-2 px-6 py-3 border border-green-600 text-[#2B7752] rounded-lg hover:bg-green-50 transition font-bold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          পূর্বের ধাপে ফিরে যান
        </button>

        <button onClick={() => router.push("/preview")} className="bg-[#2B7752] hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-3 text-lg">
          জমা দিন
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </div>
  );
}