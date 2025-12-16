import { useState, useEffect } from "react";
import { Pencil, X } from "lucide-react";
import { updateStudentFullDetails } from "@/services/studentService";

export default function AcademicYearInfo({ oldMadrasaInfo, studentId, onUpdateSuccess }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [madrasaInfo, setMadrasaInfo] = useState({
    oldMadrasaName: oldMadrasaInfo?.oldMadrasaName || "",
    oldMadrasaClass: oldMadrasaInfo?.oldMadrasaClass || "",
    oldMadrasaRoll: oldMadrasaInfo?.oldMadrasaRoll || "",
    passingYear: oldMadrasaInfo?.passingYear || "",
    result: oldMadrasaInfo?.result || "",
  });

  useEffect(() => {
    setMadrasaInfo({
      oldMadrasaName: oldMadrasaInfo?.oldMadrasaName || "",
      oldMadrasaClass: oldMadrasaInfo?.oldMadrasaClass || "",
      oldMadrasaRoll: oldMadrasaInfo?.oldMadrasaRoll || "",
      passingYear: oldMadrasaInfo?.passingYear || "",
      result: oldMadrasaInfo?.result || "",
    });
  }, [oldMadrasaInfo]);

  const handleChange = (field, value) => {
    setMadrasaInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!confirm("আপনি কি নিশ্চিত যে আপনি এই তথ্য আপডেট করতে চান?")) return;

    setLoading(true);
    try {
      const payload = {
        oldMadrasaInfo: [{
          ...oldMadrasaInfo,
          ...madrasaInfo
        }]
      };

      await updateStudentFullDetails(studentId, payload);
      alert("তথ্য সফলভাবে আপডেট করা হয়েছে!");
      if (onUpdateSuccess) onUpdateSuccess();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
      alert("আপডেট ব্যর্থ হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <div className="mx-auto">
        {/* Main Content */}
        <div className="bg-[#F7F7F7] rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-dashed border-gray-300 px-6 py-4">
            <h1 className="text-xl font-semibold text-[#246545]">
              পূর্বতন মাদ্রাসার তথ্য
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
            <div className="grid grid-cols-3 gap-8">
              {/* পূর্বতন মাদ্রাসার নাম */}
              <div>
                <p className="text-sm text-[#63736C] font-semibold mb-2">
                  পূর্বতন মাদ্রাসার নাম
                </p>
                <p className="text-sm text-[#424D47] font-semibold">
                  {madrasaInfo.oldMadrasaName}
                </p>
              </div>

              {/* সর্বশেষ উত্তীর্ণ ক্লাস */}
              <div>
                <p className="text-sm text-[#63736C] font-semibold mb-2">
                  সর্বশেষ উত্তীর্ণ ক্লাস
                </p>
                <p className="text-sm text-[#424D47] font-semibold">
                  {madrasaInfo.oldMadrasaClass}
                </p>
              </div>

              {/* সর্বশেষ ফলাফল */}
              <div>
                <p className="text-sm text-[#63736C] font-semibold mb-2">
                  সর্বশেষ ফলাফল
                </p>
                <p className="text-sm text-[#424D47] font-semibold">
                  {madrasaInfo.result}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-xl w-full shadow-2xl">
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-6 flex items-center justify-between border-b border-dashed border-gray-300">
              <h2 className="text-xl font-semibold text-[#246545]">
                পূর্বতন মাদ্রাসার তথ্য
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-8 pb-8">
              {/* পূর্বতন মাদ্রাসার নাম */}
              <div className="mb-5">
                <label className="block text-sm text-gray-700 mb-2 font-medium">
                  পূর্বতন মাদ্রাসার নাম
                </label>
                <input
                  type="text"
                  value={madrasaInfo.oldMadrasaName}
                  onChange={(e) => handleChange('oldMadrasaName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* সর্বশেষ উত্তীর্ণ ক্লাস */}
              <div className="mb-5">
                <label className="block text-sm text-gray-700 mb-2 font-medium">
                  সর্বশেষ উত্তীর্ণ ক্লাস
                </label>
                <select
                  value={madrasaInfo.oldMadrasaClass}
                  onChange={(e) => handleChange('oldMadrasaClass', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">নির্বাচন করুন</option>
                  <option>Hifz Completed</option>
                  <option>Nazera Completed</option>
                </select>
              </div>

              {/* সর্বশেষ ফলাফল */}
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2 font-medium">
                  সর্বশেষ ফলাফল
                </label>
                <select
                  value={madrasaInfo.result}
                  onChange={(e) => handleChange('result', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">নির্বাচন করুন</option>
                  <option>Passed</option>
                  <option>Failed</option>
                </select>
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
                  className="flex-1 px-6 py-3 bg-[#2B7752] text-white rounded-lg hover:bg-[#246545] transition-colors font-medium"
                >
                  {loading ? 'সংরক্ষণ হচ্ছে...' : 'সেভ করুন'}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  ক্যানসেল করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
