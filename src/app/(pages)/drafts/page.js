"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Edit, Eye } from "lucide-react";
import { getDraftStudents } from "@/services/studentService";
import toast from "react-hot-toast";
import ConfirmationModal from "@/app/components/ConfirmationModal";

export default function DraftsPage() {
    const [drafts, setDrafts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchDrafts();
    }, []);

    const fetchDrafts = async () => {
        try {
            setLoading(true);
            const response = await getDraftStudents();
            setDrafts(response.data || []);
        } catch (err) {
            setError(err.message || "Failed to load drafts");
            console.error("Error fetching drafts:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setIsConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;

        try {
            const { deleteDraft } = await import('@/services/studentService');
            await deleteDraft(deleteId);
            setDrafts((prev) => prev.filter((d) => d._id !== deleteId));
            toast.success("ড্রাফট সফলভাবে মুছে ফেলা হয়েছে।");
            setIsConfirmOpen(false);
        } catch (err) {
            console.error("Delete failed:", err);
            toast.error("মুছে ফেলা ব্যর্থ হয়েছে।");
            setIsConfirmOpen(false);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/all-students"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">ফিরে যান</span>
                    </Link>
                    <div className="h-6 w-[1px] bg-gray-300"></div>
                    <h1 className="text-2xl font-bold text-[#246545]">
                        ড্রাফট ছাত্র ({drafts.length})
                    </h1>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="text-center py-12">
                    <p className="text-gray-600">লোড হচ্ছে...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-600">ত্রুটি: {error}</p>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && drafts.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <div className="max-w-md mx-auto">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Edit className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            কোনো ড্রাফট নেই
                        </h3>
                        <p className="text-gray-500 mb-6">
                            আপনি এখনও কোনো ছাত্র ড্রাফট সংরক্ষণ করেননি।
                        </p>
                        <a
                            href="/add-student"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2B7752] text-white rounded-lg hover:bg-[#246545] transition no-underline"
                        >
                            নতুন ছাত্র যোগ করুন
                        </a>
                    </div>
                </div>
            )}

            {/* Drafts Table */}
            {!loading && !error && drafts.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        নাম
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        রোল
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        শ্রেণী
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        বিভাগ
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        তারিখ
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                                        অ্যাকশন
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {drafts.map((draft) => (
                                    <tr key={draft._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {draft.student?.name || draft.name || "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {draft.student?.roll || draft.roll || "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {draft.student?.class || draft.class || "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {draft.student?.division || draft.division || "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {draft.createdAt
                                                ? new Date(draft.createdAt).toLocaleDateString('bn-BD')
                                                : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/drafts/${draft._id}`}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                    title="দেখুন"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteClick(draft._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                    title="মুছে ফেলুন"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <ConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="ড্রাফট মুছুন"
                message="আপনি কি নিশ্চিত যে আপনি এই ড্রাফট মুছে ফেলতে চান?"
                confirmText="মুছে ফেলুন"
                cancelText="বাতিল"
            />
        </div>
    );
}
