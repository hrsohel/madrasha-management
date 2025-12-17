"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Loader2, Save, X, Edit2 } from "lucide-react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { translateToBangla } from "@/lib/utils";
import toast from "react-hot-toast";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import { addStudent } from "@/lib/features/students/studentSlice";
import { updateDraftStudent } from "@/services/studentService";
import StudentAdmissionReceipt from "@/app/components/StudentInfoComponent/StudentAdmissionReceipt";

export default function DraftViewPage() {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { madrasaSettings } = useSelector((state) => state.settings);

    const [draft, setDraft] = useState(null);
    const [editedDraft, setEditedDraft] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [confirming, setConfirming] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
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
                setDraft(response.data.data);
                setEditedDraft(response.data.data);
            } else {
                setError("Draft not found");
            }
        } catch (err) {
            setError(err.message || "Failed to load draft");
        } finally {
            setLoading(false);
        }
    };

    const handleEditToggle = () => {
        if (isEditing) {
            setEditedDraft(draft); // Reset changes if cancelling
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (section, field, value) => {
        setEditedDraft(prev => {
            if (section === 'student') {
                return { ...prev, [field]: value };
            }

            const sectionKey = section === 'address' ? 'addresse' :
                section === 'madrasa' ? 'oldMadrasaInfo' : section;

            const currentSectionArray = prev[sectionKey] || [];
            const currentSection = Array.isArray(currentSectionArray) ? (currentSectionArray[0] || {}) : (currentSectionArray || {});
            const updatedSection = { ...currentSection, [field]: value };

            return {
                ...prev,
                [sectionKey]: [updatedSection]
            };
        });
    };

    const handleFeeChange = (field, value) => {
        setEditedDraft(prev => {
            const currentFees = Array.isArray(prev.fees) ? prev.fees[0] : (prev.fees || {});
            return {
                ...prev,
                fees: {
                    ...currentFees,
                    [field]: value
                }
            };
        });
    };

    const handleSaveDraftUpdate = async () => {
        setIsSaving(true);
        try {
            await updateDraftStudent(id, editedDraft);
            setDraft(editedDraft);
            setIsEditing(false);
            toast.success("ড্রাফট আপডেট করা হয়েছে।");
        } catch (err) {
            console.error("Update failed:", err);
            toast.error("আপডেট করতে ব্যর্থ হয়েছে।");
        } finally {
            setIsSaving(false);
        }
    };

    const handleConfirmAdmission = async () => {
        setConfirming(true);
        try {
            const token = localStorage.getItem("token");

            // Fetch a fresh UID
            const uidResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/students/get-id?t=${new Date().getTime()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Cache-Control': 'no-cache'
                    }
                }
            );

            let newUid = draft.uid;
            if (uidResponse.data.success) {
                const { id: uidTag, seq } = uidResponse.data.data;
                newUid = `${uidTag}-${seq}`;
            }

            // Prepare structured data for addStudent thunk
            const studentData = {
                student: {
                    ...draft,
                    uid: newUid,
                    status: 'active'
                },
                guardian: draft.guardian?.[0] || {},
                address: draft.addresse?.[0] || {},
                fees: Array.isArray(draft.fees) ? draft.fees[0] : (draft.fees || {}),
                madrasa: draft.oldMadrasaInfo?.[0] || {}
            };

            // Remove internal DB fields from nested objects
            const clean = (obj) => {
                if (!obj) return {};
                const { _id, id, createdAt, updatedAt, __v, ...rest } = obj;
                return rest;
            };

            studentData.guardian = clean(studentData.guardian);
            studentData.address = clean(studentData.address);
            studentData.fees = clean(studentData.fees);
            studentData.madrasa = clean(studentData.madrasa);

            await dispatch(addStudent(studentData)).unwrap();

            // Delete draft upon success
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/students/students/delete-draft/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("ভর্তি সফলভাবে কনফার্ম করা হয়েছে!");
            router.push("/all-students");
        } catch (err) {
            console.error("Confirmation failed:", err);
            toast.error(`ভর্তি কনফার্ম করতে ব্যর্থ হয়েছে: ${err.message}`);
        } finally {
            setConfirming(false);
            setIsConfirmOpen(false);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen"><Loader2 className="animate-spin" /></div>;
    }

    if (error || !draft) {
        return <div className="p-6 text-red-500">Error: {error || "Draft not found"}</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Link href="/drafts" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">ফিরে যান</span>
                    </Link>
                    <div className="h-6 w-[1px] bg-gray-300"></div>
                    <h1 className="text-xl font-bold text-[#246545]">ড্রাফট রিভিউ ও এডিট</h1>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleEditToggle}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isEditing ? 'bg-gray-200 text-gray-700' : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'
                            }`}
                    >
                        {isEditing ? <><X className="w-4 h-4" /> বাতিল</> : <><Edit2 className="w-4 h-4" /> এডিট করুন</>}
                    </button>
                    {isEditing && (
                        <button
                            onClick={handleSaveDraftUpdate}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-4 py-2 bg-[#2B7752] text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            সংরক্ষণ করুন
                        </button>
                    )}
                </div>
            </div>

            {isEditing ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-10">
                    {/* Student Basic Info */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-6 pb-2 border-b">শিক্ষার্থীর মৌলিক তথ্য</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">নাম</label>
                                <input
                                    type="text"
                                    value={editedDraft.name || ''}
                                    onChange={(e) => handleInputChange('student', 'name', e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">শ্রেণী</label>
                                <input
                                    type="text"
                                    value={editedDraft.class || ''}
                                    onChange={(e) => handleInputChange('student', 'class', e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">রোল</label>
                                <input
                                    type="text"
                                    value={editedDraft.roll || ''}
                                    onChange={(e) => handleInputChange('student', 'roll', e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">জন্ম তারিখ</label>
                                <input
                                    type="date"
                                    value={editedDraft.dob || ''}
                                    onChange={(e) => handleInputChange('student', 'dob', e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">ফোন</label>
                                <input
                                    type="text"
                                    value={editedDraft.phone || ''}
                                    onChange={(e) => handleInputChange('student', 'phone', e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Guardian Info */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-6 pb-2 border-b">অভিভাবকের তথ্য</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">পিতার নাম</label>
                                <input
                                    type="text"
                                    value={editedDraft.guardian?.[0]?.fatherName || ''}
                                    onChange={(e) => handleInputChange('guardian', 'fatherName', e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">মাতার নাম</label>
                                <input
                                    type="text"
                                    value={editedDraft.guardian?.[0]?.motherName || ''}
                                    onChange={(e) => handleInputChange('guardian', 'motherName', e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">অভিভাবকের নাম</label>
                                <input
                                    type="text"
                                    value={editedDraft.guardian?.[0]?.guardianName || ''}
                                    onChange={(e) => handleInputChange('guardian', 'guardianName', e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">অভিভাবকের ফোন</label>
                                <input
                                    type="text"
                                    value={editedDraft.guardian?.[0]?.guardianPhone || ''}
                                    onChange={(e) => handleInputChange('guardian', 'guardianPhone', e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Address Info */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-6 pb-2 border-b">বর্তমান ঠিকানা</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">বিভাগ</label>
                                <input
                                    type="text"
                                    value={editedDraft.addresse?.[0]?.presentDivision || ''}
                                    onChange={(e) => handleInputChange('address', 'presentDivision', e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">জেলা</label>
                                <input
                                    type="text"
                                    value={editedDraft.addresse?.[0]?.presentDistrict || ''}
                                    onChange={(e) => handleInputChange('address', 'presentDistrict', e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">উপজেলা</label>
                                <input
                                    type="text"
                                    value={editedDraft.addresse?.[0]?.presentUpazila || ''}
                                    onChange={(e) => handleInputChange('address', 'presentUpazila', e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">গ্রাম/মহল্লা</label>
                                <input
                                    type="text"
                                    value={editedDraft.addresse?.[0]?.presentVillage || ''}
                                    onChange={(e) => handleInputChange('address', 'presentVillage', e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Fees Info */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-6 pb-2 border-b">হিসাব ও ফি</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {Object.entries(madrasaSettings?.fees || {}).map(([key, defaultValue]) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">{key}</label>
                                    <input
                                        type="number"
                                        value={editedDraft.fees?.[0]?.[key] || ''}
                                        onChange={(e) => handleFeeChange(key, e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1 text-red-600 font-bold">সাহায্য (ছাড়)</label>
                                <input
                                    type="number"
                                    value={editedDraft.fees?.[0]?.helpAmount || 0}
                                    onChange={(e) => handleFeeChange('helpAmount', e.target.value)}
                                    className="w-full px-4 py-2 border border-red-200 rounded-lg text-red-600 font-bold"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* View Mode: Digital Receipt */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden print:no-shadow">
                        <StudentAdmissionReceipt
                            student={draft}
                            guardian={draft.guardian?.[0] || {}}
                            address={draft.addresse?.[0] || {}}
                            fees={Array.isArray(draft.fees) ? draft.fees[0] : (draft.fees || {})}
                            madrasaSettings={madrasaSettings}
                        />
                    </div>

                    <div className="flex justify-center pb-12">
                        <button
                            onClick={() => setIsConfirmOpen(true)}
                            disabled={confirming}
                            className="px-16 py-4 bg-[#2B7752] text-white font-bold text-xl rounded-xl hover:bg-green-700 transition shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
                        >
                            {confirming ? <Loader2 className="animate-spin inline mr-2" /> : null}
                            ভর্তি নিশ্চিত করুন
                        </button>
                    </div>
                </div>
            )}

            <ConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmAdmission}
                title="ভর্তি নিশ্চিতকরণ"
                message="আপনি কি নিশ্চিত যে এই ড্রাফট থেকে ভর্তি সম্পন্ন করতে চান? এটি একটি স্থায়ী ছাত্র রেকর্ড তৈরি করবে।"
                confirmText={confirming ? "প্রক্রিয়াধীন..." : "হ্যাঁ, নিশ্চিত"}
                loading={confirming}
            />
        </div>
    );
}
