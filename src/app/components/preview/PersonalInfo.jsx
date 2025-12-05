import React from 'react'

export default function PersonalInfo({ studentData }) {
    return (
        <div className='bg-[#F7F7F7] px-4'>
            <div className='flex items-center justify-between mt-6 bg-[#F7F7F7] p-4'>
                <h1 className='text-[#246545] text-[20px] font-semibold'>শিক্ষার্থীর তথ্য  </h1>
                <div>
                    <div className='flex items-center justify-center gap-2 px-[12px] py-[8px] bg-[#E7FEF2] rounded-md'>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5 4.5L13.5 7.5M2.83636 12.2319L2.25 15.75L5.76814 15.1636C6.37908 15.0619 6.94294 14.7717 7.38089 14.3337L15.3148 6.39966C15.895 5.81941 15.8951 4.87867 15.3148 4.29844L13.7015 2.68518C13.1212 2.10493 12.1804 2.10494 11.6002 2.6852L3.66631 10.6192C3.22835 11.0572 2.93818 11.621 2.83636 12.2319Z" stroke="#246545" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className='text-[14px] font-semibold text-[#2B7752]'>Edit</span>
                    </div>
                </div>
            </div>
            <div className='mt-6 bg-[#F7F7F7]'>
                <div className='border-[1px] border-gray-200 relative bg-[#F7F7F7]'>
                    <h1 className='text-[#246545] absolute top-1/2 left-0 -translate-y-1/2 pr-4 bg-[#F7F7F7] py-1 font-sembold text-[18px]'>ব্যক্তিগত তথ্য  </h1>
                </div>
            </div>
            <div className='flex items-center justify-start gap-8 mt-4'>
                <div className='w-full'>
                    <p className='text-[16px] text-[#63736C]'>নাম</p>
                    <p className='text-[16px] text-[#424D47] mt-[14px]'>{studentData.name}</p>
                </div>
                <div className='w-full'>
                    <p className='text-[16px] text-[#63736C]'>জন্ম তারিখ</p>
                    <p className='text-[16px] text-[#424D47] my-[14px]'>{studentData.dob} {studentData.dob ? `, ${new Date().getFullYear() - new Date(studentData.dob).getFullYear()} বছর` : ''}</p>
                </div>
                <div className='w-full'>
                    <p className='text-[16px] text-[#63736C]'>জন্মসনদ/NID </p>
                    <p className='text-[16px] text-[#424D47]'>{studentData.nid || studentData.birthCertificate}</p>
                </div>
            </div>
            <div className='flex items-center justify-start gap-8'>
                <div className='w-full'>
                    <p className='text-[16px] text-[#63736C]'>জেন্ডার</p>
                    <p className='text-[16px] text-[#424D47] mt-[14px]'>{studentData.gender}</p>
                </div>
                <div className='w-full'>
                    <p className='text-[16px] text-[#63736C]'>রক্তের গ্রুপ</p>
                    <p className='text-[16px] text-[#424D47] my-[14px]'>{studentData.bloodGroup}</p>
                </div>
                <div className='w-full'>
                    <p className='text-[16px] text-[#63736C]'>মোবাইল নম্বর</p>
                    <p className='text-[16px] text-[#424D47]'>{studentData.phone}</p>
                </div>
            </div>
            <div className='mt-6 bg-[#F7F7F7]'>
                <div className='border-[1px] border-gray-200 relative bg-[#F7F7F7]'>
                    <h1 className='text-[#246545] absolute top-1/2 left-0 -translate-y-1/2 pr-4 bg-[#F7F7F7] py-1 font-sembold text-[18px]'>প্রাতিষ্ঠানিক তথ্য  </h1>
                </div>
            </div>
            <div className='flex items-center justify-start gap-4 mt-4'>
                <div className='w-1/2'>
                    <p className='text-[16px] text-[#63736C]'>আইডি</p>
                    <p className='text-[16px] text-[#424D47] mt-[14px]'>{studentData.uid}</p>
                </div>
                <div className='w-1/2'>
                    <p className='text-[16px] text-[#63736C]'>আবাসিক অবস্থা</p>
                    <p className='text-[16px] text-[#424D47] mt-[14px]'>{studentData.residential}</p>
                </div>
            </div>
            <div className='flex items-center justify-start gap-8'>
                <div className='w-full'>
                    <p className='text-[16px] text-[#63736C]'>রোল নম্বর</p>
                    <p className='text-[16px] text-[#424D47] mt-[14px]'>{studentData.roll}</p>
                </div>
                <div className='w-full'>
                    <p className='text-[16px] text-[#63736C]'>শ্রেণী</p>
                    <p className='text-[16px] text-[#424D47] my-[14px]'>{studentData.class}</p>
                </div>
                <div className='w-full'>
                    <p className='text-[16px] text-[#63736C]'>শাখা</p>
                    <p className='text-[16px] text-[#424D47]'>{studentData.section}</p>
                </div>
            </div>
            <div className='flex items-center justify-start gap-8'>
                <div className='w-full'>
                    <p className='text-[16px] text-[#63736C]'>শিফট</p>
                    <p className='text-[16px] text-[#424D47] mt-[14px]'>{studentData.shift}</p>
                </div>
                <div className='w-full'>
                    <p className='text-[16px] text-[#63736C]'>বিভাগ</p>
                    <p className='text-[16px] text-[#424D47] my-[14px]'>{studentData.division}</p>
                </div>
                <div className='w-full'>
                    <p className='text-[16px] text-[#63736C]'>সেশন</p>
                    <p className='text-[16px] text-[#424D47]'>{studentData.session}</p>
                </div>
            </div>
        </div>
    )
}
