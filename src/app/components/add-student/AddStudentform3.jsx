import React, { useState, useEffect } from 'react';

export default function AddStudentform3({ setPagination, formData, onDataChange }) {
  const [isSameAsPresent, setIsSameAsPresent] = useState(formData.isSameAsPresent || true);



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onDataChange({ [name]: type === 'checkbox' ? checked : value });
  };

  const handlePresentAddressChange = (e) => {
    const { name, value } = e.target;
    console.log(`AddStudentform3: Present Address Change - Name: ${name}, Value: ${value}`);
    onDataChange({ [name]: value });
    if (isSameAsPresent) {
      const permanentFieldName = name.replace('present', 'permanent');
      console.log(`AddStudentform3: Mirroring to Permanent - Name: ${permanentFieldName}, Value: ${value}`);
      onDataChange({ [permanentFieldName]: value });
    }
  };

  const handlePermanentAddressChange = (e) => {
    const { name, value } = e.target;
    console.log(`AddStudentform3: Permanent Address Change - Name: ${name}, Value: ${value}`);
    onDataChange({ [name]: value });
  };

  return (
    <div className="bg-[#F7F7F7] rounded-lg shadow-xl overflow-hidden w-[60%] mx-auto">
      <div className="text-white p-6">
        <h3 className="text-2xl font-bold text-[#246545]">ঠিকানা</h3>
      </div>

      <div className="p-8 space-y-10">
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            বর্তমান ঠিকানা
          </h4>
          <hr className="border-gray-300 mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">বিভাগ</label>
              <select name="presentDivision" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" value={formData.presentDivision || ''} onChange={handlePresentAddressChange}>
                <option value="">নির্বাচন করুন</option>
                <option value="Dhaka">ঢাকা</option>
                <option value="Chittagong">চট্টগ্রাম</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">জেলা</label>
              <select name="presentDistrict" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={formData.presentDistrict || ''} onChange={handlePresentAddressChange}>
                <option value="">নির্বাচন করুন</option>
                <option value="Dhaka">ঢাকা</option>
                <option value="Chittagong">চট্টগ্রাম</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">উপজেলা/থানা</label>
              <input
                type="text"
                name="presentUpazila"
                placeholder="মিরপুর"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                defaultValue={formData.presentUpazila || ''}
                onChange={handlePresentAddressChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">ইউনিয়ন</label>
              <select name="presentUnion" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={formData.presentUnion || ''} onChange={handlePresentAddressChange}>
                <option value="">নির্বাচন করুন</option>
                <option value="Ward No 10">Ward No 10</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">গ্রাম</label>
              <input
                type="text"
                name="presentVillage"
                placeholder="পাইকপাড়া"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                defaultValue={formData.presentVillage || ''}
                onChange={handlePresentAddressChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">অন্যান্য তথ্য </label>
              <input
                type="text"
                name="presentOthers"
                placeholder="ঠিকানা সম্পর্কিত অন্য কোনো তথ্য "
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                defaultValue={formData.presentOthers || ''}
                onChange={handlePresentAddressChange}
              />
            </div>
          </div>
        </div>

        {/* স্থায়ী ঠিকানা - Permanent Address */}
        <div className="rounded-lg p-6">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              name="isSameAsPresent"
              className="w-5 h-5 rounded focus:ring-blue-500"
              checked={isSameAsPresent}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsSameAsPresent(checked);
                onDataChange({ isSameAsPresent: checked });
              }}
            />
            <span className="text-lg font-bold">
              বর্তমান ঠিকানাই স্থায়ী ঠিকানা
            </span>
          </label>

          <div className={`mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 ${isSameAsPresent ? 'opacity-50 pointer-events-none' : ''}`}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">বিভাগ</label>
              <select name="permanentDivision" className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100" value={isSameAsPresent ? formData.presentDivision : formData.permanentDivision || ''} onChange={handlePermanentAddressChange} disabled={isSameAsPresent}>
                <option value="">নির্বাচন করুন</option>
                <option value="Dhaka">ঢাকা</option>
                <option value="Chittagong">চট্টগ্রাম</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">জেলা</label>
              <select name="permanentDistrict" className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100" value={isSameAsPresent ? formData.presentDistrict : formData.permanentDistrict || ''} onChange={handlePermanentAddressChange} disabled={isSameAsPresent}>
                <option value="">নির্বাচন করুন</option>
                <option value="Dhaka">ঢাকা</option>
                <option value="Chittagong">চট্টগ্রাম</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">উপজেলা/থানা</label>
              <input
                type="text"
                name="permanentUpazila"
                placeholder="মিরপুর"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                defaultValue={isSameAsPresent ? formData.presentUpazila : formData.permanentUpazila || ''}
                onChange={handlePermanentAddressChange}
                disabled={isSameAsPresent}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">ইউনিয়ন</label>
              <select name="permanentUnion" className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100" value={isSameAsPresent ? formData.presentUnion : formData.permanentUnion || ''} onChange={handlePermanentAddressChange} disabled={isSameAsPresent}>
                <option value="">নির্বাচন করুন</option>
                <option value="Ward No 10">Ward No 10</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">গ্রাম</label>
              <input
                type="text"
                name="permanentVillage"
                placeholder="পাইকপাড়া"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                defaultValue={isSameAsPresent ? formData.presentVillage : formData.permanentVillage || ''}
                onChange={handlePermanentAddressChange}
                disabled={isSameAsPresent}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">অন্যান্য তথ্য </label>
              <input
                type="text"
                name="permanentOthers"
                placeholder="ঠিকানা সম্পর্কিত অন্য কোনো তথ্য "
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                defaultValue={isSameAsPresent ? formData.presentOthers : formData.permanentOthers || ''}
                onChange={handlePermanentAddressChange}
                disabled={isSameAsPresent}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="bg-gray-50 px-8 py-6 flex justify-between items-center border-t">
        <button onClick={() => setPagination(2)} className="flex items-center gap-2 px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition font-bold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          পূর্বের ধাপে ফিরে যান
        </button>

        <button onClick={() => setPagination(4)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2">
          পরবর্তী ধাপে যান
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}