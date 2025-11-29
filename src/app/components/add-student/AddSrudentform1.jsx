import React from 'react'

export default function AddSrudentform1({setPagination}) {
    return (
        <div className='flex items-start justify-center gap-4'>
            <div className="relative">
                <img
                    src="/5bcd817eb9c739cb0855646f3940ffa81a6dc895.jpg"
                    alt="Student"
                    className="w-[163px] h-[210px] rounded-lg object-cover border-4 border-gray-200"
                />
                <button className="absolute -bottom-8 -right-8 text-white p-3 rounded-full shadow-lgtransition cursor-pointer">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_307_23591)">
                            <path d="M4 4C4 1.79086 5.79086 0 8 0H32C34.2091 0 36 1.79086 36 4V28C36 30.2091 34.2091 32 32 32H8C5.79086 32 4 30.2091 4 28V4Z" fill="#E7FEF2" shapeRendering="crispEdges" />
                            <path d="M8 0.5H32C33.933 0.5 35.5 2.067 35.5 4V28C35.5 29.933 33.933 31.5 32 31.5H8C6.067 31.5 4.5 29.933 4.5 28V4C4.5 2.067 6.067 0.5 8 0.5Z" stroke="#2B7752" shapeRendering="crispEdges" />
                            <path d="M22 10L26 14M11.7818 20.3092L11 25L15.6909 24.2182C16.5054 24.0825 17.2573 23.6956 17.8412 23.1116L28.4198 12.5329C29.1934 11.7592 29.1934 10.5049 28.4197 9.73126L26.2687 7.58024C25.495 6.80658 24.2406 6.80659 23.4669 7.58027L12.8884 18.159C12.3045 18.7429 11.9176 19.4947 11.7818 20.3092Z" stroke="#246545" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <filter id="filter0_d_307_23591" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
                <div className="text-white p-6">
                    <h3 className="text-2xl font-bold text-[#246545]">শিক্ষার্থীর তথ্য</h3>
                    <p className="mt-1 opacity-90 text-[#63736C]">ব্যক্তিগত তথ্য</p>
                </div>

                <div className="p-8">
                    {/* Profile Photo + Pencil */}
                    <div className="flex items-start gap-6 mb-8">

                        <div className="flex-1 space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    নাম
                                </label>
                                <input
                                    type="text"
                                    placeholder="মোঃ আব্দুল্লাহ বুখারী খান"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                                />
                            </div>

                            {/* Birth Date & NID */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        জন্ম তারিখ
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            defaultValue="২০ জানুয়ারি ২০১০"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12"
                                        />
                                        <div className="absolute right-3 top-4 text-gray-500">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        জন্ম নিবন্ধন / NID
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="১৯৯৪০৭০৪৭৪০৪৭"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>

                            {/* Gender, Blood Group, Mobile */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">লিঙ্গ</label>
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                                        <option>ছাত্র</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">রক্তের গ্রুপ</label>
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                                        <option>O+</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">মোবাইল নম্বর</label>
                                    <input
                                        type="text"
                                        defaultValue="+৮৮০১৭৭৭৬৬৫৫৪৪"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
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
                                            defaultValue="DUMS01"
                                            className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg font-bold"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">আবাসিক অবস্থা</label>
                                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                                            <option>আবাসিক</option>
                                        </select>
                                    </div>
                                    {/* <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">শ্রেণি</label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                          <option>আরবিক</option>
                        </select>
                      </div> */}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">রোল</label>
                                        <input type="text" placeholder="২" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">শ্রেণি</label>
                                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                                            <option>নার্সারি</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">শাখা</label>
                                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                                            <option>নূরানী</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">শিফট</label>
                                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                                            <option>সকাল</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">বিভাগ</label>
                                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                                            <option>নূরানী</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">সেশন</label>
                                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                                            <option>১৪ - ২৫</option>
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
        </div>
    )
}
