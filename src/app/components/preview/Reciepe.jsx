import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addStudent, resetAddStudentStatus, clearStudentFormData } from '../../../lib/features/students/studentSlice'
import { translateToBangla } from '../../../lib/utils'

export default function Reciepe({ setNavigateToReciepe }) {
    const dispatch = useDispatch();
    const studentFormData = useSelector((state) => state.students.studentFormData);
    const { loading, error, success } = useSelector((state) => state.students);
    const { madrasaSettings } = useSelector((state) => state.settings);

    const [localLoading, setLocalLoading] = useState(false);
    const [localError, setLocalError] = useState(null);

    useEffect(() => {
        setLocalLoading(loading);
        if (error) {
            setLocalError(error.message || JSON.stringify(error));
        }
        if (success) {
            // Optionally handle success feedback
            dispatch(resetAddStudentStatus());
            dispatch(clearStudentFormData()); // Clear form data after successful submission
            // setNavigateToReciepe(2); // Navigation should happen after API call in handleSubmit
        }
    }, [loading, error, success, dispatch]);

    const handleSubmit = async () => {

        console.log(studentFormData)
        if (!studentFormData) {
            setLocalError("Student data is missing. Please go back and fill the form.");
            return;
        }
        setLocalLoading(true);
        setLocalError(null);
        try {
            await dispatch(addStudent(studentFormData)).unwrap();
            setNavigateToReciepe(2); // Navigate on successful API call
        } catch (err) {
            setLocalError(err.message || JSON.stringify(err));
        } finally {
            setLocalLoading(false);
        }
    };
    return (
        <div

            className='border-t-2 border-dashed border-gray-400 mt-4 py-2 relative'
        >
            <div
                style={{
                    backgroundImage: `url("/802422a1353a261fc2a0056a2430a594a0d6f235.png")`,
                    backgroundSize: "400px 400px"
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
                        <Image src="/802422a1353a261fc2a0056a2430a594a0d6f235.png" className='w-[70px] h-[70px] rounded-full block border-[1px] border-[#71847B] object-cover' width={100} height={100} alt='Default Logo' />
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
            <div className='flex items-center justify-evenly w-full px-10'>
                <div className=' w-full'>
                    <p className='flex items-center justify-start gap-2'><span>ফরম নং</span> <span>:</span> <span>75</span></p>
                </div>
                <div className='bg-[#2B7752] p-2 w-[300px] text-center'>
                    <p className='text-white'>ভর্তি রশিদ </p>
                </div>
                <div className=' w-full'>
                    <p className='flex items-center justify-end gap-2'><span>তারিখ</span> <span>:</span> <span>{new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
                </div>
            </div>
            <div className='mt-6 px-10'>
                <div className='border-[1px] border-gray-200 relative bg-[#92A09A] border-dashed'>
                    <h1 className='text-[#EC221F] absolute top-1/2 left-0 -translate-y-1/2 pr-4 py-1 bg-white font-sembold text-[18px]'>নতুন ভর্তি </h1>
                </div>
            </div>
            <div className='flex items-center justify-between px-10 mt-6'>
                <div className=' w-full text-[#424D47] font-[500] text-[16px]'>
                    <p className='flex items-center justify-start gap-2'><span>নাম</span> <span>:</span> <span>{studentFormData.student.name}</span></p>
                    <p className='flex items-center justify-start gap-2'><span>রোল</span> <span>:</span> <span>{studentFormData.student.roll}</span></p>
                    <p className='flex items-center justify-start gap-2'><span>শিফট</span> <span>:</span> <span>{translateToBangla(studentFormData.student.shift)}</span></p>
                </div>
                <div className=' w-full text-[#424D47] font-[500] text-[16px]'>
                    <p className='flex items-center justify-start gap-2'><span>আইডি</span> <span>:</span> <span>{studentFormData.student.uid}</span></p>
                    <p className='flex items-center justify-start gap-2'><span>শ্রেণী</span> <span>:</span> <span>{translateToBangla(studentFormData.student.class)}</span></p>
                    <p className='flex items-center justify-start gap-2'><span>বিভাগ</span> <span>:</span> <span>{translateToBangla(studentFormData.student.division)}</span></p>
                </div>
                <div className=' w-full text-[#424D47] font-[500] text-[16px]'>
                    <p className='flex items-center justify-start gap-2'><span>আবাসিক অবস্থা</span> <span>:</span> <span className='text-[#14AE5C]'>{translateToBangla(studentFormData.student.residential)}</span></p>
                    <p className='flex items-center justify-start gap-2'><span>শাখা</span> <span>:</span> <span>{translateToBangla(studentFormData.student.section)}</span></p>
                    <p className='flex items-center justify-start gap-2'><span>সেশন</span> <span>:</span> <span>{translateToBangla(studentFormData.student.session)}</span></p>
                </div>
            </div>
            <div className='mt-6 px-10'>
                <div className='border-[1px] border-gray-200 relative bg-[#92A09A] border-dashed'>
                    <h1 className='text-[#246545] absolute top-1/2 left-0 -translate-y-1/2 pr-4 py-1 bg-white font-sembold text-[18px]'>হিসাব </h1>
                </div>
            </div>
            <div className='flex items-center justify-between px-10 mt-6'>
                <div className=' w-full text-[#424D47] font-[500] text-[16px]'>
                    <p className='flex items-center justify-start gap-2'><span>সর্বমোট </span> <span>:</span> <span>{(['admissionFee', 'booksFee', 'ITFee', 'IDCardFee', 'libraryFee', 'kafelaFee', 'confirmFee'].reduce((sum, key) => sum + (Number(studentFormData.fees[key]) || 0), 0)).toLocaleString('bn-BD')}৳</span></p>
                    <p className='flex items-center justify-start gap-2'><span>প্রদেয় পরিমাণ</span> <span>:</span> <span>{((['admissionFee', 'booksFee', 'ITFee', 'IDCardFee', 'libraryFee', 'kafelaFee', 'confirmFee'].reduce((sum, key) => sum + (Number(studentFormData.fees[key]) || 0), 0)) - (studentFormData.fees.helpAmount || 0)).toLocaleString('bn-BD')}৳</span></p>
                </div>
                <div className=' w-full text-[#424D47] font-[500] text-[16px]'>
                    <p className='flex items-center justify-start gap-2'><span>সাহায্য </span> <span>:</span> <span>{(studentFormData.fees.helpAmount || 0).toLocaleString('bn-BD')}</span></p>
                    <p className='flex items-center justify-start gap-2'><span>কথায়</span> <span>:</span> <span>{studentFormData.fees.amountInWords || 'Not Available'} </span></p>
                </div>
                <div className=' w-full text-[#424D47] font-[500] text-[16px]'>
                    <p className='flex items-center justify-start gap-2'><span>সাহায্যের খাত </span> <span>:</span> <span>{translateToBangla(studentFormData.fees.helpType) || 'N/A'} </span></p>
                </div>
            </div>
            <div className='flex items-center justify-between mt-10 px-10'>
                <div>
                    <hr />
                    <p className='mt-2'>মুহতামিমেরে স্বাক্ষর</p>
                </div>
                <div>
                    <hr />
                    <p className='mt-2'>হিসাব রক্ষকের স্বাক্ষর</p>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4 px-6 print:hidden">
                <button className="w-full sm:w-auto px-10 py-2 text-blue-600 font-bold text-lg border-2 border-blue-500 rounded-lg bg-[#DFF2FF] hover:bg-blue-50 transition">
                    ড্রাফট সেভ করুন
                </button>

                <button onClick={handleSubmit} className="w-full sm:w-auto px-12 py-2 bg-[#2B7752] text-white font-bold text-lg rounded-lg hover:bg-green-700 transition shadow-md" disabled={localLoading}>
                    {localLoading ? 'জমা হচ্ছে...' : 'ভর্তি কনফার্ম করুন'}
                </button>
            </div>
            {localError && <p className="text-red-500 text-center mt-4">{localError}</p>}
        </div>
    )
}
