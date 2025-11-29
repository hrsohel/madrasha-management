import { Filter, Search } from 'lucide-react'
import React from 'react'

export default function DonorFilter() {
    const tableData = [
        {
            "দাতার নাম/প্রতিষ্ঠান": "মোঃ আব্দুল্লাহ রহমান খান\nবার্ষিক",
            "ঠিকানা/মোবাইল": "+৮৮০১৭১২৩৪৫৬৭৮\nঢাকা, মিরপুর, ঢাকা",
            "সময়কাল/শেষ তারিখ": "১ বছর, ২৫ মার্চ\n১২ জানুয়ারি ২০২৫",
            "প্রতি মাসে": "৫০০৮",
            "১২ মাসে": "৬০০০৮",
            "আদায় হয়েছে": "৫০০৮",
            "বাকি": "৫৫০০৮",
            "আগামী মাস থেকে": "৫০০৮"
        },
        {
            "দাতার নাম/প্রতিষ্ঠান": "মোঃ ইসমাইল হোসাইন ভূঁইয়া\nসাধারণ",
            "ঠিকানা/মোবাইল": "+৮৮০১৭১২৩৪৫৬৭৮\nঢাকা, মোহাম্মদপুর, ঢাকা",
            "সময়কাল/শেষ তারিখ": "১ বছর, ২৫ মার্চ\n১২ জানুয়ারি ২০২৫",
            "প্রতি মাসে": "২০০৮",
            "১২ মাসে": "২৪০০৮",
            "আদায় হয়েছে": "২০০৮",
            "বাকি": "২২০০৮",
            "আগামী মাস থেকে": "২০০৮"
        },
        {
            "দাতার নাম/প্রতিষ্ঠান": "মোঃ শফিকুল ইসলাম চৌধুরী\nসাধারণ",
            "ঠিকানা/মোবাইল": "+৮৮০১৭১২৩৪৫৬৭৮\nঢাকা, উত্তরা, ঢাকা",
            "সময়কাল/শেষ তারিখ": "১ বছর, ২৫ মার্চ\n১২ জানুয়ারি ২০২৫",
            "প্রতি মাসে": "৩০০৮",
            "১২ মাসে": "৩৬০০৮",
            "আদায় হয়েছে": "৩০০৮",
            "বাকি": "৩৩০০৮",
            "আগামী মাস থেকে": "৩০০৮"
        },
        {
            "দাতার নাম/প্রতিষ্ঠান": "মোঃ তানভীরুল ইসলাম বনি\nসাধারণ",
            "ঠিকানা/মোবাইল": "+৮৮০১৭১২৩৪৫৬৭৮\nঢাকা, মিরপুর, ঢাকা",
            "সময়কাল/শেষ তারিখ": "১ বছর, ২৫ মার্চ\n১২ জানুয়ারি ২০২৫",
            "প্রতি মাসে": "৩০০৮",
            "১২ মাসে": "৩৬০০৮",
            "আদায় হয়েছে": "৩০০৮",
            "বাকি": "৩৩০০৮",
            "আগামী মাস থেকে": "৩০০৮"
        },
        {
            "দাতার নাম/প্রতিষ্ঠান": "মোঃ মাহিদুল ইসলাম আলম\nসাধারণ",
            "ঠিকানা/মোবাইল": "+৮৮০১৭১২৩৪৫৬৭৮\nঢাকা, মিরপুর, ঢাকা",
            "সময়কাল/শেষ তারিখ": "১ বছর, ২৫ মার্চ\n১২ জানুয়ারি ২০২৫",
            "প্রতি মাসে": "৩০০৮",
            "১২ মাসে": "৩৬০০৮",
            "আদায় হয়েছে": "৩০০৮",
            "বাকি": "৩৩০০৮",
            "আগামী মাস থেকে": "৩০০৮"
        }
    ]
    return (
        <>
            <div className="bg-[#F7F7F7] rounded-sm p-6 shadow-sm border border-pink-100 mt-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Filter className="w-7 h-7 text-pink-600" />
                        <h2 className="text-xl font-bold text-gray-800">ফিল্টার</h2>
                    </div>
                    <div className="lg:col-span-2 relative">
                        <input
                            type="text"
                            placeholder="নাম, রশিদ নম্বর দিয়ে সার্চ করুন..."
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </div>

                {/* Right: Filters + Search */}
                <div className="flex items-center justify-start gap-6">
                    {/* Search Box */}

                    {/* দাতার ধরন */}
                    <div className="w-full">
                        <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700">
                            <option>ধরন </option>
                        </select>
                    </div>

                    {/* খাতের নাম */}
                    <div className="w-full">
                        <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700">
                            <option>সময়কাল</option>
                        </select>
                    </div>

                    {/* আমানতধারী */}

                </div>

                {/* Right: Orange Filter Button */}
                <button className="flex items-center gap-2 px-6 py-3 text-orange-500  font-bold transition">
                    <span>-</span>
                    ক্লিয়ার ফিল্টার
                </button>
            </div>
            <div className='mt-4'>
                <table className='w-full general-account-table'>
                    <thead>
                        <tr className='bg-[#F7F7F7]'>
                            <th className='text-[16px] font-[500] text-[#63736C] py-[8px]'>দাতার নাম/ধরন </th>
                            <th className='text-[16px] font-[500] text-[#63736C] py-[8px]'>ঠিকানা/নাম্বার </th>
                            <th className='text-[16px] font-[500] text-[#63736C] py-[8px]'>সময়কাল/ শুরুর তারিখ </th>
                            <th className='text-[16px] font-[500] text-[#63736C] py-[8px]'>প্রতি ধাপে </th>
                            <th className='text-[16px] font-[500] text-[#63736C] py-[8px]'>১২ মাসে</th>
                            <th className='text-[16px] font-[500] text-[#63736C] py-[8px]'>আদায় হয়েছে  </th>
                            <th className='text-[16px] font-[500] text-[#63736C] py-[8px]'>বাকি </th>
                            <th className='text-[16px] font-[500] text-[#63736C] py-[8px]'>জয়েনের পর থেকে </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData.map((data, index) => (
                                <tr key={index} className='text-center'>
                                    <td className='py-[24px]'>{data["দাতার নাম/প্রতিষ্ঠান"]}</td>
                                    <td className='py-[24px]'>{data["ঠিকানা/মোবাইল"]}</td>
                                    <td className='py-[24px]'>{data["সময়কাল/শেষ তারিখ"]}</td>
                                    <td className='py-[24px]'>{data["প্রতি মাসে"]}</td>
                                    <td className='py-[24px]'>{data["১২ মাসে"]}</td>
                                    <td className='py-[24px]'>{data["আদায় হয়েছে"]}</td>
                                    <td className='py-[24px]'>{data["বাকি"]}</td>
                                    <td className='py-[24px]'>{data["আগামী মাস থেকে"]}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
