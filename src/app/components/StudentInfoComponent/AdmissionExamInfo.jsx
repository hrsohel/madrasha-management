import { useState, useEffect } from "react";
import { Pencil, X } from "lucide-react";
import { updateStudentFullDetails, updateDraftStudent } from "@/services/studentService";
import toast from "react-hot-toast";
import ConfirmationModal from "@/app/components/ConfirmationModal";

export default function AdmissionExamInfo({ admissionExamInfo, studentId, onUpdateSuccess, isDraft = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [examInfo, setExamInfo] = useState({
    admissionExaminer: admissionExamInfo?.admissionExaminer || "",
    admissionResult: admissionExamInfo?.admissionResult || "",
    notes: admissionExamInfo?.notes || "",
  });

  useEffect(() => {
    setExamInfo({
      admissionExaminer: admissionExamInfo?.admissionExaminer || "",
      admissionResult: admissionExamInfo?.admissionResult || "",
      notes: admissionExamInfo?.notes || "",
    });
  }, [admissionExamInfo]);

  const handleChange = (field, value) => {
    setExamInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsConfirmOpen(true);
  };

  const confirmUpdate = async () => {
    setLoading(true);
    try {
      const mergedOldMadrasaInfo = {
        ...admissionExamInfo,
        ...examInfo
      };

      if (isDraft) {
        // For drafts, send as a singular object 'oldMadrasaInfo' at root
        await updateDraftStudent(studentId, { oldMadrasaInfo: mergedOldMadrasaInfo });
      } else {
        // For active students, send as an array 'oldMadrasaInfo'
        await updateStudentFullDetails(studentId, { oldMadrasaInfo: [mergedOldMadrasaInfo] });
      }

      toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে!");
      if (onUpdateSuccess) onUpdateSuccess();
      setIsModalOpen(false);
      setIsConfirmOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("আপডেট ব্যর্থ হয়েছে।");
      setIsConfirmOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-[#F7F7F7] mt-10">
      <div className=" mx-auto">
        {/* Main Content */}
        <div className="bg-[#F7F7F7] rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-dashed border-gray-300 px-6 py-4">
            <h1 className="text-xl font-semibold text-[#246545]">
              ভর্তি পরীক্ষা সংক্রান্ত
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center text-[#2B7752] font-semi-bold gap-2 px-4 py-[6px] border-[1px] bg-[#E7FEF2] border-[#2B7752] rounded-md hover:bg-[#E7FEF2] transition-colors"
            >
              <Pencil className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-8">
              {/* পরীক্ষকের নাম */}
              <div>
                <p className="text-sm text-[#63736C] mb-2">
                  পরীক্ষকের নাম / মূল্যায়ন কারী
                </p>
                <p className="text-sm text-[#424D47] font-semibold">
                  {examInfo.admissionExaminer}
                </p>
              </div>

              {/* ফলাফল */}
              <div>
                <p className="text-sm text-[#63736C] mb-2">ফলাফল</p>
                <p className="text-sm text-[#424D47] font-semibold">
                  {examInfo.admissionResult}
                </p>
              </div>
              {/* Notes */}
              <div>
                <p className="text-sm text-[#63736C] mb-2">নোটস</p>
                <p className="text-sm text-[#424D47] font-semibold">
                  {examInfo.notes}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#F7F7F7] rounded-xl max-w-md w-full shadow-2xl">

            {/* Modal Header + X Button */}
            <div className="px-8 pt-8 pb-6 border-b border-dashed border-gray-300 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#246545]">
                ভর্তি পরীক্ষা সংক্রান্ত
              </h2>

              {/* ❌ Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-8 pb-8">
              {/* পরীক্ষকের নাম */}
              <div className="mb-5">
                <label className="block text-sm text-[#63736C] mb-2">
                  পরীক্ষকের নাম / মূল্যায়ন কারী
                </label>
                <input
                  type="text"
                  value={examInfo.admissionExaminer}
                  onChange={(e) => handleChange('admissionExaminer', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                />
              </div>

              {/* ফলাফল */}
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2">
                  ফলাফল
                </label>
                <input
                  type="text"
                  value={examInfo.admissionResult}
                  onChange={(e) => handleChange('admissionResult', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                />
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2">
                  নোটস
                </label>
                <input
                  type="text"
                  value={examInfo.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                />
              </div>

              {/* Note */}
              <p className="text-xs text-gray-600 mb-6">
                আপডেটকৃত তথ্য সংরক্ষন করলে 'সেভ করুন' বাটনে ক্লিক করুন অথবা
                'ক্যানসেল করুন'
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-[#2B7752] text-white rounded-md hover:bg-[#246545] transition-colors font-medium"
                >
                  {loading ? 'সংরক্ষণ হচ্ছে...' : 'সেভ করুন'}
                </button>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  ক্যানসেল করুন
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmUpdate}
        title="তথ্য হালনাগাদ নিশ্চিতকরণ"
        message="আপনি কি নিশ্চিত যে আপনি এই তথ্য আপডেট করতে চান?"
        loading={loading}
      />
    </div>
  );
}
