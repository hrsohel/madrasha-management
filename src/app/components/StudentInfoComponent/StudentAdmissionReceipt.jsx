import { translateToBangla } from "@/lib/utils";

export default function StudentAdmissionReceipt({ fees, student, madrasaSettings }) {
  const totalFees = (fees?.admissionFee || 0) +
    (fees?.libraryFee || 0) +
    (fees?.confirmFee || 0) +
    (fees?.ITFee || 0) +
    (fees?.IDCardFee || 0) +
    (fees?.kafelaFee || 0) +
    (fees?.booksFee || 0);
  const payableAmount = totalFees - (fees?.helpAmount || 0);

  // Placeholder for converting number to words (requires a proper library or implementation)
  const numberToWords = (num) => {
    // This is a simplified placeholder. A real implementation would be complex.
    if (typeof num !== 'number') return '';
    return `টাকা ${num} মাত্র`;
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
                {madrasaSettings?.location?.bangla || "জগন্নাথ রোড , ব্রেল চৌ, শ্রীমঙ্গল, মৌলভীবাজার, সিলেট"}
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

        {/* Student Information Grid */}
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
            <div className="flex">
              <span className="font-semibold w-32">প্রদেয় ফিস</span>
              <span className="mr-2">:</span>
              <span>{totalFees}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">ছাড়</span>
              <span className="mr-2">:</span>
              <span>{fees?.helpAmount || 0} ({fees?.helpType})</span>
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
            <div className="flex">
              <span className="font-semibold w-32">ভর্তি ফিস</span>
              <span className="mr-2">:</span>
              <span>{fees?.admissionFee || 0}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">লাইব্রেরী ফিস</span>
              <span className="mr-2">:</span>
              <span>{fees?.libraryFee || 0}</span>
            </div>
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
            <div className="flex">
              <span className="font-semibold w-32">বইপত্র ফিস</span>
              <span className="mr-2">:</span>
              <span>{fees?.booksFee || 0}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">ID কার্ড ফিস</span>
              <span className="mr-2">:</span>
              <span>{fees?.IDCardFee || 0}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
          <div className="space-y-3">
            <div className="flex">
              <span className="font-semibold w-32">মোট প্রদেয়</span>
              <span className="mr-2">:</span>
              <span>{payableAmount}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">কথায়</span>
              <span className="mr-2">:</span>
              <span>{numberToWords(payableAmount)}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex">
              <span className="font-semibold w-32">কাফেলা ফিস</span>
              <span className="mr-2">:</span>
              <span>{fees?.kafelaFee || 0}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">অন্যান্য ফিস</span>
              <span className="mr-2">:</span>
              <span>{fees?.confirmFee || 0 + (fees?.ITFee || 0)}</span> {/* Assuming confirmFee and ITFee might be "other" */}
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div className="flex justify-between items-end pt-6 mt-6 border-t-2 border-gray-300">
          <div className="text-center">
            <div className="border-t-2 border-gray-800 w-48 mx-auto mb-2"></div>
            <p className="font-semibold">মুত্তালিমের স্বাক্ষর</p>
          </div>
          <div className="text-center">
            <div className="border-t-2 border-gray-800 w-48 mx-auto mb-2"></div>
            <p className="font-semibold">কিয়ার রক্ষকের স্বাক্ষর</p>
          </div>
        </div>
      </div>
    </div>
  );
}
