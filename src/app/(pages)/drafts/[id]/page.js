"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import axios from "axios";
import { translateToBangla } from "@/lib/utils";
import toast from "react-hot-toast";
import ConfirmationModal from "@/app/components/ConfirmationModal";

export default function DraftViewPage() {
    const { id } = useParams();
    const router = useRouter();
    const { madrasaSettings } = useSelector((state) => state.settings);

    const [draft, setDraft] = useState(null);
    const [loading, setLoading] = useState(true);
    const [confirming, setConfirming] = useState(false);
    const [error, setError] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    useEffect(() => {
        fetchDraftDetails();
    }, [id]);

    const fetchDraftDetails = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/students/students/get-draft/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.data.success && response.data.data) {
                console.log("Complete draft data:", response.data.data);
                setDraft(response.data.data);
            } else {
                setError("Draft not found");
            }
        } catch (err) {
            setError(err.message || "Failed to load draft");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmClick = () => {
        setIsConfirmOpen(true);
    };

    const confirmAdmission = async () => {
        setConfirming(true);
        try {
            const token = localStorage.getItem("token");

            // Fetch a fresh UID to ensure uniqueness
            const uidResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/students/get-id?t=${new Date().getTime()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                    }
                }
            );

            let newUid = draft.uid; // Fallback to draft UID
            if (uidResponse.data.success) {
                const { id, seq } = uidResponse.data.data;
                newUid = `${id}-${seq}`;
                console.log("Generated fresh UID:", newUid);
            }

            // Helper to remove system fields
            const sanitizeData = (data) => {
                if (Array.isArray(data)) {
                    return data.map(item => sanitizeData(item));
                }
                if (data && typeof data === 'object') {
                    // Create a new object to avoid mutating the original
                    const { _id, id, createdAt, updatedAt, __v, ...rest } = data;
                    const cleanObj = { ...rest };

                    Object.keys(cleanObj).forEach(key => {
                        cleanObj[key] = sanitizeData(cleanObj[key]);
                    });
                    return cleanObj;
                }
                return data;
            };

            // Prepare data for student creation
            const studentData = {
                student: {
                    name: draft.name,
                    roll: draft.roll,
                    uid: newUid, // Use the freshly generated UID
                    class: draft.class,
                    division: draft.division,
                    section: draft.section,
                    shift: draft.shift,
                    residential: draft.residential,
                    session: draft.session,
                    dob: draft.dob,
                    birthCertificate: draft.birthCertificate,
                    gender: draft.gender,
                    bloodGroup: draft.bloodGroup,
                    phone: draft.phone,
                    profileImage: draft.profileImage
                },
                guardian: sanitizeData(draft.guardian || []),
                addresse: sanitizeData(draft.addresse || []),
                fees: sanitizeData(draft.fees || {}),
                oldMadrasaInfo: sanitizeData(draft.oldMadrasaInfo || [])
            };

            await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/students/students/add-student`,
                studentData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            // Delete the draft after successful admission
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/students/students/delete-draft/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            toast.success("ভর্তি সফলভাবে কনফার্ম করা হয়েছে!");
            router.push("/all-students");
        } catch (err) {
            console.error("Confirmation failed:", err);
            const errMsg = err.response?.data?.message || err.message;
            toast.error(`ভর্তি কনফার্ম করতে ব্যর্থ হয়েছে: ${errMsg}`);
        } finally {
            setConfirming(false);
            setIsConfirmOpen(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[#2B7752]" />
            </div>
        );
    }

    if (error || !draft) {
        return (
            <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600">ত্রুটি: {error || "Draft not found"}</p>
                </div>
                <Link href="/drafts" className="mt-4 inline-block text-blue-600">
                    ← ফিরে যান
                </Link>
            </div>
        );
    }

    // Calculate fees
    const fees = draft.fees || {};
    const allFees = madrasaSettings?.fees || {};
    const feeEntries = Object.entries(allFees);
    const calculatedTotalFee = feeEntries.reduce((sum, [feeName]) => {
        const val = Number(fees[feeName] || 0);
        return sum + (isNaN(val) ? 0 : val);
    }, 0);
    const calculatedFinalAmount = calculatedTotalFee - (fees.helpAmount || 0);

    // Get guardian data
    const guardian = draft.guardian?.[0] || {};
    const address = draft.addresse?.[0] || {};
    const oldMadrasa = draft.oldMadrasaInfo?.[0] || {};

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href="/drafts"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">ফিরে যান</span>
                </Link>
                <div className="h-6 w-[1px] bg-gray-300"></div>
                <h1 className="text-xl font-bold text-[#246545]">ড্রাফট রিভিউ</h1>
            </div>

            {/* Receipt Preview */}
            <div className="border-t-2 border-dashed border-gray-400 mt-4 py-2 relative bg-white rounded-lg">
                <div
                    style={{
                        backgroundImage: `url("/802422a1353a261fc2a0056a2430a594a0d6f235.png")`,
                        backgroundSize: "400px 400px"
                    }}
                    className="absolute top-0 left-0 right-0 w-full h-full -z-10 bg-no-repeat bg-center opacity-20 bg-cover"
                ></div>

                <h1 className="text-[30px] font-normal text-center">
                    {madrasaSettings?.name?.arabic || "دارالعلوم معين السنة سريمنغل"}
                </h1>

                <div className="flex items-center justify-around">
                    <div className="flex items-center justify-center gap-4">
                        {madrasaSettings?.logo ? (
                            <img
                                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${madrasaSettings.logo}`}
                                className="w-[70px] h-[70px] rounded-full block border-[1px] border-[#71847B] object-cover"
                                alt="Madrasa Logo"
                            />
                        ) : (
                            <Image
                                src="/802422a1353a261fc2a0056a2430a594a0d6f235.png"
                                className="w-[70px] h-[70px] rounded-full block border-[1px] border-[#71847B] object-cover"
                                width={100}
                                height={100}
                                alt="Default Logo"
                            />
                        )}
                        <div>
                            <h1 className="text-[21px] font-[500] text-[#424D47]">
                                {madrasaSettings?.name?.bangla || "দারুল উলুম মূঈনুস সুন্নাহ, শ্রীমঙ্গল"}
                            </h1>
                            <h3 className="text-[15px] font-[400] text-[#424D47]">
                                {madrasaSettings?.location?.bangla || "ভানুগাছ রোড , রেল গেট, শ্রীমঙ্গল, মৌলভীবাজার, সিলেট"}
                            </h3>
                        </div>
                    </div>
                    <div>
                        <svg width="8" height="24" viewBox="0 0 8 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="0.744863" y1="1.46745e-08" x2="0.744861" y2="23.8356" stroke="#424D47" strokeWidth="1.48973" />
                            <line x1="6.70385" y1="1.46745e-08" x2="6.70385" y2="23.8356" stroke="#424D47" strokeWidth="1.48973" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-[21px] font-[500] text-[#424D47]">
                            {madrasaSettings?.name?.english || "Darul Ulum Muinus Sunnah Sreemangal"}
                        </h1>
                        <h3 className="text-[15px] font-[400] text-[#424D47]">
                            {madrasaSettings?.contact?.email || "darululummuinussunnah@gmail.com"} || {madrasaSettings?.contact?.phone || "+880 1611-109960"}
                        </h3>
                    </div>
                </div>

                <div className="flex items-center justify-evenly w-full px-10 mt-4">
                    <div className="w-full">
                        <p className="flex items-center justify-start gap-2">
                            <span>ফরম নং</span> <span>:</span> <span>75</span>
                        </p>
                    </div>
                    <div className="bg-[#2B7752] p-2 w-[300px] text-center">
                        <p className="text-white">ভর্তি রশিদ (ড্রাফট)</p>
                    </div>
                    <div className="w-full">
                        <p className="flex items-center justify-end gap-2">
                            <span>তারিখ</span> <span>:</span>{" "}
                            <span>{new Date().toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" })}</span>
                        </p>
                    </div>
                </div>

                {/* Student Info Section */}
                <div className="mt-6 px-10">
                    <div className="border-[1px] border-gray-200 relative bg-[#92A09A] border-dashed">
                        <h1 className="text-[#EC221F] absolute top-1/2 left-0 -translate-y-1/2 pr-4 py-1 bg-white font-sembold text-[18px]">
                            নতুন ভর্তি
                        </h1>
                    </div>
                </div>

                <div className="flex items-center justify-between px-10 mt-6">
                    <div className="w-full text-[#424D47] font-[500] text-[16px]">
                        <p className="flex items-center justify-start gap-2">
                            <span>নাম</span> <span>:</span> <span>{draft.name || "N/A"}</span>
                        </p>
                        <p className="flex items-center justify-start gap-2">
                            <span>রোল</span> <span>:</span> <span>{draft.roll || "N/A"}</span>
                        </p>
                        <p className="flex items-center justify-start gap-2">
                            <span>শিফট</span> <span>:</span> <span>{translateToBangla(draft.shift || "N/A")}</span>
                        </p>
                    </div>
                    <div className="w-full text-[#424D47] font-[500] text-[16px]">
                        <p className="flex items-center justify-start gap-2">
                            <span>আইডI</span> <span>:</span> <span>{draft.uid || "N/A"}</span>
                        </p>
                        <p className="flex items-center justify-start gap-2">
                            <span>শ্রেণী</span> <span>:</span> <span>{translateToBangla(draft.class || "N/A")}</span>
                        </p>
                        <p className="flex items-center justify-start gap-2">
                            <span>বিভাগ</span> <span>:</span> <span>{translateToBangla(draft.division || "N/A")}</span>
                        </p>
                    </div>
                    <div className="w-full text-[#424D47] font-[500] text-[16px]">
                        <p className="flex items-center justify-start gap-2">
                            <span>আবাসিক অবস্থা</span> <span>:</span>{" "}
                            <span className="text-[#14AE5C]">{translateToBangla(draft.residential || "N/A")}</span>
                        </p>
                        <p className="flex items-center justify-start gap-2">
                            <span>শাখা</span> <span>:</span> <span>{translateToBangla(draft.section || "N/A")}</span>
                        </p>
                        <p className="flex items-center justify-start gap-2">
                            <span>সেশন</span> <span>:</span> <span>{translateToBangla(draft.session || "N/A")}</span>
                        </p>
                    </div>
                </div>

                {/* Guardian Info Section */}
                {guardian && Object.keys(guardian).length > 0 && (
                    <>
                        <div className="mt-6 px-10">
                            <div className="border-[1px] border-gray-200 relative bg-[#92A09A] border-dashed">
                                <h1 className="text-[#246545] absolute top-1/2 left-0 -translate-y-1/2 pr-4 py-1 bg-white font-sembold text-[18px]">
                                    অভিভাবকের তথ্য
                                </h1>
                            </div>
                        </div>

                        <div className="px-10 mt-6">
                            <div className="grid grid-cols-3 gap-6 text-[#424D47] font-[500] text-[16px]">
                                <div>
                                    <p className="text-sm text-gray-600">পিতার নাম</p>
                                    <p>{guardian.fatherName || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">পিতার ফোন</p>
                                    <p>{guardian.fatherPhone || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">মাতার নাম</p>
                                    <p>{guardian.motherName || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">অভিভাবকের নাম</p>
                                    <p>{guardian.guardianName || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">অভিভাবকের ফোন</p>
                                    <p>{guardian.guardianPhone || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">সম্পর্ক</p>
                                    <p>{guardian.guardianRelation || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Address Section */}
                {/* Address Section */}
                {address && Object.keys(address).length > 0 && (
                    <>
                        <div className="mt-6 px-10">
                            <div className="border-[1px] border-gray-200 relative bg-[#92A09A] border-dashed">
                                <h1 className="text-[#246545] absolute top-1/2 left-0 -translate-y-1/2 pr-4 py-1 bg-white font-sembold text-[18px]">
                                    বর্তমান ঠিকানা
                                </h1>
                            </div>
                        </div>

                        <div className="px-10 mt-6">
                            <div className="grid grid-cols-3 gap-6 text-[#424D47] font-[500] text-[16px]">
                                <div>
                                    <p className="text-sm text-gray-600">বিভাগ</p>
                                    <p>{address.presentDivision || address.division || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">জেলা</p>
                                    <p>{address.presentDistrict || address.district || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">উপজেলা</p>
                                    <p>{address.presentUpazila || address.upazila || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">গ্রাম</p>
                                    <p>{address.presentVillage || address.village || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">অন্যান্য/পোস্ট</p>
                                    <p>{address.presentOthers || address.postOffice || "N/A"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 px-10">
                            <div className="border-[1px] border-gray-200 relative bg-[#92A09A] border-dashed">
                                <h1 className="text-[#246545] absolute top-1/2 left-0 -translate-y-1/2 pr-4 py-1 bg-white font-sembold text-[18px]">
                                    স্থায়ী ঠিকানা
                                </h1>
                            </div>
                        </div>

                        <div className="px-10 mt-6">
                            <div className="grid grid-cols-3 gap-6 text-[#424D47] font-[500] text-[16px]">
                                <div>
                                    <p className="text-sm text-gray-600">বিভাগ</p>
                                    <p>{address.permanentDivision || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">জেলা</p>
                                    <p>{address.permanentDistrict || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">উপজেলা</p>
                                    <p>{address.permanentUpazila || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">গ্রাম</p>
                                    <p>{address.permanentVillage || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">অন্যান্য/পোস্ট</p>
                                    <p>{address.permanentOthers || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Old Madrasa / Admission Info Section */}
                {oldMadrasa && Object.keys(oldMadrasa).length > 0 && (
                    <>
                        <div className="mt-6 px-10">
                            <div className="border-[1px] border-gray-200 relative bg-[#92A09A] border-dashed">
                                <h1 className="text-[#246545] absolute top-1/2 left-0 -translate-y-1/2 pr-4 py-1 bg-white font-sembold text-[18px]">
                                    তালিমি মুরব্বি / পূর্বের মাদ্রাসা
                                </h1>
                            </div>
                        </div>

                        <div className="px-10 mt-6">
                            <div className="grid grid-cols-3 gap-6 text-[#424D47] font-[500] text-[16px]">
                                <div>
                                    <p className="text-sm text-gray-600">তালিমি মুরব্বি</p>
                                    <p>{oldMadrasa.talimiGuardianName || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">মুরব্বির ফোন</p>
                                    <p>{oldMadrasa.talimiGuardianPhone || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">পূর্বের মাদ্রাসা</p>
                                    <p>{oldMadrasa.oldMadrasaName || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">শ্রেণী/জামাত</p>
                                    <p>{oldMadrasa.oldMadrasaClass || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">ফলাফল</p>
                                    <p>{oldMadrasa.oldMadrasaResult || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">ভর্তি পরীক্ষক</p>
                                    <p>{oldMadrasa.admissionExaminer || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">ভর্তি ফলাফল</p>
                                    <p>{oldMadrasa.admissionResult || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Fees Section */}
                <div className="mt-6 px-10">
                    <div className="border-[1px] border-gray-200 relative bg-[#92A09A] border-dashed">
                        <h1 className="text-[#246545] absolute top-1/2 left-0 -translate-y-1/2 pr-4 py-1 bg-white font-sembold text-[18px]">
                            হিসাব
                        </h1>
                    </div>
                </div>

                <div className="flex items-center justify-between px-10 mt-6">
                    <div className="w-full text-[#424D47] font-[500] text-[16px]">
                        <p className="flex items-center justify-start gap-2">
                            <span>সর্বমোট </span> <span>:</span> <span>{calculatedTotalFee.toLocaleString("bn-BD")}৳</span>
                        </p>
                        <p className="flex items-center justify-start gap-2">
                            <span>প্রদেয় পরিমাণ</span> <span>:</span> <span>{calculatedFinalAmount.toLocaleString("bn-BD")}৳</span>
                        </p>
                    </div>
                    <div className="w-full text-[#424D47] font-[500] text-[16px]">
                        <p className="flex items-center justify-start gap-2">
                            <span>সাহায্য </span> <span>:</span> <span>{(fees.helpAmount || 0).toLocaleString("bn-BD")}</span>
                        </p>
                        <p className="flex items-center justify-start gap-2">
                            <span>কথায়</span> <span>:</span> <span>{fees.amountInWords || "Not Available"} </span>
                        </p>
                    </div>
                    <div className="w-full text-[#424D47] font-[500] text-[16px]">
                        <p className="flex items-center justify-start gap-2">
                            <span>সাহায্যের খাত </span> <span>:</span>{" "}
                            <span>{translateToBangla(fees.helpType) || "N/A"} </span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-10 px-10">
                    <div>
                        <hr />
                        <p className="mt-2">মুহতামিমেরে স্বাক্ষর</p>
                    </div>
                    <div>
                        <hr />
                        <p className="mt-2">হিসাব রক্ষকের স্বাক্ষর</p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 mt-8 px-6 pb-6">
                    <button
                        onClick={handleConfirmClick}
                        disabled={confirming}
                        className="px-12 py-3 bg-[#2B7752] text-white font-bold text-lg rounded-lg hover:bg-green-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {confirming ? "কনফার্ম হচ্ছে..." : "ভর্তি কনফার্ম করুন"}
                    </button>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmAdmission}
                title="ভর্তি নিশ্চিতকরণ"
                message="আপনি কি নিশ্চিত যে আপনি এই ভর্তি কনফার্ম করতে চান?"
                confirmText={confirming ? "কনফার্ম হচ্ছে..." : "হ্যাঁ, কনফার্ম"}
                loading={confirming}
            />
        </div >
    );
}
