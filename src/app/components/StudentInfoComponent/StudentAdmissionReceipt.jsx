import { translateToBangla } from "@/lib/utils";

// Convert English numbers to Bangla
const toBanglaNumber = (num) => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, digit => banglaDigits[digit]);
};

export default function StudentAdmissionReceipt({ fees, student, madrasaSettings }) {
  // Get all fees dynamically from settings
  const allFeeDefinitions = madrasaSettings?.fees || {};
  const feeEntries = Object.entries(allFeeDefinitions);

  // Calculate total fees dynamically
  const totalFees = fees?.totalFees || feeEntries.reduce((sum, [feeName]) => {
    // Check both flat structure (legacy) and feeItems (new)
    const val = Number(fees?.feeItems?.[feeName] || fees?.[feeName] || 0);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  const payableAmount = fees?.finalAmount || (totalFees - (fees?.helpAmount || 0));

  // Placeholder for converting number to words (requires a proper library or implementation)
  const numberToWords = (num) => {
    // This is a simplified placeholder. A real implementation would be complex.
    if (typeof num !== 'number') return '';
    const banglaNum = toBanglaNumber(num);
    return `টাকা ${banglaNum} মাত্র`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('bn-BD', options);
  };

  return (
    <div className=" flex items-center justify-center mt-10">
      <div className="   rounded-lg p-8  w-full shadow-sm">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-300">
          {/* Logo and Bangla Name */}
          <div className="flex items-center gap-4">
            {madrasaSettings?.logo ? (
              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${madrasaSettings.logo}`}
                alt="Madrasa Logo"
                className="w-20 h-20 bg-white rounded-full object-cover border-4 border-blue-700"
              />
            ) : (
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center border-4 border-blue-700">
                <div className="text-white text-center">
                  <div className="text-xs font-bold">DUMS</div>
                  <div className="text-2xl">🕌</div>
                </div>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {madrasaSettings?.name?.bangla || "দারুল উলুম মুঈনুস সুন্নাহ, শ্রীমঙ্গল"}
              </h2>
              <p className="text-sm text-gray-600">
                {madrasaSettings?.location?.bangla || "ভানুগাছ রোড , রেল গেট, শ্রীমঙ্গল, মৌলভীবাজার, সিলেট"}
              </p>
            </div>
          </div>

          {/* English Name and Contact */}
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-800">
              {madrasaSettings?.name?.english || "Darul Ulum Muinus Sunnah Sreemangal"}
            </h2>
            <p className="text-sm text-gray-600">
              {madrasaSettings?.contact?.email || "darululummuinussunnah@gmail.com"} || {madrasaSettings?.contact?.phone || "+880 1611-109960"}
            </p>
          </div>
        </div>

        {/* ID Number and Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">
              ফরম নং : <span className="font-bold">{fees?._id || "N/A"}</span>
            </span>
            <button className="px-4 py-2 bg-green-700 text-white rounded font-semibold">
              ভর্তি রশিদ
            </button>
          </div>
          <div className="text-lg">
            <span className="font-semibold">তারিখ : </span>
            <span className="font-bold">{formatDate(fees?.createdAt)}</span>
          </div>
        </div>

        {/* Red Header */}
        <div className="mb-6">
          <h3 className="text-red-600 text-xl font-bold border-b-2 border-red-600 pb-1">
            নতুন ভর্তি
          </h3>
        </div>

        {/* Student Information Grid (Restored 3-column layout) */}
        <div className="grid grid-cols-3 gap-x-8 gap-y-4 mb-6">
          {/* Column 1 */}
          <div className="space-y-3">
            <div className="flex">
              <span className="font-semibold w-32">নাম</span>
              <span className="mr-2">:</span>
              <span>{student?.name}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">রোল</span>
              <span className="mr-2">:</span>
              <span>{student?.roll}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">শিফট</span>
              <span className="mr-2">:</span>
              <span>{translateToBangla(student?.shift)}</span>
            </div>
            <div className="flex text-blue-800 font-bold border-t border-gray-100 pt-2">
              <span className="w-32">সর্বমোট ফিস</span>
              <span className="mr-2">:</span>
              <span>{toBanglaNumber(totalFees)} ৳</span>
            </div>
            <div className="flex text-red-600 italic">
              <span className="w-32">ছাড় ({fees?.helpType || "সব"})</span>
              <span className="mr-2">:</span>
              <span>{toBanglaNumber(fees?.helpAmount || 0)} ৳</span>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <div className="flex">
              <span className="font-semibold w-32">আইডি</span>
              <span className="mr-2">:</span>
              <span>{student?.uid}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">শ্রেণী</span>
              <span className="mr-2">:</span>
              <span>{translateToBangla(student?.class)}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">বিভাগ</span>
              <span className="mr-2">:</span>
              <span>{translateToBangla(student?.division)}</span>
            </div>
            {/* Dynamic Fees for Column 2 (Sample) */}
            {feeEntries.slice(0, 2).map(([feeName]) => (
              <div key={feeName} className="flex">
                <span className="font-semibold w-32">{feeName}</span>
                <span className="mr-2">:</span>
                <span>{toBanglaNumber(fees?.feeItems?.[feeName] || fees?.[feeName] || 0)} ৳</span>
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <div className="flex">
              <span className="font-semibold w-32">আবাসিক অবস্থা</span>
              <span className="mr-2">:</span>
              <span className="text-green-600 font-semibold">{translateToBangla(student?.residential)}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">শাখা</span>
              <span className="mr-2">:</span>
              <span>{translateToBangla(student?.section)}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">সেশন</span>
              <span className="mr-2">:</span>
              <span>{translateToBangla(student?.session)}</span>
            </div>
            {/* Dynamic Fees for Column 3 (Sample) */}
            {feeEntries.slice(2, 4).map(([feeName]) => (
              <div key={feeName} className="flex">
                <span className="font-semibold w-32">{feeName}</span>
                <span className="mr-2">:</span>
                <span>{toBanglaNumber(fees?.feeItems?.[feeName] || fees?.[feeName] || 0)} ৳</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Fees Grid (Remaining Fees) */}
        {feeEntries.length > 4 && (
          <div className="grid grid-cols-3 gap-x-8 gap-y-4 mb-6 pt-4 border-t border-gray-100">
            {feeEntries.slice(4).map(([feeName]) => (
              <div key={feeName} className="flex">
                <span className="font-semibold w-32">{feeName}</span>
                <span className="mr-2">:</span>
                <span>{toBanglaNumber(fees?.feeItems?.[feeName] || fees?.[feeName] || 0)} ৳</span>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6 border-t border-gray-200 pt-4">
          <div className="space-y-3">
            <div className="flex text-xl font-extrabold text-[#2B7752]">
              <span className="w-32">মোট প্রদেয়</span>
              <span className="mr-2">:</span>
              <span>{toBanglaNumber(payableAmount)} ৳</span>
            </div>
            <div className="flex text-lg italic">
              <span className="font-bold text-gray-700 w-32">কথায়</span>
              <span className="mr-2">:</span>
              <span className="text-[#2B7752] font-semibold">{numberToWords(payableAmount)}</span>
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div className="flex justify-between items-end pt-12 mt-12 border-t-2 border-gray-300">
          <div className="text-center">
            <div className="border-t-2 border-gray-800 w-48 mx-auto mb-2"></div>
            <p className="font-semibold">মুহতামিমের স্বাক্ষর</p>
          </div>
          <div className="text-center">
            <div className="border-t-2 border-gray-800 w-48 mx-auto mb-2"></div>
            <p className="font-semibold">হিসাব রক্ষকের স্বাক্ষর</p>
          </div>
        </div>
      </div>
    </div>
  );
}
