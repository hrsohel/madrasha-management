"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

export default function AddStudentForm5({ setPagination, formData, onDataChange }) {
  const router = useRouter();

  // Mapping from UI keys to API keys for fees
  const feeMapping = {
    admission: 'admissionFee',
    books: 'booksFee',
    IT: 'ITFee', // Mapped from 'laptop' in original UI to 'ITFee' in API
    IDCard: 'IDCardFee', // Mapped from 'idCard' in original UI to 'IDCardFee' in API
    library: 'libraryFee', // Mapped from 'mess' in original UI to 'libraryFee' in API
    // The original UI also had 'uniform' and 'otherCharges' which are not directly in API 'fees' body.
    // Assuming they are not needed for API, or handled differently.
    // For now, we'll only collect what's directly mappable to API.
    kafela: 'kafelaFee', // Adding kafelaFee from API schema
    confirm: 'confirmFee', // Adding confirmFee from API schema
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
      onDataChange({ [apiField]: currentAmount > 0 ? 0 : 3000 }); // Assuming default fee 3000
    }
  };
  
  const handleHelpTypeChange = (e) => {
    onDataChange({ helpType: e.target.value });
  };

  const handleHelpAmountChange = (e) => {
    onDataChange({ helpAmount: parseInt(e.target.value) || 0 });
  };

  const isHelpSelected = formData.helpType && formData.helpType !== '';
  const totalFee = Object.keys(feeMapping).reduce((sum, uiKey) => {
    const apiField = feeMapping[uiKey];
    return sum + (formData[apiField] || 0);
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
          {[
            { uiKey: 'admission', label: 'ভর্তি ফি', apiField: 'admissionFee' },
            { uiKey: 'books', label: 'বই ফি', apiField: 'booksFee' },
            { uiKey: 'IT', label: 'আইটি ফি', apiField: 'ITFee' },
            { uiKey: 'IDCard', label: 'আইডি কার্ড ফি', apiField: 'IDCardFee' },
            { uiKey: 'library', label: 'লাইব্রেরী ফি', apiField: 'libraryFee' },
            { uiKey: 'kafela', label: 'কাফেলা ফি', apiField: 'kafelaFee' },
            { uiKey: 'confirm', label: 'কনফার্মেশন ফি', apiField: 'confirmFee' },
          ].map((item) => (
            <div key={item.uiKey} className="flex items-center justify-start gap-8 py-3">
              <label className="flex items-center gap-4 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name={item.apiField}
                  checked={!!formData[item.apiField]}
                  onChange={(e) => onDataChange({ [item.apiField]: e.target.checked ? 3000 : 0 })} // Assume 3000 as default
                  className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                />
                <span className="text-lg text-gray-800 font-bold">{item.label}</span>
              </label>
              <div className='flex items-center justify-center gap-3'>
                <span> = </span>
                <span className="text-lg font-bold text-gray-700">
                  {(formData[item.apiField] || 0).toLocaleString('bn-BD')} ৳
                </span>
              </div>
            </div>
          ))}
        </div>
        <hr />
        {/* Total Fee */}
        <div className="text-xl font-bold text-gray-800 flex justify-start gap-8">
          <span>সর্বমোট টাকা</span>
          <div className='flex items-center justify-center gap-3'>
            <span> = </span>
            <span>{totalFee.toLocaleString('bn-BD')} ৳</span>
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
                  <option value="Orphan">অনাথ</option>
                  <option value="Scholarship">স্কলারশিপ</option>
                  <option value="Half Free">হাফ ফ্রি</option>
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
          <span>{finalAmount.toLocaleString('bn-BD')} ৳</span>
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