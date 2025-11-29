import React from 'react'

export default function ChartData() {
    return (
        <div className='mt-4 rounded-md border w-1/2'>
            <div className='flex items-center justify-center w-full'>
                <p className='border p-[14px] text-[#424D47] font-semibold w-full'>চলতি মাস সর্বমোট আয় </p>
                <p className='text-center border p-[14px] text-[#424D47] font-semibold w-full'>+ ৫০০৳</p>
            </div>
            <div className='flex items-center justify-center w-full'>
                <p className='border p-[14px] text-[#424D47] font-semibold w-full'>চলতি মাস সর্বমোট ব্যয় </p>
                <p className='text-center border p-[14px] text-[#424D47] font-semibold w-full'>+ ৫০০৳</p>
            </div>
            <div className='flex items-center justify-center w-full'>
                <p className='border p-[14px] text-[#424D47] font-semibold w-full'> চলতি মাস  সর্বমোট জমা  </p>
                <p className='text-center border p-[14px] text-[#424D47] font-semibold w-full'>+ ৫০০৳</p>
            </div>
            <div className='flex items-center justify-center w-full'>
                <p className='border p-[14px] text-[#424D47] font-semibold w-full'>গত মাসের উদ্বৃত্ত </p>
                <p className='text-center border p-[14px] text-[#424D47] font-semibold w-full'>+ ৫০০৳</p>
            </div>
            <div className='flex items-center justify-center w-full'>
                <p className='border p-[14px] text-[#008043] font-semibold w-full'>বর্তমান ব্যালেন্স  </p>
                <p className='text-center border p-[14px] text-[#424D47] font-semibold w-full'>+ ৫০০৳</p>
            </div>
        </div>
    )
}
