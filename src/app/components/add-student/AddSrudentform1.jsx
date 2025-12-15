import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import the Image component
import axios from 'axios';
import { categoryData } from './categoryFile';

export default function AddSrudentform1({ setPagination, formData, onDataChange }) {
  const [profileImagePreview, setProfileImagePreview] = useState(formData.profileImage || "/placeholder-2-1.webp");

  useEffect(() => {
    const fetchStudentId = async () => {
      // Always fetch if UID is missing
      if (!formData.uid) {
        try {
          // Add timestamp to prevent caching
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/students/get-id?t=${new Date().getTime()}`, {
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Expires': '0',
            }
          });
          if (response.data.success) {
            const { id, seq } = response.data.data;
            const formattedId = `${id}-${seq}`;
            onDataChange({ uid: formattedId });
          }
        } catch (error) {
          console.error("Error fetching student ID:", error);
        }
      }
    };

    fetchStudentId();
  }, []); // Run once on mount

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" && files && files[0]) {
      const file = files[0];
      onDataChange({ [name]: file });
      setProfileImagePreview(URL.createObjectURL(file));
    } else {
      onDataChange({ [name]: value });
    }
  };

  const handleImageClick = () => {
    document.getElementById('profileImageInput').click();
  };

  // Helper to get values by category name
  const getCategoryValues = (categoryName) => {
    const category = categoryData.find(c => c.category === categoryName);
    return category ? category.values : [];
  };

  // Division to Category mapping
  const divisionToCategoryMap = {
    "নাজেরা": "নাজেরা",
    "হিফজ": "হিফজ",
    "নূরানী": "নূরানী",
    "কিতাব": "কিতাব"
  };

  // Determine class options based on selected division
  const selectedCategoryName = formData.division ? divisionToCategoryMap[formData.division] : null;
  const classOptions = selectedCategoryName ? getCategoryValues(selectedCategoryName) : [];

  const sectionOptions = getCategoryValues("সেকশন");
  const shiftOptions = getCategoryValues("শিফট");
  const residentialOptions = getCategoryValues("আবাসিক");

  return (
    <div className='flex items-start justify-center gap-4'>
      <div className="relative">
        <Image // Use the Image component
          src={profileImagePreview}
          alt="Student"
          width={163} // Specify width
          height={210} // Specify height
          className="w-[163px] h-[210px] rounded-lg object-cover border-4 border-gray-200"
        />
        <input
          id="profileImageInput"
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        <button onClick={handleImageClick} className="absolute -bottom-8 -right-8 text-white p-3 rounded-full shadow-lgtransition cursor-pointer">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_307_23591)">
              <path d="M4 4C4 1.79086 5.79086 0 8 0H32C34.2091 0 36 1.79086 36 4V28C36 30.2091 34.2091 32 32 32H8C5.79086 32 4 30.2091 4 28V4Z" fill="#E7FEF2" shapeRendering="crispEdges" />
              <path d="M8 0.5H32C33.933 0.5 35.5 2.067 35.5 4V28C35.5 29.933 33.933 31.5 32 31.5H8C6.067 31.5 4.5 29.933 4.5 28V4C4.5 2.067 6.067 0.5 8 0.5Z" stroke="#2B7752" shapeRendering="crispEdges" />
              <path d="M22 10L26 14M11.7818 20.3092L11 25L15.6909 24.2182C16.5054 24.0825 17.2573 23.6956 17.8412 23.1116L28.4198 12.5329C29.1934 11.7592 29.1934 10.5049 28.4197 9.73126L26.2687 7.58024C25.495 6.80658 24.2406 6.80659 23.4669 7.58027L12.8884 18.159C12.3045 18.7429 11.9176 19.4947 11.7818 20.3092Z" stroke="#246545" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <filter id="filter0_d_307_23591" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_307_23591" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_307_23591" result="shape" />
              </filter>
            </defs>
          </svg>
        </button>
      </div>
      <div className="bg-[#F7F7F7] rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-[#246545]">শিক্ষার্থীর তথ্য</h3>
          <p className="mt-1 opacity-90 text-[#63736C]">ব্যক্তিগত তথ্য</p>
        </div>

        <div className="p-8">
          <div className="flex-1 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                নাম
              </label>
              <input
                type="text"
                name="name"
                placeholder="মোঃ আব্দুল্লাহ বুখারী খান"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>

            {/* Birth Date & NID / Birth Certificate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  জন্ম তারিখ
                </label>
                <input
                  type="date" // Changed to type date
                  name="dob"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.dob || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  NID
                </label>
                <input
                  type="text"
                  name="nid"
                  placeholder="জন্ম নিবন্ধন / NID"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.nid || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  জন্ম নিবন্ধন (Birth Certificate)
                </label>
                <input
                  type="text"
                  name="birthCertificate"
                  placeholder="জন্ম নিবন্ধন নম্বর"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.birthCertificate || ''}
                  onChange={handleChange}
                />
              </div>
            </div>


            {/* Gender, Blood Group, Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">লিঙ্গ</label>
                <select name="gender" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={formData.gender || ''} onChange={handleChange}>
                  <option value="">নির্বাচন করুন</option>
                  <option value="Male">ছাত্র</option>
                  <option value="Female">ছাত্রী</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">রক্তের গ্রুপ</label>
                <select name="bloodGroup" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={formData.bloodGroup || ''} onChange={handleChange}>
                  <option value="">নির্বাচন করুন</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">মোবাইল নম্বর</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+৮৮০১৭৭৭৬৬৫৫৪৪"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.phone || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Admission Info */}
            <div className="pt-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">ভর্তিসংক্রান্ত তথ্য</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">আইডি</label>
                  <input
                    type="text"
                    name="uid"
                    placeholder="DUMS01"
                    className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg font-bold"
                    value={formData.uid || ''}
                    onChange={handleChange}
                    readOnly

                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">আবাসিক অবস্থা</label>
                  <select name="residential" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={formData.residential || ''} onChange={handleChange}>
                    <option value="">নির্বাচন করুন</option>
                    {residentialOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">রোল</label>
                  <input
                    type="text"
                    name="roll"
                    placeholder="২"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    value={formData.roll || ''}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">শ্রেণি</label>
                  <select name="class" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={formData.class || ''} onChange={handleChange}>
                    <option value="">নির্বাচন করুন</option>
                    {classOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">শাখা</label>
                  <select name="section" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={formData.section || ''} onChange={handleChange}>
                    <option value="">নির্বাচন করুন</option>
                    {sectionOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">শিফট</label>
                  <select name="shift" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={formData.shift || ''} onChange={handleChange}>
                    <option value="">নির্বাচন করুন</option>
                    {shiftOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">বিভাগ</label>
                  <select name="division" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={formData.division || ''} onChange={handleChange}>
                    <option value="">নির্বাচন করুন</option>
                    <option value="নাজেরা">নাজেরা</option>
                    <option value="হিফজ">হিফজ</option>
                    <option value="নূরানী">নূরানী</option>
                    <option value="কিতাব">কিতাব</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">সেশন</label>
                  <select name="session" className="w-full px-4 py-3 border border-gray-300 rounded-lg" value={formData.session || ''} onChange={handleChange}>
                    <option value="">নির্বাচন করুন</option>
                    <option value="25-26">২৫ - ২৬</option>
                    <option value="24-25">২৪ - ২৫</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-10 text-center">
          <button onClick={() => setPagination(2)} className="bg-[#2B7752] hover:bg-green-700 text-white font-bold text-xl py-4 px-16 rounded-lg shadow-lg transition transform hover:scale-105 w-full">
            পরবর্তী ধাপে যান
          </button>
        </div>
      </div>
    </div>
  );
}