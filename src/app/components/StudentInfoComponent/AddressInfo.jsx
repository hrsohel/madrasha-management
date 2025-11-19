import { useState } from "react";
import { Pencil, X } from "lucide-react";

export default function AddressInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSameAddress, setIsSameAddress] = useState(false);

  const [currentAddress, setCurrentAddress] = useState({
    division: "সিলেট",
    district: "সিলেট",
    upazila: "সুরমা",
    village: "শাহজালাল",
    additionalInfo: "",
  });

  const [permanentAddress, setPermanentAddress] = useState({
    division: "সিলেট",
    district: "সিলেট",
    upazila: "সুরমা",
    village: "শাহজালাল",
    additionalInfo: "",
  });

  return (
    <div>
      <div className=" mx-auto mt-10">
        {/* Main Content */}
        <div className="bg-[#F7F7F7] rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-dashed border-gray-300 px-6 py-4">
            <h1 className="text-xl font-semibold text-green-700">ঠিকানা</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-700 rounded-md hover:bg-green-50 transition-colors"
            >
              <Pencil className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </div>

          <div className="p-6">
            {/* বর্তমান ঠিকানা */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-700 mb-4">
                বর্তমান ঠিকানা
              </h3>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">গ্রাম</p>
                  <p className="text-sm text-gray-800">
                    {currentAddress.village}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">উপজেলা/থানা</p>
                  <p className="text-sm text-gray-800">
                    {currentAddress.upazila}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">জেলা</p>
                  <p className="text-sm text-gray-800">
                    {currentAddress.district}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">বিভাগ</p>
                  <p className="text-sm text-gray-800">
                    {currentAddress.division}
                  </p>
                </div>
              </div>
            </div>

            {/* স্থায়ী ঠিকানা */}
            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-4">
                স্থায়ী ঠিকানা
              </h3>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">গ্রাম</p>
                  <p className="text-sm text-gray-800">
                    {permanentAddress.village}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">উপজেলা/থানা</p>
                  <p className="text-sm text-gray-800">
                    {permanentAddress.upazila}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">জেলা</p>
                  <p className="text-sm text-gray-800">
                    {permanentAddress.district}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">বিভাগ</p>
                  <p className="text-sm text-gray-800">
                    {permanentAddress.division}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">ঠিকানা</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* বর্তমান ঠিকানা Section */}
              <div className="mb-6 pb-6 border-b border-dashed border-gray-300">
                <h3 className="text-base font-semibold text-gray-700 mb-4">
                  বর্তমান ঠিকানা
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      বিভাগ
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>সিলেট</option>
                      <option>ঢাকা</option>
                      <option>চট্টগ্রাম</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      জেলা
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>সিলেট</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      উপজেলা/থানা
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>সুরমা</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      ইউনিয়ন
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>শাহজালাল</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      গ্রাম
                    </label>
                    <input
                      type="text"
                      defaultValue="শাহজালাল"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      অন্যান্য তথ্য
                    </label>
                    <input
                      type="text"
                      placeholder="ঠিকানা সম্পর্কিত অন্য কোনো তথ্য"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* স্থায়ী ঠিকানা Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    id="sameAddress"
                    checked={isSameAddress}
                    onChange={(e) => setIsSameAddress(e.target.checked)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label
                    htmlFor="sameAddress"
                    className="text-sm text-gray-700"
                  >
                    বর্তমান ঠিকানার মতো
                  </label>
                </div>

                <h3 className="text-base font-semibold text-gray-700 mb-4">
                  স্থায়ী ঠিকানা
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      বিভাগ
                    </label>
                    <select
                      disabled={isSameAddress}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                    >
                      <option>সিলেট</option>
                      <option>ঢাকা</option>
                      <option>চট্টগ্রাম</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      জেলা
                    </label>
                    <select
                      disabled={isSameAddress}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                    >
                      <option>সিলেট</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      উপজেলা/থানা
                    </label>
                    <select
                      disabled={isSameAddress}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                    >
                      <option>সুরমা</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      ইউনিয়ন
                    </label>
                    <select
                      disabled={isSameAddress}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                    >
                      <option>শাহজালাল</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      গ্রাম
                    </label>
                    <input
                      type="text"
                      defaultValue="শাহজালাল"
                      disabled={isSameAddress}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      অন্যান্য তথ্য
                    </label>
                    <input
                      type="text"
                      placeholder="ঠিকানা সম্পর্কিত অন্য কোনো তথ্য"
                      disabled={isSameAddress}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Note */}
              <p className="text-xs text-gray-600 mt-6 mb-4">
                আপাতত্তকক তথ্য সংরক্ষন করলে 'সেভ করুন' বাটনে ক্লিক করুন অথবা
                'ক্যানসেল করুন'
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  সেভ করুন
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
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
