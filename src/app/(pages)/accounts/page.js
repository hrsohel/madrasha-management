"use client"
import ChartData from '@/app/components/account/ChartData'
import DonorFilter from '@/app/components/account/DonorFilter'
import EditHistory from '@/app/components/account/EditHistory'
import ExpenseRashid from '@/app/components/account/ExpenseRashid'
import FilterBar from '@/app/components/account/FilterBar'
import GeneralAccountTable from '@/app/components/account/GeneralAccountTable'
import IncomeRashid from '@/app/components/account/IncomeRashid'
import MadrasaProfileForm from '@/app/components/account/MadrasaProfileForm'
import NewDonorForm from '@/app/components/account/NewDonorForm'
import NewExpenseform from '@/app/components/account/NewExpenseform'
import NewIncomeForm from '@/app/components/account/NewIncomeForm'
import YearlyFinancialReport from '@/app/components/account/YearlyFinancialReport'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function Page() {
  const [showHistory, setShowHistory] = useState(false)
  const topMenu = ["সাধারণ হিসাব", "আয়ের রশিদ", "ব্যয়ের রশিদ", "বাৎসরিক হিসাব", "দাতা ব্যবস্থাপনা"]
  const [switchSections, setSwitchSections] = useState(1)
  const [showAddForm, setShowAddForm] = useState(false)
  
  const { incomes, expenses, donors, financialSummary } = useSelector(state => state.accounts);

  const downloadCSV = (data, filename) => {
    if (!data || data.length === 0) {
      alert("No data to export!");
      return;
    }
  
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          let cell = row[header] === null || row[header] === undefined ? '' : row[header];
          cell = String(cell);
          if (cell.includes(',')) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(',')
      )
    ].join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    switch (switchSections) {
      case 1:
        // GeneralAccountTable data (assuming it uses incomes and expenses)
        const generalData = [...incomes, ...expenses].map(item => ({
          ID: item._id,
          Date: new Date(item.date).toLocaleDateString(),
          Type: item.incomeType ? 'Income' : 'Expense',
          Amount: item.amount,
          Category: item.incomeType || item.expenseType,
          Description: item.description
        }));
        downloadCSV(generalData, 'general_account_report');
        break;
      case 2:
        // IncomeRashid data
        downloadCSV(incomes, 'income_report');
        break;
      case 3:
        // ExpenseRashid data
        downloadCSV(expenses, 'expense_report');
        break;
      case 4:
        // YearlyFinancialReport data
        if (financialSummary) {
          const summaryData = [
            { "Report": "Previous Year Summary", "Total Income": financialSummary.previousYearSummary?.totalIncome, "Total Expense": financialSummary.previousYearSummary?.totalExpense },
            { "Report": "Current Year Summary", "Total Income": financialSummary.currentYearSummary?.totalIncome, "Total Expense": financialSummary.currentYearSummary?.totalExpense },
            { "Report": "Current Year Average", "Average Income": financialSummary.currentYearAverage?.avgIncome, "Average Expense": financialSummary.currentYearAverage?.avgExpense },
            ...financialSummary.monthlySummary.map(m => ({
              Report: `Monthly Summary - ${m.month}`,
              "Total Income": m.totalIncome,
              "Total Expense": m.totalExpense,
            }))
          ];
          downloadCSV(summaryData, 'yearly_financial_report');
        } else {
          alert("Financial summary data is not available.");
        }
        break;
      case 5:
        // DonorFilter data
        downloadCSV(donors, 'donors_report');
        break;
      default:
        alert("No section selected for export.");
    }
  };

  return (
    <div className=''>
      <div className='flex items-center justify-between'>
        <div className='bg-[#F7F7F7] flex items-center justify-start gap-4'>
          {
            topMenu.map((menu, index) => (
              <div onClick={() => setSwitchSections(index + 1)} key={index} className={`px-[16px] py-[8px] cursor-pointer ${menu === topMenu[switchSections - 1] ? "bg-[#246545]" : ""}`}>
                <span className={`text-[16px] font-semibold ${menu === topMenu[switchSections - 1] ? "text-white" : "text-[#424D47]"}`}>{menu}</span>
              </div>
            ))
          }
        </div>
        <div className='flex items-center justify-center gap-4'>
          <svg onClick={() => setShowHistory(true)} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='cursor-pointer'>
            <path d="M8 0.5H32C36.1421 0.5 39.5 3.85786 39.5 8V32C39.5 36.1421 36.1421 39.5 32 39.5H8C3.85786 39.5 0.5 36.1421 0.5 32V8C0.5 3.85786 3.85786 0.5 8 0.5Z" fill="#E7FEF2" />
            <path d="M8 0.5H32C36.1421 0.5 39.5 3.85786 39.5 8V32C39.5 36.1421 36.1421 39.5 32 39.5H8C3.85786 39.5 0.5 36.1421 0.5 32V8C0.5 3.85786 3.85786 0.5 8 0.5Z" stroke="#2B7752" />
            <path d="M13.048 16.6066L10.5378 16.4538C12.3371 11.7048 17.503 8.99992 22.5396 10.3447C27.904 11.7771 31.0904 17.2611 29.6565 22.5935C28.2227 27.926 22.7116 31.0876 17.3472 29.6553C13.3642 28.5917 10.5819 25.2946 10 21.4844M20 16V20L22 22" stroke="#246545" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div onClick={handleExport} className='flex items-center justify-center gap-2 px-[16px] py-[8px] bg-[#E7FEF2] text-[#246545] rounded-md cursor-pointer'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 21H19M16.9503 12.1817C17.198 12.814 16.5075 13.5726 15.1266 15.0899C13.6701 16.6902 12.92 17.4904 11.9999 17.5C11.0798 17.4904 10.3297 16.6902 8.87325 15.0899C7.49233 13.5726 6.80187 12.814 7.04958 12.1817C7.05862 12.1586 7.06845 12.1359 7.07904 12.1135C7.34922 11.542 8.24471 11.5029 9.99994 11.5002V4.99998C9.99994 4.53501 9.99994 4.30253 10.051 4.11179C10.1897 3.59414 10.594 3.1898 11.1117 3.05111C11.3024 3 11.5349 3 11.9999 3C12.4648 3 12.6973 3 12.8881 3.05111C13.4057 3.1898 13.8101 3.59414 13.9488 4.11179C13.9999 4.30253 13.9999 4.53501 13.9999 4.99998V11.5002C15.7551 11.5029 16.6506 11.542 16.9208 12.1135C16.9314 12.1359 16.9412 12.1586 16.9503 12.1817Z" stroke="#246545" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>ডাটা এক্সপোর্ট</span>
          </div>
          {
            topMenu[switchSections - 1] === "সাধারণ হিসাব" ? <div onClick={() => setShowAddForm(true)} className='flex items-center justify-center gap-2 px-[16px] py-[8px] bg-[#246545] text-white rounded-md'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V16M16 12H8M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>নতুন হিসাব</span>
            </div> :
              topMenu[switchSections - 1] === "আয়ের রশিদ" ? <div onClick={() => setShowAddForm(true)} className='flex items-center justify-center gap-2 px-[16px] py-[8px] bg-[#246545] text-white rounded-md'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V16M16 12H8M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>নতুন আয়</span>
              </div> :
                topMenu[switchSections - 1] === "ব্যয়ের রশিদ" ? <div onClick={() => setShowAddForm(true)} className='flex items-center justify-center gap-2 px-[16px] py-[8px] bg-[#246545] text-white rounded-md'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V16M16 12H8M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>নতুন ব্যয়</span>
                </div> :
                  topMenu[switchSections - 1] === "দাতা ব্যবস্থাপনা" ? <div onClick={() => setShowAddForm(true)} className='flex items-center justify-center gap-2 px-[16px] py-[8px] bg-[#246545] text-white rounded-md'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8V16M16 12H8M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>নতুন দাতা</span>
                  </div> : <></>

          }
        </div>
      </div>
      {
        switchSections === 1 ?
          <>
            <ChartData />
            <GeneralAccountTable />
          </> :
          switchSections === 2 ? <>
            <FilterBar />
            <IncomeRashid />
          </> :
            switchSections === 3 ? <>
              <FilterBar />
              <ExpenseRashid />
            </> :
              switchSections === 4 ? <>
                <YearlyFinancialReport />
              </> :
                switchSections === 5 ? <>
                  <DonorFilter />
                </> : <></>
      }
      {
        showHistory ? <div className='fixed left-0 top-0 w-full'>
          <EditHistory setShowHistory={setShowHistory} />
        </div> : <></>
      }
      {
        showAddForm && topMenu[switchSections - 1] === "সাধারণ হিসাব" ? <div className='fixed left-0 top-0 w-full min-h-screen' style={{ background: "rgba(0, 0, 0, 0.6)" }}>
          <NewIncomeForm setShowAddForm={setShowAddForm} />
        </div> :
          showAddForm && topMenu[switchSections - 1] === "আয়ের রশিদ" ? <div className='fixed left-0 top-0 w-full min-h-screen' style={{ background: "rgba(0, 0, 0, 0.6)" }}>
            <NewIncomeForm setShowAddForm={setShowAddForm} />
          </div> :
            showAddForm && topMenu[switchSections - 1] === "ব্যয়ের রশিদ" ? <div className='fixed left-0 top-0 w-full min-h-screen' style={{ background: "rgba(0, 0, 0, 0.6)" }}>
              <NewExpenseform setShowAddForm={setShowAddForm} />
            </div> :
              showAddForm && topMenu[switchSections - 1] === "দাতা ব্যবস্থাপনা" ? <div className='fixed left-0 top-0 w-full min-h-screen' style={{ background: "rgba(0, 0, 0, 0.6)" }}>
                <NewDonorForm setShowAddForm={setShowAddForm} />
              </div> : <></>
      }
    </div>
  )
}
