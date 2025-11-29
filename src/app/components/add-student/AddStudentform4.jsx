import React from 'react'

export default function AddStudentform4({setPagination}) {
    return (
        <div className=" shadow-xl overflow-hidden w-[60%] mx-auto">
            {/* <div className=" text-[#246545] p-6">
                <h3 className="text-2xl font-bold">পূর্ববর্তী শিক্ষা ও অন্যান্য তথ্য</h3>
            </div> */}

            <div className="p-8 space-y-10">

                {/* পূর্বের মাদ্রাসার তথ্য */}
                <div className="bg-gray-50 rounded-lg p-6 border">
                    <h4 className="text-xl font-bold text-green-800 mb-6">
                        পুরাতন মাদ্রাসার তথ্য
                    </h4>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                পূর্বের মাদ্রাসার নাম
                            </label>
                            <input
                                type="text"
                                placeholder="মোঃ আব্দুল্লাহ বুখারী খান"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                সর্বশেষ উত্তীর্ণ ক্লাস
                            </label>
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                                <option>নামাজি</option>
                                <option>হিফজ</option>
                                <option>ক্বিরাত</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                সর্বশেষ উত্তীর্ণ রেজাল্ট
                            </label>
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                                <option>সফলতার সাথে উত্তীর্ণ</option>
                                <option>অকৃতকার্য</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* তালিম সূরা / হাফেজ সূরা */}
                <div className="bg-gray-50 rounded-lg p-6 border">
                    <h4 className="text-xl font-bold text-green-800 mb-6">
                        তালিমি মুরব্বি / স্থানীয় মুরব্বি
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                               হযরতের নাম 
                            </label>
                            <input
                                type="text"
                                placeholder="মোঃ আব্দুল্লাহ বুখারী খান"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                হযরতের মোবাইল নম্বর
                            </label>
                            <input
                                type="text"
                                defaultValue="+৮৮০১৭৭৭৬৬৫৫৪৪"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* ভর্তি পরীক্ষার সাইট */}
                <div className="bg-gray-50 rounded-lg p-6 border">
                    <h4 className="text-xl font-bold text-green-800 mb-6">
                        ভর্তি পরীক্ষা সংশ্লিষ্ট
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                পরীক্ষকের নাম।/ সুপারিশ করি 
                            </label>
                            <input
                                type="text"
                                placeholder="মোঃ আব্দুল্লাহ বুখারী খান"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                               ফলাফল
                            </label>
                            <input
                                type="text"
                                placeholder="মুতাওয়াসসিতাহ"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="bg-gray-50 px-8 py-6 flex justify-between items-center border-t">
                <button onClick={() => setPagination(3)} className="flex items-center gap-2 px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    পূর্বের ধাপে ফিরে যান
                </button>

                <button onClick={() => setPagination(5)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2">
                    পরবর্তী ধাপে যান
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
