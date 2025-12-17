import { useState, useEffect } from "react";
import { Pencil, X } from "lucide-react";
import { updateStudentFullDetails } from "@/services/studentService";
import toast from "react-hot-toast";
import ConfirmationModal from "@/app/components/ConfirmationModal";

export default function FamilyInfo({ guardian, studentId, onUpdateSuccess }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [familyInfo, setFamilyInfo] = useState({
    fatherName: guardian?.fatherName || "",
    fatherPhone: guardian?.fatherPhone || "",
    fatherNID: guardian?.fatherNID || "",
    motherName: guardian?.motherName || "",
    motherPhone: guardian?.motherPhone || "",
    motherNID: guardian?.motherNID || "",
    guardianName: guardian?.guardianName || "",
    guardianPhone: guardian?.guardianPhone || "",
    guardianRelation: guardian?.guardianRelation || "",
    guardianNID: guardian?.guardianNID || "",
    monthlyIncome: guardian?.monthlyIncome || "",
  });

  useEffect(() => {
    setFamilyInfo({
      fatherName: guardian?.fatherName || "",
      fatherPhone: guardian?.fatherPhone || "",
      fatherNID: guardian?.fatherNID || "",
      motherName: guardian?.motherName || "",
      motherPhone: guardian?.motherPhone || "",
      motherNID: guardian?.motherNID || "",
      guardianName: guardian?.guardianName || "",
      guardianPhone: guardian?.guardianPhone || "",
      guardianRelation: guardian?.guardianRelation || "",
      guardianNID: guardian?.guardianNID || "",
      monthlyIncome: guardian?.monthlyIncome || "",
    });
  }, [guardian]);

  const handleChange = (field, value) => {
    setFamilyInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsConfirmOpen(true);
  };

  const confirmUpdate = async () => {
    setLoading(true);
    try {
      const payload = {
        guardian: [{
          ...familyInfo
        }]
      };

      await updateStudentFullDetails(studentId, payload);
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
    <div className="bg-[#F7F7F7] mt-10">
      <div className="mx-auto">
        {/* Main Content */}
        <div className="bg-[#F7F7F7] rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-dashed border-gray-300 px-6 py-4">
            <h1 className="text-xl font-semibold text-[#246545]">
              পরিবারের তথ্য
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
            {/* পিতার তথ্য */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-[#63736C] mb-4">
                পিতার তথ্য
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-[#63736C] mb-2">নাম</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {familyInfo.fatherName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] mb-2">মোবাইল নম্বর</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {familyInfo.fatherPhone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] mb-2">NID</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {familyInfo.fatherNID}
                  </p>
                </div>
              </div>
            </div>

            {/* মাতার তথ্য */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-[#63736C] mb-4">
                মাতার তথ্য
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-[#63736C] mb-2">নাম</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {familyInfo.motherName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] mb-2">মোবাইল নম্বর</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {familyInfo.motherPhone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] mb-2">NID</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {familyInfo.motherNID}
                  </p>
                </div>
              </div>
            </div>

            {/* অভিভাবকের তথ্য */}
            <div>
              <h3 className="text-base font-semibold text-[#63736C] mb-4">
                অভিভাবকের তথ্য
              </h3>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-[#63736C] mb-2">নাম</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {familyInfo.guardianName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] mb-2">মোবাইল নম্বর</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {familyInfo.guardianPhone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] mb-2">সম্পর্ক</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {familyInfo.guardianRelation}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] mb-2">মাসিক আয়</p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {familyInfo.monthlyIncome}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-6 border-b border-dashed border-gray-300 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#246545]">
                পরিবারের তথ্য সম্পাদনা
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-8 pb-8">
              {/* পিতার তথ্য */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-700 mb-4">
                  পিতার তথ্য
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">নাম</label>
                    <input
                      type="text"
                      value={familyInfo.fatherName}
                      onChange={(e) => handleChange('fatherName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">মোবাইল নম্বর</label>
                    <input
                      type="text"
                      value={familyInfo.fatherPhone}
                      onChange={(e) => handleChange('fatherPhone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">NID</label>
                    <input
                      type="text"
                      value={familyInfo.fatherNID}
                      onChange={(e) => handleChange('fatherNID', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* মাতার তথ্য */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-700 mb-4">
                  মাতার তথ্য
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">নাম</label>
                    <input
                      type="text"
                      value={familyInfo.motherName}
                      onChange={(e) => handleChange('motherName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">মোবাইল নম্বর</label>
                    <input
                      type="text"
                      value={familyInfo.motherPhone}
                      onChange={(e) => handleChange('motherPhone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">NID</label>
                    <input
                      type="text"
                      value={familyInfo.motherNID}
                      onChange={(e) => handleChange('motherNID', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* অভিভাবকের তথ্য */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-700 mb-4">
                  অভিভাবকের তথ্য
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">নাম</label>
                    <input
                      type="text"
                      value={familyInfo.guardianName}
                      onChange={(e) => handleChange('guardianName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">মোবাইল নম্বর</label>
                    <input
                      type="text"
                      value={familyInfo.guardianPhone}
                      onChange={(e) => handleChange('guardianPhone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">সম্পর্ক</label>
                    <select
                      value={familyInfo.guardianRelation}
                      onChange={(e) => handleChange('guardianRelation', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">নির্বাচন করুন</option>
                      <option>Father</option>
                      <option>Mother</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">মাসিক আয়</label>
                    <input
                      type="text"
                      value={familyInfo.monthlyIncome}
                      onChange={(e) => handleChange('monthlyIncome', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Note */}
              <p className="text-xs text-gray-600 mb-6">
                আপডেটকৃত তথ্য সংরক্ষন করলে 'সেভ করুন' বাটনে ক্লিক করুন
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-[#2B7752] text-white rounded-md hover:bg-[#246545] transition-colors font-medium"
                >
                  {loading ? 'সংরক্ষণ হচ্ছে...' : 'সেভ করুন'}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
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
