import { useState } from "react";
import { Pencil, X } from "lucide-react";

export default function GuardianInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [guardianInfo, setGuardianInfo] = useState({
    name: "মোহ আবিছুর রহমান খান",
    lastPassedClass: "নাসারি",
    lastPassedResult: "সর্বশেষ উত্তীর্ণ (রোলনং)",
  });

  return (
    <div className="">
      <div className="mx-auto mt-10">
        {/* Main Content */}
        <div className="bg-[#F7F7F7] rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-dashed border-gray-300 px-6 py-4">
            <h1 className="text-xl font-semibold text-green-700">
              পূর্বতন মাদ্রাসার তথ্য
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
            <div className="grid grid-cols-3 gap-8">
              {/* নাম */}
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  পূর্বতন মাদ্রাসার নাম
                </p>
                <p className="text-sm text-gray-800">{guardianInfo.name}</p>
              </div>

              {/* সর্বশেষ উত্তীর্ণ ক্লাস */}
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  সর্বশেষ উত্তীর্ণ ক্লাস
                </p>
                <p className="text-sm text-gray-800">
                  {guardianInfo.lastPassedClass}
                </p>
              </div>

              {/* সর্বশেষ উত্তীর্ণ (রোলনং) */}
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  সর্বশেষ উত্তীর্ণ (রোলনং)
                </p>
                <p className="text-sm text-gray-800">
                  {guardianInfo.lastPassedResult}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-xl w-full shadow-2xl">
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                পূর্বতন মাদ্রাসার তথ্য
              </h2>
            </div>

            <div className="px-8 pb-8">
              {/* পূর্বতন মাদ্রাসার নাম */}
              <div className="mb-5">
                <label className="block text-base text-gray-700 mb-2 font-medium">
                  পূর্বতন মাদ্রাসার নাম
                </label>
                <input
                  type="text"
                  defaultValue="মোহ আবিছুর রহমান খান"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                />
              </div>

              {/* সর্বশেষ উত্তীর্ণ ক্লাস */}
              <div className="mb-5">
                <label className="block text-base text-gray-700 mb-2 font-medium">
                  সর্বশেষ উত্তীর্ণ ক্লাস
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white text-gray-700 cursor-pointer">
                    <option>নাসারি</option>
                    <option>প্রথম</option>
                    <option>দ্বিতীয়</option>
                    <option>তৃতীয়</option>
                    <option>চতুর্থ</option>
                    <option>পঞ্চম</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* সর্বশেষ উত্তীর্ণ (রোলনং) */}
              <div className="mb-6">
                <label className="block text-base text-gray-700 mb-2 font-medium">
                  সর্বশেষ উত্তীর্ণ (রোলনং)
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white text-gray-700 cursor-pointer">
                    <option>সর্বশেষ উত্তীর্ণ (রোলনং)</option>
                    <option>১</option>
                    <option>২</option>
                    <option>৩</option>
                    <option>৪</option>
                    <option>৫</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Note */}
              <p className="text-sm text-gray-600 mb-6">
                আপডেটকৃত তথ্য সংরক্ষন করলে 'সেভ করুন' বাটনে ক্লিক করুন অথবা
                'ক্যানসেল করুন'
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium">
                  সেভ করুন
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
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
