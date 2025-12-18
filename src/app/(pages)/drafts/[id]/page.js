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

import { EditStudentModal } from "@/app/components/StudentInfoComponent/EditStudentModal";

import AcademicYearInfo from "@/app/components/StudentInfoComponent/AcademicYearInfo";
import AddressInfo from "@/app/components/StudentInfoComponent/AddressInfo";
import FamilyInfo from "@/app/components/StudentInfoComponent/FamilyInfo";
import GuardianInfo from "@/app/components/StudentInfoComponent/GuardianInfo";
import StudentInfo from "@/app/components/StudentInfoComponent/StudentInfo";
import AdmissionExamInfo from "@/app/components/StudentInfoComponent/AdmissionExamInfo";
import { Printer } from "lucide-react";

export default function DraftViewPage() {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { madrasaSettings } = useSelector((state) => state.settings);

    const [draft, setDraft] = useState(null);
    const [loading, setLoading] = useState(true);
    const [confirming, setConfirming] = useState(false);
    const [error, setError] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
            } else {
                setError("Draft not found");
            }
        } catch (err) {
            setError(err.message || "Failed to load draft");
        } finally {
            setLoading(false);
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

    // Extract relevant data for sub-components (similar to StudentDetailsPage)
    const studentData = {
        ...draft,
        guardian: draft.guardian ? draft.guardian[0] : null,
        address: draft.addresse ? draft.addresse[0] : null,
        admissionExamInfo: draft.oldMadrasaInfo ? draft.oldMadrasaInfo[0] : null,
        fees: Array.isArray(draft.fees) ? draft.fees[0] : (draft.fees || {}),
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen printable-content">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 print-button">
                <div className="flex items-center gap-4">
                    <Link href="/drafts" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">ফিরে যান</span>
                    </Link>
                    <div className="h-6 w-[1px] bg-gray-300"></div>
                    <h1 className="text-xl font-bold text-[#246545]">ড্রাফট শিক্ষার্থীর পূর্ণাঙ্গ তথ্য</h1>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2"
                    >
                        <Edit2 className="w-5 h-5" />
                        তথ্য সম্পাদনা করুন
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2"
                    >
                        <Printer className="w-5 h-5" />
                        প্রিন্ট করুন
                    </button>
                </div>
            </div>

            <div className="space-y-0">
                <StudentInfo student={studentData} onUpdateSuccess={fetchDraftDetails} isDraft={true} />
                {studentData.address && <AddressInfo address={studentData.address} studentId={studentData._id} onUpdateSuccess={fetchDraftDetails} isDraft={true} />}
                {studentData.guardian && <FamilyInfo guardian={studentData.guardian} studentId={studentData._id} onUpdateSuccess={fetchDraftDetails} isDraft={true} />}
                {studentData.admissionExamInfo && <GuardianInfo oldMadrasaInfo={studentData.admissionExamInfo} studentId={studentData._id} onUpdateSuccess={fetchDraftDetails} isDraft={true} />}
                {studentData.admissionExamInfo && <AcademicYearInfo oldMadrasaInfo={studentData.admissionExamInfo} studentId={studentData._id} onUpdateSuccess={fetchDraftDetails} isDraft={true} />}
                {studentData.admissionExamInfo && <AdmissionExamInfo admissionExamInfo={studentData.admissionExamInfo} studentId={studentData._id} onUpdateSuccess={fetchDraftDetails} isDraft={true} />}

                {/* View Mode: Digital Receipt */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden print:no-shadow mt-10">
                    <StudentAdmissionReceipt
                        student={studentData}
                        fees={studentData.fees}
                        madrasaSettings={madrasaSettings}
                    />
                </div>

                <div className="flex justify-center py-12 print-button">
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

            {/* Edit Modal */}
            <EditStudentModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                studentData={draft}
                onUpdateSuccess={fetchDraftDetails}
                isDraft={true}
            />

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
