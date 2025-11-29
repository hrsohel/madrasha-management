"use client"
import React, { useState } from 'react';
import { ChevronLeft, Search, ChevronRight, Clock, Check } from 'lucide-react';

const EditHistory = ({setShowHistory}) => {
    return (
        <div className="min-h-screen bg-white w-1/3 absolute right-0 top-0 shadow-2xl">
            {/* Header */}
            <div className=" bg-white border-b border-gray-200">
                <div className="flex items-center justify-start px-4 py-3">
                    <button onClick={() => setShowHistory(false)} className="p-2 rounded-full hover:bg-gray-100">
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <h1 className="text-lg font-semibold text-[#246545]">Edit history</h1>
                    <div className="w-10" /> {/* Spacer */}
                </div>

                {/* Search Bar */}
                <div className="px-4 pb-4">
                    <div className="relative">
                        <input
                            type="search"
                            placeholder="রশিদ নম্বর দিয়ে সার্চ করুন ..."
                            className="w-full pl-4 pr-4 py-3 bg-gray-100 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Edit History List */}
            <div className="px-4 py-4 space-y">
                {/* History Item */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 flex items-center justify-center">
                                <ChevronRight className="w-5 h-5 text-gray-400 rotate-90" />
                            </div>
                            <div className='flex items-center justify-between'>
                                <h3 className="font-medium text-gray-900">0001</h3>
                                <p className="text-sm text-gray-500">10 edit history</p>
                            </div>
                        </div>
                    </div>

                    {/* Edit Entries */}
                    <div className="space-y-4 ml-2 bg-[#F7F7F7]">
                        {/* E1 */}
                        <div className=" ml-12 p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-gray-700">E1</span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    August 3, 9:02 PM
                                </span>
                            </div>
                            <div className="text-sm">
                                <p className="text-gray-600 mb-2">
                                    <span className="font-medium text-gray-900">Mahmudul hasan</span>
                                </p>
                                <div className="space-y-2 text-[#424D47]">
                                    <div className="flex items-center gap-4">
                                        <span>১.</span>
                                        <span className=" ">৫০০৳</span>
                                        <span className="mx-2">→</span>
                                        <span className="">৫০০৳</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span>২.</span>
                                        <span>মাহফুজুর রহমান</span>
                                        <span className="mx-2">→</span>
                                        <span className="">(মো মাহফুজুর রহমান)</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span>৩.</span>
                                        <span className=" ">৫০০৳</span>
                                        <span className="mx-2">→</span>
                                        <span className="">৫০০৳</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* E2 */}
                        <div className=" ml-12 p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-gray-700">E2</span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    August 3, 9:02 PM
                                </span>
                            </div>
                            <div className="text-sm">
                                <p className="text-gray-600 mb-2">
                                    <span className="font-medium text-gray-900">Mahmudul hasan</span>
                                </p>
                                <div className="space-y-2 text-[#424D47]">
                                    <div className="flex items-center gap-4">
                                        <span>১.</span>
                                        <span className=" ">৫০০৳</span>
                                        <span className="mx-2">→</span>
                                        <span className="">৫০০৳</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span>২.</span>
                                        <span>মাহফুজুর রহমান</span>
                                        <span className="mx-2">→</span>
                                        <span className="">(মো মাহফুজুর রহমান)</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span>৩.</span>
                                        <span className=" ">৫০০৳</span>
                                        <span className="mx-2">→</span>
                                        <span className="">৫০০৳</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Repeat similar blocks for other 0001 items */}
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-0">
                        <div className="flex items-center gap-3">
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                            <div className=''>
                                <h3 className="font-medium text-gray-900">0001</h3>
                                <p className="text-sm text-gray-500">10 edit history</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditHistory;