import React from 'react'

export default function Talimi() {
  return (
    <div className='bg-[#F7F7F7] px-4 rounded-md mt-12'>
            <div className='flex items-center justify-between mt-6 bg-[#F7F7F7] p-4'>
                <h1 className='text-[#246545] text-[20px] font-semibold'>ভর্তি পরীক্ষা সংশ্লিষ্ট</h1>
                <div>
                    <div className='flex items-center justify-center gap-2 px-[12px] py-[8px] bg-[#E7FEF2] rounded-md'>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5 4.5L13.5 7.5M2.83636 12.2319L2.25 15.75L5.76814 15.1636C6.37908 15.0619 6.94294 14.7717 7.38089 14.3337L15.3148 6.39966C15.895 5.81941 15.8951 4.87867 15.3148 4.29844L13.7015 2.68518C13.1212 2.10493 12.1804 2.10494 11.6002 2.6852L3.66631 10.6192C3.22835 11.0572 2.93818 11.621 2.83636 12.2319Z" stroke="#246545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span className='text-[14px] font-semibold text-[#2B7752]'>Edit</span>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-start gap-8 mt-4'>
                <div className='w-full'>
                    <p className='text-[16px] text-[#63736C]'>পরীক্ষকের নাম।/ সুপারিশ করি </p>
                    <p className='text-[16px] text-[#424D47] mt-[14px]'>মোঃ আরিফুর রহমান খান</p>
                </div>
                <div className='w-full'>
                    <p className='text-[16px] text-[#63736C]'>ফলাফল</p>
                    <p className='text-[16px] text-[#424D47]'>মুমতাজ </p>
                </div>
            </div>
        </div>
  )
}
