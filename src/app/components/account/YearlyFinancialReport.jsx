import { ChevronDown } from "lucide-react";

export default function YearlyFinancialReport() {
  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen font-sans mt-8">
      {/* Year Selector */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-3 bg-white rounded-l px-5 py-3">
          <select className="text-xl font-bold text-[#246545]">
            <option value="২০২০">২০২০</option>
          </select>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white border border-gray-200 overflow-hidden mb-8">
        <table className="w-full text-left general-account-table">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">বিবরণ</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-green-600">আয়</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-red-600">ব্যয়</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">জমা</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">গত বছরের</td>
              <td className="px-6 py-4 text-center text-green-600 font-bold">+ ৫০০৮</td>
              <td className="px-6 py-4 text-center text-red-600 font-bold">- ৫০০৮</td>
              <td className="px-6 py-4 text-center text-blue-600 font-bold">৫০০৮</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">চলতি বছরের</td>
              <td className="px-6 py-4 text-center text-green-600 font-bold">+ ৫০০৮</td>
              <td className="px-6 py-4 text-center text-red-600 font-bold">- ৫০০৮</td>
              <td className="px-6 py-4 text-center text-blue-600 font-bold">৫০০৮</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 font-semibold">চলতি বছরের মাসিক গড় </td>
              <td className="px-6 py-4 text-center font-bold text-gray-800">৫০,০৫৮ টা</td>
              <td className="px-6 py-4 text-center font-bold text-gray-800">৫০,০৫৮ টা</td>
              <td className="px-6 py-4 text-center font-bold text-gray-800">৫০,০৫৮ টা</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Current Balance */}
      <div className="text-right mb-4">
        <div className=" bg-white rounded-lg px-8 py-5 flex items-center justify-end gap-12">
          <span className="text-sm text-[#2B7752]">বর্তমান ব্যালেন্স</span>
          <span className="text-sm font-bold text-[#2B7752]">৩০০৮</span>
        </div>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-left general-account-table">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-[#63736C]">মাসের নাম</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-[#63736C]">
                 মাসিক আয় = ১৭৫০ ৳ 
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-[#63736C]">
                 মাসিক ব্যয় = ১৭৫০ ৳ 
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-[#63736C]">
                মাসিক জমা  = ১৭৫০ ৳ 
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[
              "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল",
              "মে", "জুন", "জুলাই", "আগস্ট",
              "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
            ].map((month) => (
              <tr key={month} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{month}</td>
                <td className="px-6 py-4 text-center text-green-600 font-bold">+ ৫০০৮</td>
                <td className="px-6 py-4 text-center text-red-600 font-bold">- ৫০০৮</td>
                <td className="px-6 py-4 text-center text-blue-600 font-bold">৫০০৮</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}