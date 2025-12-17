"use client";
import { Upload } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMadrasaSettings, updateMadrasaSettings, resetSettingsStatus } from '@/lib/features/settings/settingsSlice';
import toast from 'react-hot-toast';

export default function Page() {
    const dispatch = useDispatch();
    const { madrasaSettings, loading, error, success } = useSelector((state) => state.settings);

    const [formData, setFormData] = useState({
        name: { bangla: '', english: '', arabic: '' },
        location: { bangla: '', english: '', arabic: '' },
        contact: { email: '', phone: '' },
        logo: null,
    });
    const [logoPreview, setLogoPreview] = useState(null);

    useEffect(() => {
        dispatch(fetchMadrasaSettings());
    }, [dispatch]);

    useEffect(() => {
        if (madrasaSettings) {
            setFormData({
                name: madrasaSettings.name || { bangla: '', english: '', arabic: '' },
                location: madrasaSettings.location || { bangla: '', english: '', arabic: '' },
                contact: madrasaSettings.contact || { email: '', phone: '' },
                logo: null,
            });
            setLogoPreview(madrasaSettings.logo ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${madrasaSettings.logo}` : '/Madrashalogo.png');
        }
    }, [madrasaSettings]);

    useEffect(() => {
        if (success) {
            toast.success('Settings updated successfully!');
            dispatch(resetSettingsStatus());
        }
        if (error) {
            toast.error(`Error: ${error.message || 'Failed to update settings'}`);
            dispatch(resetSettingsStatus());
        }
    }, [success, error, dispatch]);

    const handleInputChange = (e, section, field) => {
        setFormData({
            ...formData,
            [section]: {
                ...formData[section],
                [field]: e.target.value,
            },
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, logo: file });
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = () => {
        dispatch(updateMadrasaSettings(formData));
    };

    if (loading && !madrasaSettings) {
        return <div className="px-[24px] mt-12 w-[60%] mx-auto text-center">Loading settings...</div>;
    }

    return (
        <div className="px-[24px] mt-12 w-[60%] mx-auto">
            <div className='border-[1px] border-gray-200 relative'>
                <h1 className='text-[#63736C] absolute top-1/2 left-0 -translate-y-1/2 bg-white pr-4 py-1 font-sembold text-[24px]'>লোগো  </h1>
            </div>
            <div className="flex items-center justify-start gap-4 mt-8">
                <div>
                    {/* <Image src={logoPreview || '/Madrashalogo.png'} className="w-[120px] h-[120px] rounded-full border border-[#424D47] object-cover" width={120} height={120} alt={logoPreview}/> */}
                    <img src={logoPreview || '/Madrashalogo.png'} className="w-[120px] h-[120px] rounded-full border border-[#424D47] object-cover" width={120} height={120} alt={logoPreview} />
                </div>
                <div>
                    <label htmlFor="image" className="bg-[#E7FEF2] px-[16px] py-[8px] text-[#2B7752] text-[18px] font-[500] cursor-pointer">নতুন লোগো উপলোড </label>
                    <input type="file" name="image" id="image" className="hidden" onChange={handleFileChange} />
                    <p className="text-[#63736C] text-[16px] mt-4">Image must be 1200x1200.png or .jpg</p>
                </div>
            </div>
            <div className="mt-12">
                <div className='border-[1px] border-gray-200 relative'>
                    <h1 className='text-[#63736C] absolute top-1/2 left-0 -translate-y-1/2 bg-white pr-4 py-1 font-sembold text-[24px]'>মাদ্রাসার নাম  </h1>
                </div>
                <div className="mt-8">
                    <label htmlFor="name-bangla">বাংলা</label>
                    <input type="text" className="w-full border rounded-sm p-1 text-lg outline-none focus:border-green-700" name="name-bangla" id="name-bangla" value={formData.name.bangla} onChange={(e) => handleInputChange(e, 'name', 'bangla')} />
                </div>
                <div className="mt-8">
                    <label htmlFor="name-english">ইংরেজি</label>
                    <input type="text" className="w-full border rounded-sm p-1 text-lg outline-none focus:border-green-700" name="name-english" id="name-english" value={formData.name.english} onChange={(e) => handleInputChange(e, 'name', 'english')} />
                </div>
                <div className="mt-8">
                    <label htmlFor="name-arabic">আরবি </label>
                    <input type="text" className="w-full border rounded-sm p-1 text-lg outline-none focus:border-green-700" name="name-arabic" id="name-arabic" value={formData.name.arabic} onChange={(e) => handleInputChange(e, 'name', 'arabic')} />
                </div>
                <div className='border-[1px] border-gray-200 relative my-8'>
                    <h1 className='text-[#63736C] absolute top-1/2 left-0 -translate-y-1/2 bg-white pr-4 py-1 font-sembold text-[24px]'>ঠিকানা </h1>
                </div>
                <div className="mt-8">
                    <label htmlFor="location-bangla">বাংলা</label>
                    <input type="text" className="w-full border rounded-sm p-1 text-lg outline-none focus:border-green-700" name="location-bangla" id="location-bangla" value={formData.location.bangla} onChange={(e) => handleInputChange(e, 'location', 'bangla')} />
                </div>
                <div className="mt-8">
                    <label htmlFor="location-english">ইংরেজি</label>
                    <input type="text" className="w-full border rounded-sm p-1 text-lg outline-none focus:border-green-700" name="location-english" id="location-english" value={formData.location.english} onChange={(e) => handleInputChange(e, 'location', 'english')} />
                </div>
                <div className="mt-8">
                    <label htmlFor="location-arabic">আরবি </label>
                    <input type="text" className="w-full border rounded-sm p-1 text-lg outline-none focus:border-green-700" name="location-arabic" id="location-arabic" value={formData.location.arabic} onChange={(e) => handleInputChange(e, 'location', 'arabic')} />
                </div>
                <div className='border-[1px] border-gray-200 relative my-8'>
                    <h1 className='text-[#63736C] absolute top-1/2 left-0 -translate-y-1/2 bg-white pr-4 py-1 font-sembold text-[24px]'>যোগাযোগ  </h1>
                </div>
                <div className="mt-8">
                    <label htmlFor="contact-email">Email</label>
                    <input type="text" className="w-full border rounded-sm p-1 text-lg outline-none focus:border-green-700" name="contact-email" id="contact-email" value={formData.contact.email} onChange={(e) => handleInputChange(e, 'contact', 'email')} />
                </div>
                <div className="mt-8">
                    <label htmlFor="contact-phone">Mobile number</label>
                    <input type="text" className="w-full border rounded-sm p-1 text-lg outline-none focus:border-green-700" name="contact-phone" id="contact-phone" value={formData.contact.phone} onChange={(e) => handleInputChange(e, 'contact', 'phone')} />
                </div>
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleUpdate}
                        className="bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition shadow-md px-8 py-3"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}