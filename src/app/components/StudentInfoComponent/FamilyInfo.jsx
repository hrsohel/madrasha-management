import { useState } from "react";
import { Pencil, X } from "lucide-react";

export default function FamilyInfo({ guardian }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="   ">
      <div className=" mx-auto flex gap-6 mt-10">
        {/* Left Sidebar */}
        <div className="w-48 bg-[#F7F7F7] rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold text-[#246545] mb-4">
            অভিভাবকের তথ্য
          </h2>
          <ul className="space-y-2">
            <li className="text-sm text-[#63736C] py-2 px-3 hover:bg-gray-50 rounded cursor-pointer font-semibold ">
              ঠিকানা
            </li>
            <li className="text-sm text-[#63736C] py-2 px-3 hover:bg-gray-50 rounded cursor-pointer font-semibold">
              পূর্বতন মাদ্রাসার তথ্য
            </li>
            <li className="text-sm text-[#63736C]  py-2 px-3 hover:bg-gray-50 rounded cursor-pointer font-semibold">
              আর্থিক মুরব্বি / স্থানীয় মুরব্বি
            </li>
            <li className="text-sm text-[#63736C] py-2 px-3 hover:bg-gray-50 rounded cursor-pointer font-semibold">
              ভর্তি পরীক্ষার সনদাংশ
            </li>
          </ul>

        </div>

        {/* Main Content */}
        <div className="flex-1 bg-[#F7F7F7] rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h1 className="text-xl font-semibold text-[#246545]">
              অভিভাবকের তথ্য
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center text-[#2B7752] font-semi-bold gap-2 px-4 py-[6px] border-[1px] bg-[#E7FEF2] border-[#2B7752] rounded-md hover:bg-[#E7FEF2] transition-colors"
            >
              <Pencil className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </div>

          <div className="p-6">
            {/* পিতার তথ্য */}
            <div className="mb-8">
              <h3 className="text-base font-semibold text-[#63736C] mb-4 pb-2 border-b">
                পিতার তথ্য
              </h3>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">নাম</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {guardian?.fatherName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">মোবাইল নম্বর</p>
                  <p className="text-sm text-[#424D47] font-semibold">{guardian?.fatherPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">NID</p>
                  <p className="text-sm text-[#424D47] font-semibold">{guardian?.fatherNID}</p>
                </div>
              </div>
            </div>

            {/* মাতার তথ্য */}
            <div className="mb-8">
              <h3 className="text-base font-semibold text-[#63736C] mb-4 pb-2 border-b">
                মাতার তথ্য
              </h3>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">নাম</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {guardian?.motherName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold  mb-1">মোবাইল নম্বর</p>
                  <p className="text-sm text-[#424D47] font-semibold">{guardian?.motherPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">NID</p>
                  <p className="text-sm text-[#424D47] font-semibold">{guardian?.motherNID}</p>
                </div>
              </div>
            </div>

            {/* অভিভাবকের তথ্য */}
            <div>
              <h3 className="text-base font-semibold text-[#63736C] mb-4 pb-2 border-b">
                অভিভাবকের তথ্য
              </h3>
              <div className="grid grid-cols-4 gap-8">
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">সম্পর্ক</p>
                  <p className="text-sm text-[#424D47] font-semibold">{guardian?.guardianRelation}</p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">নাম</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {guardian?.guardianName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">মোবাইল নম্বর</p>
                  <p className="text-sm text-[#424D47] font-semibold">{guardian?.guardianPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">NID</p>
                  <p className="text-sm text-[#424D47] font-semibold">{guardian?.guardianNID}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto ">
            {/* Modal Header */}
            <div className="p-6 border-b border-dashed border-gray-300">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#246545]">
                  পিতা-মাতা ও অভিভাবকের তথ্য
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* পিতার তথ্য */}
              <div className="mb-6 border border-dashed border-gray-300 p-4 rounded">
                <h3 className="text-sm font-semibold text-[#63736C] mb-4">
                  পিতার তথ্য
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-xs text-gray-700 mb-1">
                      নাম
                    </label>
                    <input
                      type="text"
                      defaultValue={guardian?.fatherName}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-700 mb-1">
                      মোবাইল নম্বর
                    </label>
                    <input
                      type="text"
                      defaultValue={guardian?.fatherPhone}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-700 mb-1">
                      NID
                    </label>
                    <input
                      type="text"
                      defaultValue={guardian?.fatherNID}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* মাতার তথ্য */}
                <div className="mb-6 border border-dashed border-gray-300 p-4 rounded">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">
                    মাতার তথ্য
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">
                        নাম
                      </label>
                      <input
                        type="text"
                        defaultValue={guardian?.motherName}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">
                        নম্বর
                      </label>
                      <input
                        type="text"
                        defaultValue={guardian?.motherPhone}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-700 mb-1">
                      NID
                    </label>
                    <input
                      type="text"
                      defaultValue={guardian?.motherNID}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* অভিভাবকের তথ্য */}
                <div className="mb-6 border border-dashed border-gray-300 p-4 rounded">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">
                    অভিভাবকের তথ্য
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">
                        সম্পর্ক
                      </label>
                      <select 
                        defaultValue={guardian?.guardianRelation}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option>Father</option>
                        <option>Mother</option>
                        <option>Brother</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">
                        নাম
                      </label>
                      <input
                        type="text"
                        defaultValue={guardian?.guardianName}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">
                        মোবাইল নম্বর
                      </label>
                      <input
                        type="text"
                        defaultValue={guardian?.guardianPhone}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">
                        NID
                      </label>
                      <input
                        type="text"
                        defaultValue={guardian?.guardianNID}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Note */}
                <p className="text-xs text-gray-600 mb-4 p-3 bg-gray-50 rounded border border-dashed border-gray-300">
                  আপডেটকৃত তথ্য সংরক্ষণ করতে 'সেভ করুন' বাটনে ক্লিক করুন অথবা 'ক্যানসেল' করুন।
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="px-6 py-2 bg-[#246545] text-white rounded text-sm hover:bg-green-800 transition-colors">
                    সেভ করুন
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors"
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
  
