import Image from 'next/image'
import React from 'react'
import { translateToBangla } from '../../../lib/utils'

export default function ReciepeForAdmission2({ studentData, guardianData, addressData, madrasaData, feesData, madrasaSettings }) {
    const today = new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });

    const randomFormNo = React.useMemo(() => Math.floor(100 + Math.random() * 900).toLocaleString('bn-BD'), []);

    return (
        <>
            <div className='border p-6 relative min-h-[297mm]'>
                <div
                    style={{
                        backgroundImage: madrasaSettings?.logo ? `url("${process.env.NEXT_PUBLIC_API_BASE_URL}${madrasaSettings.logo}")` : `url("/802422a1353a261fc2a0056a2430a594a0d6f235.png")`,
                        backgroundSize: "600px",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        opacity: "0.1"
                    }}
                    className='absolute inset-0 -z-10'></div>

                <div className='py-1 relative'>
                    <h1 className='text-[34px] font-normal text-center mb-1'>{madrasaSettings?.name?.arabic || "دارالعلوم معين السنة"}</h1>

                    <div className='flex items-center justify-between gap-8 px-4'>
                        <div className='flex items-center gap-4 flex-1'>
                            {madrasaSettings?.logo ? (
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${madrasaSettings.logo}`}
                                    className='w-[60px] h-[60px] rounded-full border-[1px] border-[#71847B] object-cover'
                                    alt='Madrasa Logo'
                                />
                            ) : (
                                <Image src="/802422a1353a261fc2a0056a2430a594a0d6f235.png" className='w-[60px] h-[60px] rounded-full border-[1px] border-[#71847B] object-cover' width={100} height={100} alt='Default Logo' />
                            )}
                            <div>
                                <h1 className='text-[28px] font-bold text-[#424D47]'>{madrasaSettings?.name?.bangla || "দারুল উলুম মূঈনুস সুন্নাহ, শ্রীমঙ্গল"}</h1>
                                <p className='text-[16px] text-[#424D47] leading-tight'>{madrasaSettings?.location?.bangla || "ভানুগাছ রোড , রেল গেট, শ্রীমঙ্গল, মৌলভীবাজার, সিলেট"}</p>
                            </div>
                        </div>

                        <div className='h-16 border-l-2 border-gray-300'></div>

                        <div className='flex flex-col items-end flex-1'>
                            <h1 className='text-[28px] font-bold text-[#424D47]'>{madrasaSettings?.name?.english || "Darul Ulum Muinus Sunnah Sreemangal"}</h1>
                            <p className='text-[16px] text-[#424D47]'>{madrasaSettings?.contact?.email || "darululum@gmail.com"} | {madrasaSettings?.contact?.phone || "+880 1611-109960"}</p>
                        </div>
                    </div>

                    <div className='flex items-center justify-between border-y border-gray-100 py-2 my-2 px-4'>
                        <p className='text-[18px] flex gap-2'><strong>ফরম নং:</strong> <span>{studentData?.formNo || randomFormNo}</span></p>
                        <div className='bg-[#2B7752] px-12 py-1 rounded-sm'>
                            <p className='text-white font-bold tracking-widest text-[20px]'>ভর্তি ফরম</p>
                        </div>
                        <p className='text-[18px] flex gap-2'><strong>তারিখ:</strong> <span>{today}</span></p>
                    </div>

                    <div className='px-4 flex flex-col gap-4'>
                        {/* Student Info Section */}
                        <section>
                            <div className='border-b-2 border-gray-100 mb-2 pb-1'>
                                <h3 className='text-[20px] text-[#246545] font-bold'>শিক্ষার্থীর তথ্য</h3>
                            </div>

                            <div className='grid grid-cols-2 gap-x-12 gap-y-2 px-2'>
                                <div className='col-span-2 grid grid-cols-[160px_1fr] items-baseline border-b border-gray-50 pb-1'>
                                    <span className='text-gray-500 text-[17px]'>নাম:</span>
                                    <span className='font-semibold text-[19px]'>{studentData?.name}</span>
                                </div>
                                <div className='grid grid-cols-[160px_1fr] items-baseline border-b border-gray-50 pb-1'>
                                    <span className='text-gray-500 text-[17px]'>জন্ম তারিখ:</span>
                                    <span className='text-[17px]'>{studentData?.dob ? new Date(studentData.dob).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }) : "N/A"}</span>
                                </div>
                                <div className='grid grid-cols-[160px_1fr] items-baseline border-b border-gray-50 pb-1'>
                                    <span className='text-gray-500 text-[17px]'>জন্মসনদ/NID:</span>
                                    <span className='text-[17px]'>{studentData?.nid || "N/A"}</span>
                                </div>
                                <div className='grid grid-cols-[160px_1fr] items-baseline border-b border-gray-50 pb-1'>
                                    <span className='text-gray-500 text-[17px]'>জেন্ডার:</span>
                                    <span className='text-[17px]'>{translateToBangla(studentData?.gender)}</span>
                                </div>
                                <div className='grid grid-cols-[160px_1fr] items-baseline border-b border-gray-50 pb-1'>
                                    <span className='text-gray-500 text-[17px]'>রক্তের গ্রুপ:</span>
                                    <span className='text-[17px] font-bold'>{studentData?.bloodGroup || "N/A"}</span>
                                </div>
                                <div className='grid grid-cols-[160px_1fr] items-baseline border-b border-gray-50 pb-1'>
                                    <span className='text-gray-500 text-[17px]'>মোবাইল নম্বর:</span>
                                    <span className='text-[17px]'>{studentData?.phone || "N/A"}</span>
                                </div>
                                <div className='grid grid-cols-[160px_1fr] items-baseline border-b border-gray-50 pb-1'>
                                    <span className='text-gray-500 text-[17px]'>আবাসিক অবস্থা:</span>
                                    <span className='text-[17px]'>{translateToBangla(studentData?.residential)}</span>
                                </div>
                            </div>
                        </section>

                        {/* Institutional info */}
                        <section>
                            <div className='border-b-2 border-gray-100 mb-2 pb-1'>
                                <h3 className='text-[20px] text-[#246545] font-bold'>প্রাতিষ্ঠানিক তথ্য</h3>
                            </div>
                            <div className='grid grid-cols-3 gap-x-6 gap-y-2 px-2'>
                                <div className='grid grid-cols-[100px_1fr] items-baseline border-b border-gray-50 pb-1'>
                                    <span className='text-gray-500 text-[16px]'>আইডি:</span>
                                    <span className='text-[18px] font-bold text-[#2B7752]'>{studentData?.uid || "N/A"}</span>
                                </div>
                                <div className='grid grid-cols-[100px_1fr] items-baseline border-b border-gray-50 pb-1'>
                                    <span className='text-gray-500 text-[16px]'>রোল:</span>
                                    <span className='text-[17px]'>{studentData?.roll?.toLocaleString('bn-BD') || "N/A"}</span>
                                </div>
                                <div className='grid grid-cols-[100px_1fr] items-baseline border-b border-gray-50 pb-1'>
                                    <span className='text-gray-500 text-[16px]'>শ্রেণী:</span>
                                    <span className='text-[17px]'>{translateToBangla(studentData?.class)}</span>
                                </div>
                                <div className='grid grid-cols-[100px_1fr] items-baseline border-b border-gray-50 pb-1'>
                                    <span className='text-gray-500 text-[16px]'>শাখা:</span>
                                    <span className='text-[17px]'>{translateToBangla(studentData?.section)}</span>
                                </div>
                                <div className='grid grid-cols-[100px_1fr] items-baseline border-b border-gray-50 pb-1'>
                                    <span className='text-gray-500 text-[16px]'>শিফট:</span>
                                    <span className='text-[17px]'>{translateToBangla(studentData?.shift)}</span>
                                </div>
                                <div className='grid grid-cols-[100px_1fr] items-baseline border-b border-gray-50 pb-1'>
                                    <span className='text-gray-500 text-[16px]'>বিভাগ:</span>
                                    <span className='text-[17px]'>{translateToBangla(studentData?.division)}</span>
                                </div>
                                <div className='grid grid-cols-[100px_1fr] items-baseline border-b border-gray-50 pb-1'>
                                    <span className='text-gray-500 text-[16px]'>সেশন:</span>
                                    <span className='text-[17px]'>{translateToBangla(studentData?.session)}</span>
                                </div>
                            </div>
                        </section>

                        {/* Address info */}
                        <section>
                            <div className='border-b-2 border-gray-100 mb-2 pb-1 flex justify-between items-end'>
                                <h3 className='text-[20px] text-[#246545] font-bold'>ঠিকানা</h3>
                            </div>
                            <div className='grid grid-cols-2 gap-12 px-2'>
                                <div>
                                    <h4 className='text-[17px] font-bold text-gray-400 mb-3 underline uppercase tracking-wider'>বর্তমান ঠিকানা</h4>
                                    <div className='grid grid-cols-[120px_1fr] gap-y-2 text-[16px]'>
                                        <span className='text-gray-500'>গ্রাম:</span> <span>{addressData?.present?.village || addressData?.presentVillage || "N/A"}</span>
                                        <span className='text-gray-500'>থানা:</span> <span>{addressData?.present?.upazila || addressData?.presentUpazila || "N/A"}</span>
                                        <span className='text-gray-500'>জেলা:</span> <span>{addressData?.present?.district || addressData?.presentDistrict || "N/A"}</span>
                                        <span className='text-gray-500'>বিভাগ:</span> <span>{addressData?.present?.division || addressData?.presentDivision || "N/A"}</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className='text-[17px] font-bold text-gray-400 mb-3 underline uppercase tracking-wider'>স্থায়ী ঠিকানা</h4>
                                    <div className='grid grid-cols-[120px_1fr] gap-y-2 text-[16px]'>
                                        <span className='text-gray-500'>গ্রাম:</span> <span>{addressData?.permanent?.village || addressData?.permanentVillage || (addressData?.isSameAsPresent ? addressData?.presentVillage : addressData?.permanentVillage) || "N/A"}</span>
                                        <span className='text-gray-500'>থানা:</span> <span>{addressData?.permanent?.upazila || addressData?.permanentUpazila || (addressData?.isSameAsPresent ? addressData?.presentUpazila : addressData?.permanentUpazila) || "N/A"}</span>
                                        <span className='text-gray-500'>জেলা:</span> <span>{addressData?.permanent?.district || addressData?.permanentDistrict || (addressData?.isSameAsPresent ? addressData?.presentDistrict : addressData?.permanentDistrict) || "N/A"}</span>
                                        <span className='text-gray-500'>বিভাগ:</span> <span>{addressData?.permanent?.division || addressData?.permanentDivision || (addressData?.isSameAsPresent ? addressData?.presentDivision : addressData?.permanentDivision) || "N/A"}</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Guardian Info */}
                        <section>
                            <div className='border-b-2 border-gray-100 mb-2 pb-1'>
                                <h3 className='text-[20px] text-[#246545] font-bold'>অভিভাবকের তথ্য</h3>
                            </div>
                            <div className='grid grid-cols-3 gap-8 px-2'>
                                <div className='flex flex-col gap-2 border-r border-gray-50 pr-4'>
                                    <h4 className='text-[17px] font-bold text-gray-400 mb-1'>পিতা</h4>
                                    <p className='text-[19px] font-semibold'>{guardianData?.fatherName || "N/A"}</p>
                                    <p className='text-[17px]'>{guardianData?.fatherPhone || "N/A"}</p>
                                    <p className='text-[16px] text-gray-500'>NID: {guardianData?.fatherNid || guardianData?.fatherNID || "N/A"}</p>
                                </div>
                                <div className='flex flex-col gap-2 border-r border-gray-50 pr-4'>
                                    <h4 className='text-[17px] font-bold text-gray-400 mb-1'>মাতা</h4>
                                    <p className='text-[19px] font-semibold'>{guardianData?.motherName || "N/A"}</p>
                                    <p className='text-[17px]'>{guardianData?.motherPhone || "N/A"}</p>
                                    <p className='text-[16px] text-gray-500'>NID: {guardianData?.motherNid || guardianData?.motherNID || "N/A"}</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h4 className='text-[17px] font-bold text-gray-400 mb-1'>অভিভাবক ({guardianData?.guardianRelation || "N/A"})</h4>
                                    <p className='text-[19px] font-semibold'>{guardianData?.guardianName || "N/A"}</p>
                                    <p className='text-[17px]'>{guardianData?.guardianPhone || "N/A"}</p>
                                    <p className='text-[16px] text-gray-500'>NID: {guardianData?.guardianNid || guardianData?.guardianNID || "N/A"}</p>
                                </div>
                            </div>
                        </section>

                        {/* Previous Madrasa / Local Guardian */}
                        <div className='grid grid-cols-2 gap-8'>
                            <section>
                                <div className='border-b-2 border-gray-100 mb-2 pb-1'>
                                    <h3 className='text-[18px] text-[#246545] font-bold'>পুরাতন মাদ্রাসার তথ্য</h3>
                                </div>
                                <div className='grid grid-cols-[140px_1fr] gap-y-2 text-[17px] px-2'>
                                    <span className='text-gray-500'>নাম:</span> <span>{madrasaData?.name || madrasaData?.oldMadrasaName || "N/A"}</span>
                                    <span className='text-gray-500'>ক্লাস:</span> <span>{madrasaData?.lastClass || madrasaData?.oldMadrasaClass || "N/A"}</span>
                                    <span className='text-gray-500'>রেজাল্ট:</span> <span>{madrasaData?.lastResult || madrasaData?.oldMadrasaResult || "N/A"}</span>
                                </div>
                            </section>
                            <section>
                                <div className='border-b-2 border-gray-100 mb-2 pb-1'>
                                    <h3 className='text-[18px] text-[#246545] font-bold'>স্থানীয় মুরব্বি ও ফলাফল</h3>
                                </div>
                                <div className='grid grid-cols-[140px_1fr] gap-y-2 text-[17px] px-2'>
                                    <span className='text-gray-500'>মুরব্বি:</span> <span>{madrasaData?.localGuardianName || madrasaData?.talimiGuardianName || "N/A"}</span>
                                    <span className='text-gray-500'>মোবাইল:</span> <span>{madrasaData?.localGuardianPhone || madrasaData?.talimiGuardianPhone || "N/A"}</span>
                                    <span className='text-gray-500'>সুপারিশ:</span> <span>{madrasaData?.recommenderName || madrasaData?.admissionExaminer || "N/A"}</span>
                                    <span className='text-gray-500 font-bold'>ফলাফল:</span> <span className='text-[#246545] font-bold text-[18px]'>{madrasaData?.testResult || madrasaData?.admissionResult || "N/A"}</span>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className='flex items-end justify-between mt-32 px-8 text-center'>
                        <div className='w-56 border-t border-gray-400 pt-3'>
                            <p className='text-[17px]'>শিক্ষার্থীর স্বাক্ষর</p>
                        </div>
                        <div className='w-56 border-t border-gray-400 pt-3'>
                            <p className='text-[17px]'>অভিভাবকের স্বাক্ষর</p>
                        </div>
                        <div className='w-56 border-t border-gray-400 pt-3 relative'>
                            {madrasaSettings?.signature && (
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${madrasaSettings.signature}`}
                                    className='absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-16 object-contain'
                                    alt='Secretary Signature'
                                />
                            )}
                            <p className='text-[17px] font-bold'>শিক্ষা সচিবের স্বাক্ষর</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
