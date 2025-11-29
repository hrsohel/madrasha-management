"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function AddStudentForm5({setPagination}) {
    const history = useRouter()
    const [fees, setFees] = useState({
        admission: true,
        book: true,
        laptop: true,
        uniform: true,
        idCard: true,
        otherCharges: true,
        mess: true,
        scholarship: false,
    });

    const feeAmount = 3000; // Base fee per item
    const selectedCount = Object.values(fees).filter(Boolean).length;
    const totalFee = selectedCount * feeAmount;
    const scholarshipAmount = fees.scholarship ? 6000 : 0;
    const finalAmount = totalFee - scholarshipAmount;

    const handleCheckboxChange = (key) => {
        setFees(prev => ({ ...prev, [key]: !prev[key] }));
    };
    return (
        <div className="rounded-lg shadow-xl overflow-hidden w-[60%] mx-auto bg-[#F7F7F7]">
            <div className=" text-[#246545] p-6">
                <h3 className="text-2xl font-bold">ফি সংক্রান্ত</h3>
            </div>

            <div className="p-8 space-y-8">

                {/* Fee Items List */}
                <div className="">
                    {[
                        { key: 'admission', label: 'ভর্তি ফি' },
                        { key: 'book', label: 'বই ফি' },
                        { key: 'laptop', label: 'ল্যাপটপ ফি' },
                        { key: 'uniform', label: 'ড্রেস ফি' },
                        { key: 'idCard', label: 'আইডি কার্ড' },
                        { key: 'otherCharges', label: 'ছাত্র কল্যাণ' },
                        { key: 'mess', label: 'বই ব্যাংক' },
                    ].map((item) => (
                        <div key={item.key} className="flex items-center justify-start gap-8 py-3">
                            <label className="flex items-center gap-4 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={fees[item.key]}
                                    onChange={() => handleCheckboxChange(item.key)}
                                    className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                                />
                                <span className="text-lg text-gray-800 font-bold">{item.label}</span>
                            </label>
                            <div className='flex items-center justify-center gap-3'>
                                <span> = </span>
                                <span className="text-lg font-bold text-gray-700">
                                    {feeAmount.toLocaleString('bn-BD')} ৳
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
                {/* Total Fee */}
                <div className="text-xl font-bold text-gray-800 flex justify-start gap-8">
                    <span>সর্বমোট টাকা</span>
                    <div className='flex items-center justify-center gap-3'>
                        <span> = </span>
                        <span>{totalFee.toLocaleString('bn-BD')} ৳</span>
                    </div>
                </div>

                {/* Scholarship */}
                <div className="space-y-4">
                    <label className="flex items-center gap-4 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={fees.scholarship}
                            onChange={() => handleCheckboxChange('scholarship')}
                            className="w-6 h-6 text-red-600 rounded focus:ring-red-500 border-gray-300"
                        />
                        <span className="text-lg font-semibold text-[#424D47]">
                            সহযোগিতা করতে চাই
                        </span>
                    </label>

                    {fees.scholarship && (
                        <div className=" space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">ধরন</label>
                                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg">
                                    <option>স্কলারশিপ</option>
                                    <option>ফ্রি স্টুডেন্টশিপ</option>
                                    <option>হাফ ফ্রি</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">পরিমাণ</label>
                                <div className='flex items-center justify-between bg-gray-100 border border-gray-300 rounded-lg pr-1'>
                                    <input
                                        type="text"
                                        value="৬০০০"
                                        readOnly
                                        className="w-full px-4 py-3 text-lg font-bold"
                                    />
                                    <span className="text-lg ml-2">৳</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Final Amount */}
                <div className="text-lg font-bold text-[#EC221F] flex justify-between items-center">
                    <span>সহযোগিতা পর সর্বমোট টাকা </span>
                    <span>{finalAmount.toLocaleString('bn-BD')} ৳</span>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="bg-gray-50 px-8 py-6 flex justify-between items-center border-t">
                <button onClick={() => setPagination(4)} className="flex items-center gap-2 px-6 py-3 border border-green-600 text-[#2B7752] rounded-lg hover:bg-green-50 transition font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    পূর্বের ধাপে ফিরে যান
                </button>

                <button onClick={() => history.push("/preview")} className="bg-[#2B7752] hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-3 text-lg">
                    জমা দিন
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
