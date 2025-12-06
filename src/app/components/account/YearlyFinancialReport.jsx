import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFinancialSummary } from "../../../lib/features/accounts/accountSlice";

// Utility function to format numbers to Bengali currency
const formatToBengaliCurrency = (num) => {
  if (typeof num !== "number") return num;
  return new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

export default function YearlyFinancialReport() {
  const dispatch = useDispatch();
  const {
    monthlySummary,
    previousYearSummary,
    currentYearSummary,
    currentYearAverage,
    loading,
    error,
  } = useSelector((state) => state.accounts);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(fetchFinancialSummary(selectedYear));
  }, [dispatch, selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i); // Last 5 years

  const monthNames = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল",
    "মে", "জুন", "জুলাই", "আগস্ট",
    "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];

  if (loading) {
    return <div className="max-w-6xl mx-auto p-6 min-h-screen font-sans mt-8 text-center">Loading financial data...</div>;
  }

  if (error) {
    return <div className="max-w-6xl mx-auto p-6 min-h-screen font-sans mt-8 text-center text-red-500">Error: {error.message || String(error)}</div>;
  }

  // Calculate current balance (assuming it's current year savings)
  const currentBalance = currentYearSummary?.totalSavings || 0;

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen font-sans mt-8">
      {/* Year Selector */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-3 bg-white rounded-l px-5 py-3">
          <select
            className="text-xl font-bold text-[#246545]"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
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
              <td className="px-6 py-4 text-center text-green-600 font-bold">
                {previousYearSummary ? formatToBengaliCurrency(previousYearSummary.totalIncome) : "N/A"}
              </td>
              <td className="px-6 py-4 text-center text-red-600 font-bold">
                {previousYearSummary ? formatToBengaliCurrency(previousYearSummary.totalExpense) : "N/A"}
              </td>
              <td className="px-6 py-4 text-center text-blue-600 font-bold">
                {previousYearSummary ? formatToBengaliCurrency(previousYearSummary.totalSavings) : "N/A"}
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">চলতি বছরের</td>
              <td className="px-6 py-4 text-center text-green-600 font-bold">
                {currentYearSummary ? formatToBengaliCurrency(currentYearSummary.totalIncome) : "N/A"}
              </td>
              <td className="px-6 py-4 text-center text-red-600 font-bold">
                {currentYearSummary ? formatToBengaliCurrency(currentYearSummary.totalExpense) : "N/A"}
              </td>
              <td className="px-6 py-4 text-center text-blue-600 font-bold">
                {currentYearSummary ? formatToBengaliCurrency(currentYearSummary.totalSavings) : "N/A"}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 font-semibold">চলতি বছরের মাসিক গড় </td>
              <td className="px-6 py-4 text-center font-bold text-gray-800">
                {currentYearAverage ? formatToBengaliCurrency(currentYearAverage.averageIncome) : "N/A"}
              </td>
              <td className="px-6 py-4 text-center font-bold text-gray-800">
                {currentYearAverage ? formatToBengaliCurrency(currentYearAverage.averageExpense) : "N/A"}
              </td>
              <td className="px-6 py-4 text-center font-bold text-gray-800">
                {currentYearAverage ? formatToBengaliCurrency(currentYearAverage.averageSavings) : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Current Balance */}
      <div className="text-right mb-4">
        <div className=" bg-white rounded-lg px-8 py-5 flex items-center justify-end gap-12">
          <span className="text-sm text-[#2B7752]">বর্তমান ব্যালেন্স</span>
          <span className="text-sm font-bold text-[#2B7752]">
            {formatToBengaliCurrency(currentBalance)}
          </span>
        </div>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-left general-account-table">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-[#63736C]">মাসের নাম</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-[#63736C]"> মাসিক আয় </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-[#63736C]"> মাসিক ব্যয় </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-[#63736C]"> মাসিক জমা </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {monthNames.map((monthName, index) => {
              const monthData = monthlySummary?.find(
                (m) => m.month === index + 1 && m.year === selectedYear
              );
              return (
                <tr key={monthName} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{monthName}</td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">
                    {monthData ? formatToBengaliCurrency(monthData.totalIncome) : formatToBengaliCurrency(0)}
                  </td>
                  <td className="px-6 py-4 text-center text-red-600 font-bold">
                    {monthData ? formatToBengaliCurrency(monthData.totalExpense) : formatToBengaliCurrency(0)}
                  </td>
                  <td className="px-6 py-4 text-center text-blue-600 font-bold">
                    {monthData ? formatToBengaliCurrency(monthData.savings) : formatToBengaliCurrency(0)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}