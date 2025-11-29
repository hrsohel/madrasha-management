import { Calendar, Search, Filter } from "lucide-react";

export default function FilterBar() {
  return (
    <div className="bg-[#FAF5FF] rounded-sm p-6 shadow-sm border border-pink-100 mt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Filter className="w-7 h-7 text-pink-600" />
          <h2 className="text-xl font-bold text-gray-800">ফিল্টার</h2>
        </div>
        <div className="lg:col-span-2 relative">
          <input
            type="text"
            placeholder="নাম, রশিদ নম্বর দিয়ে সার্চ করুন..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Right: Filters + Search */}
      <div className="flex items-center justify-start gap-6">
        {/* Search Box */}


        {/* তারিখ ও টাইম */}
        <div className="relative w-full">
          <input type="date" name="" id="" className="w-full pl-10 pr-8 py-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700" />
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            ▼
          </div>
        </div>

        {/* দাতার ধরন */}
        <div className="w-full">
          <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700">
            <option>দাতার ধরন</option>
          </select>
        </div>

        {/* খাতের নাম */}
        <div className="w-full">
          <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700">
            <option>খাতের নাম</option>
          </select>
        </div>

        {/* আমানতধারী */}
        <div className="w-full">
          <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700">
            <option>আমানতধারী</option>
          </select>
        </div>

        {/* পরিমাণ */}
        <div className="w-full">
          <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700">
            <option>পরিমাণ</option>
          </select>
        </div>

        {/* ক্রম অনুযায়ী */}
        <div className="w-full">
          <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700">
            <option>ক্রম অনুযায়ী</option>
          </select>
        </div>
      </div>

      {/* Right: Orange Filter Button */}
      <button className="flex items-center gap-2 px-6 py-3 text-orange-500  font-bold transition">
        <span>-</span>
        ক্লিয়ার ফিল্টার
      </button>
    </div>
  );
}