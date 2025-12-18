import Image from 'next/image'
import React from 'react'
import { translateToBangla } from '../../../lib/utils'

export default function ReciepForAdmissionForm({ studentData, guardianData, addressData, madrasaData, feesData, madrasaSettings }) {
    return (
        <div

            className='border-t border-dashed py-2 relative'
        >
            <div
                style={{
                    backgroundImage: madrasaSettings?.logo ? `url("${process.env.NEXT_PUBLIC_API_BASE_URL}${madrasaSettings.logo}")` : `url("/802422a1353a261fc2a0056a2430a594a0d6f235.png")`,
                    backgroundSize: "400px 400px"
                }}
                className='absolute top-0 left-0 right-0 w-full h-full -z-10 bg-no-repeat bg-center opacity-20 bg-cover'></div>
            <h1 className='text-[30px] font-normal text-center'>دارالعلوم معين السنة سريমনগল</h1>
            <div className='flex items-center justify-around'>
                <div className='flex items-center justify-center gap-4'>
                    {madrasaSettings?.logo ? (
                        <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${madrasaSettings.logo}`} className='w-[70px] h-[70px] rounded-full block border-[1px] border-[#71847B] object-cover' alt='logo' />
                    ) : (
                        <Image src="/802422a1353a261fc2a0056a2430a594a0d6f235.png" className='w-[70px] h-[70px] rounded-full block border-[1px] border-[#71847B] object-cover' width={100} height={100} alt='logo' />
                    )}
                    <div>
                        <h1 className='text-[21px] font-[500] text-[#424D47]'>{madrasaSettings?.name?.bangla || "দারুল উলুম মূঈনুস সুন্নাহ, শ্রীমঙ্গল"}</h1>
                        <h3 className='text-[15px] font-[400] text-[#424D47]'>{madrasaSettings?.location?.bangla || "ভানুগাছ রোড , রেল গেট, শ্রীমঙ্গল, মৌলভীবাজার, সিলেট"}</h3>
                    </div>
                </div>
                <div>
                    <svg width="8" height="24" viewBox="0 0 8 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.744863" y1="1.46745e-08" x2="0.744861" y2="23.8356" stroke="#424D47" strokeWidth="1.48973" />
                        <line x1="6.70385" y1="1.46745e-08" x2="6.70385" y2="23.8356" stroke="#424D47" strokeWidth="1.48973" />
                    </svg>
                </div>
                <div>
                    <h1 className='text-[21px] font-[500] text-[#424D47]'>{madrasaSettings?.name?.english || "Darul Ulum Muinus Sunnah Sreemangal"}</h1>
                    <h3 className='text-[15px] font-[400] text-[#424D47]'>{madrasaSettings?.contact?.email || "darululum@gmail.com"} || {madrasaSettings?.contact?.phone || "+880 1611-109960"}</h3>
                </div>
            </div>
            <div className='flex items-center justify-evenly w-full px-24'>
                <div className=' w-full'>
                    <p className='flex items-center justify-start gap-6'><span>ফরম নং</span> <span>:</span> <span>{studentData?.formNo || "---"}</span></p>
                </div>
                <div className='bg-[#2B7752] p-2 w-[300px] text-center'>
                    <p className='text-white'>ভর্তি রশিদ </p>
                </div>
                <div className=' w-full'>
                    <p className='flex items-center justify-end gap-6'><span>তারিখ</span> <span>:</span> <span>{new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
                </div>
            </div>
            <div className='mt-6 px-24'>
                <div className='border-[1px] border-gray-200 relative bg-[#92A09A] border-dashed'>
                    <h1 className='text-[#EC221F] absolute top-1/2 left-0 -translate-y-1/2 pr-4 py-1 bg-white font-sembold text-[18px]'>নতুন ভর্তি </h1>
                </div>
            </div>
            <div className='flex items-center justify-between px-24 mt-6'>
                <div className=' w-full text-[#424D47] font-[500] text-[16px]'>
                    <p className='flex items-center justify-start gap-6'><span>নাম</span> <span>:</span> <span>{studentData?.name || "N/A"}</span></p>
                    <p className='flex items-center justify-start gap-6'><span>রোল</span> <span>:</span> <span>{studentData?.roll || "N/A"}</span></p>
                    <p className='flex items-center justify-start gap-6'><span>শিফট</span> <span>:</span> <span>{translateToBangla(studentData?.shift) || "N/A"}</span></p>
                </div>
                <div className=' w-full text-[#424D47] font-[500] text-[16px]'>
                    <p className='flex items-center justify-center gap-6'><span>আইডি</span> <span>:</span> <span>{studentData?.uid || "N/A"}</span></p>
                    <p className='flex items-center justify-center gap-6'><span>শ্রেণী</span> <span>:</span> <span>{translateToBangla(studentData?.class) || "N/A"}</span></p>
                    <p className='flex items-center justify-center gap-6'><span>বিভাগ</span> <span>:</span> <span>{translateToBangla(studentData?.division) || "N/A"}</span></p>
                </div>
                <div className=' w-full text-[#424D47] font-[500] text-[16px]'>
                    <p className='flex items-center justify-end gap-6'><span>আবাসিক অবস্থা</span> <span>:</span> <span className='text-[#14AE5C]'>{translateToBangla(studentData?.residential) || "N/A"}</span></p>
                    <p className='flex items-center justify-end gap-6 mr-12'><span>শাখা</span> <span>:</span> <span>{translateToBangla(studentData?.section) || "N/A"}</span></p>
                    <p className='flex items-center justify-end gap-6'><span>সেশন</span> <span>:</span> <span>{translateToBangla(studentData?.session) || "N/A"}</span></p>
                </div>
            </div>
            <div className='mt-6 px-24'>
                <div className='border-[1px] border-gray-200 relative bg-[#92A09A] border-dashed'>
                    <h1 className='text-[#246545] absolute top-1/2 left-0 -translate-y-1/2 pr-4 py-1 bg-white font-sembold text-[18px]'>হিসাব </h1>
                </div>
            </div>
            <div className='flex items-center justify-between px-24 mt-6'>
                <div className=' w-full text-[#424D47] font-[500] text-[16px]'>
                    <p className='flex items-center justify-start gap-6'><span>সর্বমোট </span> <span>:</span> <span>{feesData?.totalAmount || feesData?.total || "0"}৳</span></p>
                    <p className='flex items-center justify-start gap-6'><span>প্রদেয় পরিমাণ</span> <span>:</span> <span>{feesData?.payableAmount || feesData?.payable || "0"}৳</span></p>
                </div>
                <div className=' w-full text-[#424D47] font-[500] text-[16px]'>
                    <p className='flex items-center justify-center gap-6'><span>সাহায্য </span> <span>:</span> <span>{feesData?.helpAmount || feesData?.help || "0"}৳</span></p>
                    <p className='flex items-center justify-center gap-6'><span>কথায়</span> <span>:</span> <span>{feesData?.amountInWords || "---"}</span></p>
                </div>
                <div className=' w-full text-[#424D47] font-[500] text-[16px]'>
                    <p className='flex items-center justify-end gap-6'><span>সাহায্যের খাত </span> <span>:</span> <span>{feesData?.helpType || "---"}</span></p>
                </div>
            </div>
            <div className='flex items-center justify-between mt-10 px-24'>
                <div className='relative'>
                    {madrasaSettings?.signature && (
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${madrasaSettings.signature}`}
                            className='absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-12 object-contain'
                            alt='Muhtamim Signature'
                        />
                    )}
                    <hr />
                    <p className='mt-2'>মুহতামিমেরে স্বাক্ষর</p>
                </div>
                <div>
                    <hr />
                    <p className='mt-2'>হিসাব রক্ষকের স্বাক্ষর</p>
                </div>
            </div>
        </div>
    )
}
