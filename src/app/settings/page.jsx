"use client";
import React, { useState } from 'react';
import MadrasaProfile from './components/MadrasaProfile';
import PasswordChange from './components/PasswordChange';

export default function Page() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="px-[24px] mt-12 w-[60%] mx-auto">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
                <button
                    className={`py-2 px-4 font-semibold transition-colors ${activeTab === 'profile'
                            ? 'border-b-2 border-green-600 text-green-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    onClick={() => setActiveTab('profile')}
                >
                    মাদ্রাসার তথ্য
                </button>
                <button
                    className={`py-2 px-4 font-semibold transition-colors ${activeTab === 'password'
                            ? 'border-b-2 border-green-600 text-green-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    onClick={() => setActiveTab('password')}
                >
                    পাসওয়ার্ড পরিবর্তন
                </button>
            </div>

            {/* Content */}
            {activeTab === 'profile' && <MadrasaProfile />}
            {activeTab === 'password' && <PasswordChange />}
        </div>
    );
}