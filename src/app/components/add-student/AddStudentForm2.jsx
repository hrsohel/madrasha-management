import React from 'react';

export default function AddStudentForm2({ setPagination, formData, onDataChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onDataChange({ [name]: value });
  };

  // Determine initial active relation based on existing data
  const getInitialRelation = () => {
    const rel = formData.guardianRelation;
    if (['Father', 'Mother'].includes(rel)) return rel;
    if (rel && rel.length > 0) return 'Other';
    return '';
  };

  const [activeRelation, setActiveRelation] = React.useState(getInitialRelation);

  const handleRelationChange = (e) => {
    const value = e.target.value;
    setActiveRelation(value);

    if (value === 'Father') {
      onDataChange({
        guardianRelation: 'Father',
        guardianName: formData.fatherName,
        guardianPhone: formData.fatherPhone,
        guardianNID: formData.fatherNID
      });
    } else if (value === 'Mother') {
      onDataChange({
        guardianRelation: 'Mother',
        guardianName: formData.motherName,
        guardianPhone: formData.motherPhone,
        guardianNID: formData.motherNID
      });
    } else if (value === 'Other') {
      onDataChange({
        guardianRelation: '', // Clear to let user type
        guardianName: '',
        guardianPhone: '',
        guardianNID: ''
      });
    } else {
      onDataChange({ guardianRelation: value });
    }
  };

  return (
    <div className="bg-[#F7F7F7] rounded-lg shadow-xl overflow-hidden w-[60%] mx-auto">
      <div className="text-white p-6">
        <h3 className="text-2xl font-bold text-[#246545]">পিতা-মাতা ও অভিভাবকের তথ্য</h3>
      </div>

      <div className="p-8 space-y-10">
        {/* Father's Info */}
        <div className="border-b pb-8">
          <h4 className="text-lg font-bold text-gray-800 mb-6">পিতার তথ্য</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">নাম</label>
              <input
                type="text"
                name="fatherName"
                placeholder="মোঃ আব্দুল্লাহ বুখারী খান"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.fatherName || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">মোবাইল নম্বর</label>
              <input
                type="text"
                name="fatherPhone"
                placeholder="+৮৮০১৭৭৭৬৬৫৫৪৪"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                value={formData.fatherPhone || ''}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">NID</label>
              <input
                type="text"
                name="fatherNID"
                placeholder="১৯৭৪৮৬০৭০৪৭৪০৪৭"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                value={formData.fatherNID || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Mother's Info */}
        <div className="border-b pb-8">
          <h4 className="text-lg font-bold text-gray-800 mb-6">মাতার তথ্য</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">নাম</label>
              <input
                type="text"
                name="motherName"
                placeholder="মোছাঃ ফাতেমা বেগম"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.motherName || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">মোবাইল নম্বর</label>
              <input
                type="text"
                name="motherPhone"
                placeholder="+৮৮০১৭৭৭৬৬৫৫৪৪"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                value={formData.motherPhone || ''}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">NID</label>
              <input
                type="text"
                name="motherNID"
                placeholder="১৯৭৪৮৬০৭০৪৭৪০৪৭"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                value={formData.motherNID || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Guardian Info */}
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-6">অভিভাবকের তথ্য</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">সম্পর্ক</label>
              <div className="space-y-2">
                <select
                  name="guardianRelationSelect"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={activeRelation}
                  onChange={handleRelationChange}
                >
                  <option value="">নির্বাচন করুন</option>
                  <option value="Father">পিতা</option>
                  <option value="Mother">মাতা</option>
                  <option value="Other">অন্যান্য</option>
                </select>
                {activeRelation === 'Other' && (
                  <input
                    type="text"
                    name="guardianRelation"
                    placeholder="সম্পর্ক লিখুন (যেমন: চাচা)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg animate-in fade-in slide-in-from-top-2"
                    value={formData.guardianRelation || ''}
                    onChange={handleChange}
                  />
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">নাম</label>
              <input
                type="text"
                name="guardianName"
                placeholder="মোঃ আব্দুল্লাহ বুখারী খান"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                value={formData.guardianName || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">মোবাইল নম্বর</label>
              <input
                type="text"
                name="guardianPhone"
                placeholder="+৮৮০১৭৭৭৬৬৫৫৪৪"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                value={formData.guardianPhone || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">NID</label>
              <input
                type="text"
                name="guardianNID"
                placeholder="১৯৭৪৮৬০৭০৪৭৪০৪৭"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                value={formData.guardianNID || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="bg-gray-50 px-8 py-6 flex justify-between items-center border-t">
        <button onClick={() => setPagination(1)} className="flex items-center gap-2 px-6 py-3 border border-green-600 text-green-600 rounded-lg bg-[#E7FEF2] transition font-bold">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.49997 12H19M11 18C11 18 4.99997 13.5811 4.99997 12C4.99997 10.4188 11 6 11 6" stroke="#246545" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          পূর্বের ধাপে ফিরে যান
        </button>

        <button onClick={() => setPagination(3)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2">
          পরবর্তী ধাপে যান
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5 12H5M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}