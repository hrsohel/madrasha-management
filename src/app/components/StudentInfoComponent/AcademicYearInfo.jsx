import { useState } from "react";
import { Pencil, X } from "lucide-react";

export default function AcademicYearInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [info, setInfo] = useState({
    supervisorName: "মোহ আবিছুর রহমান খান",
    mobileNumber: "+৮৮০১৭৭৫১৬৩৬",
  });

  return (
    <div className="  mt-10 ">
      <div className=" mx-auto">
        {/* Main Content */}
        <div className="bg-[#F7F7F7] rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-dashed border-gray-300 px-6 py-4">
            <h1 className="text-xl font-semibold text-green-700">
              তালিমি মুরব্বি / স্থানীয় মুরব্বি
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-700 rounded-md hover:bg-green-50 transition-colors"
            >
              <Pencil className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-8">
              {/* তত্ত্বাবধানের নাম */}
              <div>
                <p className="text-sm text-gray-600 mb-2">তত্ত্বাবধানের নাম</p>
                <p className="text-sm text-gray-800">{info.supervisorName}</p>
              </div>

              {/* তত্ত্বাবধানের (মোবাইল নম্বর */}
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  তত্ত্বাবধানের (মোবাইল নম্বর
                </p>
                <p className="text-sm text-gray-800">{info.mobileNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-6 border-b border-dashed border-gray-300">
              <h2 className="text-xl font-semibold text-green-700">
                তালিমি মুরব্বি / স্থানীয় মুরব্বি
              </h2>
            </div>

            <div className="px-8 py-6">
              {/* তত্ত্বাবধানের নাম */}
              <div className="mb-5">
                <label className="block text-sm text-gray-700 mb-2">
                  তত্ত্বাবধানের নাম
                </label>
                <input
                  type="text"
                  defaultValue="মোহ আবিছুর রহমান খান"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                />
              </div>

              {/* তত্ত্বাবধানের (মোবাইল নম্বর */}
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2">
                  তত্ত্বাবধানের (মোবাইল নম্বর
                </label>
                <input
                  type="text"
                  defaultValue="+৮৮০১৭৭৫১৬৩৬"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                />
              </div>

              {/* Note */}
              <p className="text-xs text-gray-600 mb-6">
                আপডেটকৃত তথ্য সংরক্ষন করলে 'সেভ করুন' বাটনে ক্লিক করুন অথবা
                'ক্যানসেল করুন'
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 px-6 py-3 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors font-medium">
                  সেভ করুন
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
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
