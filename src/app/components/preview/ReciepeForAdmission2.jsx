import Image from 'next/image'
import React from 'react'
import { translateToBangla } from '../../../lib/utils'

export default function ReciepeForAdmission2({ studentData: rawStudentData, guardianData: rawGuardianData, addressData: rawAddressData, madrasaData: rawMadrasaData, feesData: rawFeesData, madrasaSettings, addedStudent }) {
    // Prefer server data if available to show official saved IDs
    const savedData = addedStudent?.data || {};

    const studentData = savedData.name ? savedData : rawStudentData;
    const guardianData = savedData.guardian?.[0] || rawGuardianData;
    const addressData = savedData.addresse?.[0] || rawAddressData;
    const madrasaData = savedData.oldMadrasaInfo?.[0] || rawMadrasaData;
    const feesData = savedData.fees?.[0] || rawFeesData;

    const today = new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <>
            <div className='border'>
                <div
                    className='py-2 relative'
                >
                    <div
                        style={{
                            backgroundImage: madrasaSettings?.logo ? `url("${process.env.NEXT_PUBLIC_API_BASE_URL}${madrasaSettings.logo}")` : `url("/802422a1353a261fc2a0056a2430a594a0d6f235.png")`,
                            backgroundSize: "1200px 1200px"
                        }}
                        className='absolute top-0 left-0 right-0 w-full h-full -z-10 bg-no-repeat bg-center opacity-20 bg-cover'></div>
                    <h1 className='text-[30px] font-normal text-center'>{madrasaSettings?.name?.arabic || "دارالعلوم معين السنة سريمنغل"}</h1>
                    <div className='flex items-center justify-around'>
                        <div className='flex items-center justify-center gap-4'>
                            {madrasaSettings?.logo ? (
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${madrasaSettings.logo}`}
                                    className='w-[70px] h-[70px] rounded-full block border-[1px] border-[#71847B] object-cover'
                                    alt='Madrasa Logo'
                                />
                            ) : (
                                <Image src="/802422a1353a261fc2a0056a2430a594a0d6f235.png" className='w-[70px] h-[70px] rounded-full block border-[1px] border-[#71847B] object-cover' width={1000} height={1000} alt='Default Logo' />
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
                            <h3 className='text-[15px] font-[400] text-[#424D47]'>{madrasaSettings?.contact?.email || "darululummuinussunnah@gmail.com"} || {madrasaSettings?.contact?.phone || "+880 1611-109960"}</h3>
                        </div>
                    </div>
                    <div className='flex items-center justify-evenly w-full px-24'>
                        <div className=' w-full'>
                            <p className='flex items-center justify-start gap-6'><span>ফরম নং</span> <span>:</span> <span>{studentData?.formNo || "৭৫"}</span></p>
                        </div>
                        <div className='bg-[#2B7752] p-2 w-[300px] text-center'>
                            <p className='text-white'>ভর্তি ফরম </p>
                        </div>
                        <div className=' w-full'>
                            <p className='flex items-center justify-end gap-6'><span>তারিখ</span> <span>:</span> <span>{today}</span></p>
                        </div>
                    </div>
                    <div className='pl-6 mt-6'>
                        <h3 className='text-[20px] text-[#246545] font-semibold pl-18'>শিক্ষার্থীর তথ্য </h3>
                    </div>
                    <div className='px-6 flex flex-col gap-6'>
                        <div className='w-full flex flex-col gap-4'>
                            <div className='my-6 bg-[#F7F7F7]'>
                                <div className='border-[1px] border-gray-200 relative bg-[#F7F7F7]'>
                                    <h1 className='text-[#63736C] absolute top-1/2 left-0 -translate-y-1/2 pr-4 bg-white py-1 font-sembold text-[18px]'>ব্যক্তিগত তথ্য </h1>
                                </div>
                            </div>
                            <div>
                                <p>নাম</p>
                                <p>{studentData?.name}</p>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                                <div>
                                    <p>জন্ম তারিখ</p>
                                    <p>{studentData?.dob ? new Date(studentData.dob).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }) : "N/A"}</p>
                                </div>
                                <div>
                                    <p>জন্মসনদ/NID </p>
                                    <p>{studentData?.nid || "N/A"}</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                                <div>
                                    <p>জেন্ডার</p>
                                    <p>{translateToBangla(studentData?.gender)}</p>
                                </div>
                                <div>
                                    <p>রক্তের গ্রুপ</p>
                                    <p>{studentData?.bloodGroup || "N/A"}</p>
                                </div>
                                <div>
                                    <p>মো바일 নম্বর</p>
                                    <p>{studentData?.phone || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-4'>
                            <div className='my-6 bg-[#F7F7F7]'>
                                <div className='border-[1px] border-gray-200 relative bg-[#F7F7F7]'>
                                    <h1 className='text-[#63736C] absolute top-1/2 left-0 -translate-y-1/2 pr-4 bg-white py-1 font-sembold text-[18px]'>প্রাতিষ্ঠানিক তথ্য  </h1>
                                </div>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                                <div>
                                    <p>আইডি</p>
                                    <p>{studentData?.uid || "N/A"}</p>
                                </div>
                                <div>
                                    <p>আবাসিক অবস্থা</p>
                                    <p>{translateToBangla(studentData?.residential)}</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                                <div>
                                    <p>রোল নম্বর</p>
                                    <p>{studentData?.roll?.toLocaleString('bn-BD') || "N/A"}</p>
                                </div>
                                <div>
                                    <p>শ্রেণী</p>
                                    <p>{translateToBangla(studentData?.class)}</p>
                                </div>
                                <div>
                                    <p>শাখা</p>
                                    <p>{translateToBangla(studentData?.section)}</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between gap-4'>
                                <div>
                                    <p>শিফট</p>
                                    <p>{translateToBangla(studentData?.shift)}</p>
                                </div>
                                <div>
                                    <p>বিভাগ</p>
                                    <p>{translateToBangla(studentData?.division)}</p>
                                </div>
                                <div>
                                    <p>সেশন</p>
                                    <p>{translateToBangla(studentData?.session)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-6'>
                        <div className='pl-6 mt-6'>
                            <h3 className='text-[20px] text-[#246545] font-semibold pl-18'>ঠিকানা </h3>
                        </div>
                        <div className='flex flex-col gap-24'>
                            <div className='w-full'>
                                <div className='my-6 bg-[#F7F7F7]'>
                                    <div className='border-[1px] border-gray-200 relative bg-[#F7F7F7]'>
                                        <h1 className='text-[#63736C] absolute top-1/2 left-0 -translate-y-1/2 pr-4 bg-white py-1 font-sembold text-[18px]'>বর্তমান ঠিকানা  </h1>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between gap-4'>
                                    <div>
                                        <p>গ্রাম</p>
                                        <p>{addressData?.present?.village}</p>
                                    </div>
                                    <div>
                                        <p>উপজেলা/থানা </p>
                                        <p>{addressData?.present?.upazila}</p>
                                    </div>
                                    <div>
                                        <p>জেলা </p>
                                        <p>{addressData?.present?.district}</p>
                                    </div>
                                    <div>
                                        <p>বিভাগ </p>
                                        <p>{addressData?.present?.division}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className='my-6 bg-[#F7F7F7]'>
                                    <div className='border-[1px] border-gray-200 relative bg-[#F7F7F7]'>
                                        <h1 className='text-[#63736C] absolute top-1/2 left-0 -translate-y-1/2 pr-4 bg-white py-1 font-sembold text-[18px]'>স্থায়ী ঠিকানা  </h1>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between gap-4'>
                                    <div>
                                        <p>গ্রাম</p>
                                        <p>{addressData?.permanent?.village}</p>
                                    </div>
                                    <div>
                                        <p>উপজেলা/থানা </p>
                                        <p>{addressData?.permanent?.upazila}</p>
                                    </div>
                                    <div>
                                        <p>জেলা </p>
                                        <p>{addressData?.permanent?.district}</p>
                                    </div>
                                    <div>
                                        <p>বিভাগ </p>
                                        <p>{addressData?.permanent?.division}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-6'>
                        <div className='pl-6 mt-6'>
                            <h3 className='text-[20px] text-[#246545] font-semibold pl-18'>অভিভাবকের তথ্য </h3>
                        </div>
                        <div className='flex items-center justify-between flex-col gap-6'>
                            <div className='w-full'>
                                <div className='my-6 bg-[#F7F7F7]'>
                                    <div className='border-[1px] border-gray-200 relative bg-[#F7F7F7]'>
                                        <h1 className='text-[#63736C] absolute top-1/2 left-0 -translate-y-1/2 pr-4 bg-white py-1 font-sembold text-[18px]'>পিতার তথ্য</h1>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between gap-4'>
                                    <div>
                                        <p>নাম</p>
                                        <p>{guardianData?.fatherName}</p>
                                    </div>
                                    <div>
                                        <p>মোবাইল নম্বর</p>
                                        <p>{guardianData?.fatherPhone}</p>
                                    </div>
                                    <div>
                                        <p>NID </p>
                                        <p>{guardianData?.fatherNid || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className='my-6 bg-[#F7F7F7]'>
                                    <div className='border-[1px] border-gray-200 relative bg-[#F7F7F7]'>
                                        <h1 className='text-[#63736C] absolute top-1/2 left-0 -translate-y-1/2 pr-4 bg-white py-1 font-sembold text-[18px]'>মাতার তথ্য</h1>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between gap-4'>
                                    <div>
                                        <p>নাম</p>
                                        <p>{guardianData?.motherName}</p>
                                    </div>
                                    <div>
                                        <p>মোবাইল নম্বর</p>
                                        <p>{guardianData?.motherPhone}</p>
                                    </div>
                                    <div>
                                        <p>NID </p>
                                        <p>{guardianData?.motherNid || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className='my-6 bg-[#F7F7F7]'>
                                    <div className='border-[1px] border-gray-200 relative bg-[#F7F7F7]'>
                                        <h1 className='text-[#63736C] absolute top-1/2 left-0 -translate-y-1/2 pr-4 bg-white py-1 font-sembold text-[18px]'>অভিবাবকের তথ্য</h1>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between gap-4'>
                                    <div>
                                        <p>সম্পর্ক </p>
                                        <p>{guardianData?.guardianRelation}</p>
                                    </div>
                                    <div>
                                        <p>নাম</p>
                                        <p>{guardianData?.guardianName}</p>
                                    </div>
                                    <div>
                                        <p>মোবাইল নম্বর</p>
                                        <p>{guardianData?.guardianPhone}</p>
                                    </div>
                                    <div>
                                        <p>NID </p>
                                        <p>{guardianData?.guardianNid || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-6'>
                        <div className='pl-6 mt-6'>
                            <h3 className='text-[20px] text-[#246545] font-semibold pl-18'>পুরাতন মাদ্রাসার তথ্য</h3>
                        </div>
                        <div className='flex items-center justify-between flex-col gap-6'>
                            <div className='w-full'>
                                <div className='flex items-center justify-between gap-4'>
                                    <div>
                                        <p>নাম</p>
                                        <p>{madrasaData?.name || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p>সর্বশেষ উত্তীর্ণ ক্লাস</p>
                                        <p>{madrasaData?.lastClass || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p>সর্বশেষ উত্তীর্ণ রেজাল্ট </p>
                                        <p>{madrasaData?.lastResult || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-6'>
                        <div className='pl-6 mt-6'>
                            <h3 className='text-[20px] text-[#246545] font-semibold pl-18'>তালিমি মুরব্বি / স্থানীয় মুরব্বি</h3>
                        </div>
                        <div className='flex items-center justify-between flex-col gap-6'>
                            <div className='w-full'>
                                <div className='flex items-center justify-between gap-4'>
                                    <div>
                                        <p>হযরতের নাম </p>
                                        <p>{madrasaData?.localGuardianName || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p>হযরতের মোবাইল নম্বর</p>
                                        <p>{madrasaData?.localGuardianPhone || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p>পরীক্ষকের নাম/ সুপারিশ করি </p>
                                        <p>{madrasaData?.recommenderName || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p>ফলাফল</p>
                                        <p>{madrasaData?.testResult || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between mt-10 px-6'>
                        <div>
                            <hr />
                            <p className='mt-2'>শিক্ষার্থীর </p>
                        </div>
                        <div>
                            <hr />
                            <p className='mt-2'>অভিভাবকের স্বাক্ষর</p>
                        </div>
                        <div>
                            <hr />
                            <p className='mt-2'>শিক্ষা সচিবের স্বাক্ষর</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
