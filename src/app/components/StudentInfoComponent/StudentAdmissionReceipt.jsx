export default function StudentAdmissionReceipt() {
  return (
    <div className=" flex items-center justify-center mt-10">
      <div className="   rounded-lg p-8  w-full shadow-sm">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-300">
          {/* Logo and Bangla Name */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center border-4 border-blue-700">
              <div className="text-white text-center">
                <div className="text-xs font-bold">DUMS</div>
                <div className="text-2xl">🕌</div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                দারুল উলুম মুঈনুস সুন্নাহ, শ্রীমঙ্গল
              </h2>
              <p className="text-sm text-gray-600">
                জগন্নাথ রোড , ব্রেল চৌ, শ্রীমঙ্গল, মৌলভীবাজার, সিলেট
              </p>
            </div>
          </div>

          {/* English Name and Contact */}
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-800">
              Darul Ulum Muinus Sunnah Sreemangal
            </h2>
            <p className="text-sm text-gray-600">
              darululummuinussunnah@gmail.com || +880 1611-109960
            </p>
          </div>
        </div>

        {/* ID Number and Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">
              ফরম নং : <span className="font-bold">75</span>
            </span>
            <button className="px-4 py-2 bg-green-700 text-white rounded font-semibold">
              ভর্তি রশিদ
            </button>
          </div>
          <div className="text-lg">
            <span className="font-semibold">তারিখ : </span>
            <span className="font-bold">৫২ নভেম্বর ২০২৫</span>
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
              <span>মোহ আবিছুর রহমান খান</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">রোল</span>
              <span className="mr-2">:</span>
              <span>২</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">শিক্ষট</span>
              <span className="mr-2">:</span>
              <span>সকল</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">কিয়ার</span>
              <span className="mr-2">:</span>
              <span>৫০০৮</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">প্রদেয় পরিমান</span>
              <span className="mr-2">:</span>
              <span>৫০০৮</span>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <div className="flex">
              <span className="font-semibold w-32">আইডি</span>
              <span className="mr-2">:</span>
              <span>DUMS01</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">শ্রেণী</span>
              <span className="mr-2">:</span>
              <span>নাসারি</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">বিভাগ</span>
              <span className="mr-2">:</span>
              <span>নূরানী</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">সাপ্তা</span>
              <span className="mr-2">:</span>
              <span>২০০</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">কথায়</span>
              <span className="mr-2">:</span>
              <span>পাঁচশত টাকা মাত্র</span>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <div className="flex">
              <span className="font-semibold w-32">আবাসিক অবস্থা</span>
              <span className="mr-2">:</span>
              <span className="text-green-600 font-semibold">আবাসিক</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">সাথা</span>
              <span className="mr-2">:</span>
              <span>ক</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">সেশন</span>
              <span className="mr-2">:</span>
              <span>২৪ - ২৫</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">সাপ্তায়ের খাত</span>
              <span className="mr-2">:</span>
              <span>মাফতি</span>
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
