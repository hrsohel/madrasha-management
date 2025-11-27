import React from 'react'

export default function AddStudentform3() {
    return (
        <div className="bg-[#F7F7F7] rounded-lg shadow-xl overflow-hidden w-[60%] mx-auto">
            <div className=" text-white p-6">
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
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                                <option>ঢাকা</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">জেলা</label>
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                                <option>ঢাকা</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">উপজেলা/থানা</label>
                            <input
                                type="text"
                                placeholder="মিরপুর"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">ইউনিয়ন</label>
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                                <option>ইউনিয়ন</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">গ্রাম</label>
                            <input
                                type="text"
                                placeholder="পাইকপাড়া"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">অন্যান্য তথ্য </label>
                            <input
                                type="text"
                                placeholder="ঠিকানা সম্পর্কিত অন্য কোনো তথ্য "
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* স্থায়ী ঠিকানা - Permanent Address */}
                <div className=" rounded-lg p-6">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input type="checkbox" className="w-5 h-5 rounded focus:ring-blue-500" defaultChecked />
                        <span className="text-lg font-bold">
                            বর্তমান ঠিকানাই স্থায়ী ঠিকানা
                        </span>
                    </label>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">বিভাগ</label>
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100">
                                <option>ঢাকা</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">জেলা</label>
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100">
                                <option>ঢাকা</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">উপজেলা/থানা</label>
                            <input
                                type="text"
                                placeholder="মিরপুর"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                            
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">ইউনিয়ন</label>
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100">
                                <option>ইউনিয়ন</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">গ্রাম</label>
                            <input
                                type="text"
                                placeholder="পাইকপাড়া"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                            
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">অন্যান্য তথ্য </label>
                            <input
                                type="text"
                                placeholder="ঠিকানা সম্পর্কিত অন্য কোনো তথ্য "
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="bg-gray-50 px-8 py-6 flex justify-between items-center border-t">
                <button className="flex items-center gap-2 px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    পূর্বের ধাপে ফিরে যান
                </button>

                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2">
                    পরবর্তী ধাপে যান
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
