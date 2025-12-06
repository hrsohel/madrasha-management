import { useState } from "react";
import { MousePointerClick, Pencil, X } from "lucide-react";
import Image from "next/image";
import profileImage from "../../../../public/studentprofile.jpg";

export default function StudentInfo({ student }) {
  const [selectedAction, setSelectedAction] = useState("");
  const [showModal, setShowModal] = useState(false);

  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('bn-BD', options);
  };

  return (
    <div>
      <div className=" mx-auto bg-[#F7F7F7] rounded-lg shadow-sm">

        <div className="p-8">
          <div className="flex gap-8">
            {/* Left Side - Profile Image */}
            <div className="relative">
              <Image
                src={profileImage} // Assuming student object might have an imageUrl later
                alt="Profile"
                className="w-40 h-60 rounded-lg object-cover"
              />
              <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors">
                <Pencil className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Right Side - All Information */}
            <div className="flex-1">
              {/* Basic Info */}
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-[#246545] mb-4">
                    শিক্ষার্থীর তথ্য
                  </h2>
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center text-[#2B7752] font-semi-bold gap-2 px-4 py-[6px] border-[1px] bg-[#E7FEF2] border-[#2B7752] rounded-md hover:bg-[#E7FEF2] transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 w-full mt-5">
                  <h1 className="text-[#63736C] text-lg font-semibold whitespace-nowrap">
                    ব্যক্তিগত তথ্য
                  </h1>
                  <div className="h-[1px] w-full bg-[#92A09A]"></div>
                </div>


                <div className="grid grid-cols-3 gap-x-8 gap-y-4 mt-2">
                  <div>
                    <p className="text-sm text-[#63736C] font-semibold   mb-1">নাম</p>
                    <p className="text-[#424D47] font-semibold">{student?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#63736C] font-semibold mb-1">জন্ম তারিখ</p>
                    <p className="text-[#424D47] font-semibold">
                      {formatDate(student?.dob)} , {calculateAge(student?.dob)} বছর
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#63736C] font-semibold mb-1">জন্মসন/NID</p>
                    <p className="text-[#424D47] font-semibold">
                      {student?.birthCertificate || student?.nid}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#63736C] font-semibold mb-1">জেন্ডার</p>
                    <p className="text-[#424D47] font-semibold">{student?.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#63736C] font-semibold mb-1">রক্তের গ্রুপ</p>
                    <p className="text-[#424D47] font-semibold">{student?.bloodGroup}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#63736C] font-semibold mb-1">মোবাইল নম্বর</p>
                    <p className="text-[#424D47] font-semibold">{student?.phone}</p>
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div className=" pt-6">
                <div className="flex items-center gap-2 w-full mt-5">
                  <h1 className="text-[#63736C] text-lg font-semibold whitespace-nowrap">
                    প্রাতিষ্ঠানিক তথ্য
                  </h1>
                  <div className="h-[1px] w-full bg-[#92A09A]"></div>
                </div>
                <div className="grid grid-cols-3 gap-x-8 gap-y-4 mt-2">
                  <div>
                    <p className="text-sm text-[#63736C] font-semibold mb-1">আইডি</p>
                    <p className="text-[#424D47] font-semibold">{student?._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#63736C] font-semibold mb-1">আবাসিক অবস্থা</p>
                    <p className="text-[#424D47] font-semibold">{student?.residential}</p>
                  </div>
                  <div></div>

                  <div>
                    <p className="text-sm text-[#63736C] font-semibold mb-1">রোল নম্বর</p>
                    <p className="text-[#424D47] font-semibold">{student?.roll}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#63736C] font-semibold mb-1">শ্রেণী</p>
                    <p className="text-[#424D47] font-semibold">{student?.class}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#63736C] font-semibold mb-1">শাখা</p>
                    <p className="text-[#424D47] font-semibold">{student?.section}</p>
                  </div>

                  <div>
                    <p className="text-sm text-[#63736C] font-semibold mb-1">শিফট</p>
                    <p className="text-[#424D47] font-semibold">{student?.shift}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#63736C] font-semibold mb-1">বিভাগ</p>
                    <p className="text-[#424D47] font-semibold">{student?.division}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#63736C] font-semibold mb-1">সেশন</p>
                    <p className="text-[#424D47] font-semibold">{student?.session}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8 gap-4">
            <div className="flex gap-2">
              <button className="px-6 py-2 font-semibold bg-[#2B7752] text-white rounded-md hover:bg-green-800 transition-colors ">
                অন্যান্য তথ্য
              </button>
              <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                ব্যাক্তিগত হিসাব
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <select
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="flex-1 px-6 py-2 border border-[#A2AFA8] text-[#63736C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#63736C]"
                >
                  <option value="">আ্যাকশন পছন্দ করুন</option>
                  <option value="edit">সম্পাদনা করুন</option>
                  <option value="delete">মুছে ফেলুন</option>
                  <option value="print">প্রিন্ট করুন</option>
                </select>

              </div>
              <button className="px-4 py-[6px] text-white border-2 rounded-md text-sm flex items-center gap-2 font-semibold bg-[#2B7752]">
                <MousePointerClick className="mb-1" /> অ্যাকশন
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0   bg-black/50   bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto bl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b sticky top-0 ">
              <h2 className="text-xl font-semibold text-[#246545]">
                ব্যক্তিগত তথ্য
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Form Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* নাম */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    নাম
                  </label>
                  <input
                    type="text"
                    defaultValue={student?.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* আবাসিক অবস্থা */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    আবাসিক অবস্থা
                  </label>
                  <select 
                    defaultValue={student?.residential}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50 text-green-700"
                  >
                    <option>Hostel</option>
                    <option>DayScholar</option>
                    <option>NonResidential</option>
                  </select>
                </div>

                {/* জন্ম তারিখ */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    জন্ম তারিখ
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      defaultValue={student?.dob ? new Date(student.dob).toISOString().split('T')[0] : ''}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-600">{calculateAge(student?.dob)} বছর</span>
                  </div>
                </div>

                {/* জন্মসনদ/NID */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!student?.birthCertificate}
                      readOnly
                      className="w-4 h-4 text-green-600"
                    />
                    জন্মসনদ
                    <input
                      type="checkbox"
                      checked={!!student?.nid}
                      readOnly
                      className="w-4 h-4 text-green-600 ml-4"
                    />
                    NID
                  </label>
                  <input
                    type="text"
                    defaultValue={student?.birthCertificate || student?.nid}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* রোল */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    রোল
                  </label>
                  <input
                    type="text"
                    defaultValue={student?.roll}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* শ্রেণী */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    শ্রেণী
                  </label>
                  <select 
                    defaultValue={student?.class}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>Class One</option>
                    <option>Class Two</option>
                    <option>Class Seven</option>
                  </select>
                </div>

                {/* বাতিল হিসাবের সদস্য */}
                <div className="col-span-2">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="w-4 h-4 text-green-600" />
                    বাতিল হিসাবের সদস্য
                  </label>
                </div>

                {/* শাখা */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    শাখা
                  </label>
                  <select 
                    defaultValue={student?.section}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                </div>

                {/* শিফট */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    শিফট
                  </label>
                  <select 
                    defaultValue={student?.shift}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>Morning</option>
                    <option>Evening</option>
                  </select>
                </div>

                {/* বিভাগ */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    বিভাগ
                  </label>
                  <select 
                    defaultValue={student?.division}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                  </select>
                </div>

                {/* সেসন */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    সেসন
                  </label>
                  <select 
                    defaultValue={student?.session}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>25-26</option>
                    <option>24-25</option>
                  </select>
                </div>

                {/* জেলার (Gender) */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    জেন্ডার
                  </label>
                  <select 
                    defaultValue={student?.gender}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                {/* রক্তের গ্রুপ */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    রক্তের গ্রুপ
                  </label>
                  <select 
                    defaultValue={student?.bloodGroup}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>
              </div>

              {/* Note */}
              <p className="text-sm text-gray-600 mt-4">
                আপডেটকৃত তথ্য সংরক্ষণ করতে 'সেভ করুন' বাটনে ক্লিক করুন অথবা 'ক্যানসেল' করুন।
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <button className="px-6 py-2 bg-[#2B7752] text-white rounded-md hover:bg-green-800 transition-colors">
                  সেভ করুন
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  ক্যানসেল করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
