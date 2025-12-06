import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllExpenses } from '@/lib/features/accounts/accountSlice';

export default function ExpenseRashid() {
    const dispatch = useDispatch();
    const { expenses, loading, error, totalExpenseDocuments, currentExpensePage } = useSelector((state) => state.accounts);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchAllExpenses(page));
    }, [dispatch, page]);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        return new Date(dateString).toLocaleDateString('bn-BD', options);
    };

    const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    const handleNextPage = () => {
        if (currentExpensePage * 10 < totalExpenseDocuments) {
            setPage(currentExpensePage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentExpensePage > 1) {
            setPage(currentExpensePage - 1);
        }
    };


    return (
        <>
            <div className='w-1/3 flex items-center justify-start mt-4 gap-4'>
                <p className='p-[8px] bg-[#FFEEEE] text-[#424D47] font-[500] text-[14px]'>সর্বমোট ব্যয় : {totalExpense} ৳ </p>
                <p className='p-[8px] bg-[#FFEEEE] text-[#424D47] font-[500] text-[14px]'>সর্বমোট রশিদ : {totalExpenseDocuments} </p>
            </div>
            <div className='mt-8'>
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">Error: {error.message || JSON.stringify(error)}</p>}
                {!loading && !error && (
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th className='bg-[#FFF5F5] text-[#63736C] font-[500] text-[16px] px-[16px] py-[8px]'>তারিখ ও দিন </th>
                                <th className='bg-[#FFF5F5] text-[#63736C] font-[500] text-[16px] px-[16px] py-[8px]'>রশিদ নম্বর</th>
                                <th className='bg-[#FFF5F5] text-[#63736C] font-[500] text-[16px] px-[16px] py-[8px]'>ব্যয়ের খাত</th>
                                <th className='bg-[#FFF5F5] text-[#63736C] font-[500] text-[16px] px-[16px] py-[8px]'>পরিমাণ</th>
                                <th className='bg-[#FFF5F5] text-[#63736C] font-[500] text-[16px] px-[16px] py-[8px]'>খাতের নাম</th>
                                <th className='bg-[#FFF5F5] text-[#63736C] font-[500] text-[16px] px-[16px] py-[8px]'>পদ্ধতি</th>
                                <th className='bg-[#FFF5F5] text-[#63736C] font-[500] text-[16px] px-[16px] py-[8px]'>রসিদ প্রদানকারী</th>
                                <th className='bg-[#FFF5F5] text-[#63736C] font-[500] text-[16px] px-[16px] py-[8px]'>অ্যাকশন </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                expenses.map((data) => (
                                    <tr key={data._id} className='text-center'>
                                        <td className='p-3.5 font-[600] text-[16px] text-[#424D47]'>{formatDate(data.createdAt)}</td>
                                        <td className='p-3.5 font-[600] text-[16px] text-[#424D47]'>{data.roshidNo}</td>
                                        <td className='p-3.5 font-[600] text-[16px] text-[#424D47]'>{data.donorName}</td>
                                        <td className='p-3.5 font-[600] text-[16px] text-[#424D47]'>- {data.amount}</td>
                                        <td className='p-3.5 font-[600] text-[16px] text-[#424D47]'>{data.sectorName}</td>
                                        <td className='p-3.5 font-[600] text-[16px] text-[#424D47]'>{data.method}</td>
                                        <td className='p-3.5 font-[600] text-[16px] text-[#424D47]'>{data.receiptIssuer}</td>
                                        <td className='flex items-center justify-center gap-4 p-3.5'>
                                            {/* Icons for actions */}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )}
                 <div className="flex justify-center items-center mt-4">
                    <button onClick={handlePrevPage} disabled={currentExpensePage <= 1} className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50">Previous</button>
                    <span className="px-4">Page {currentExpensePage} of {Math.ceil(totalExpenseDocuments / 10)}</span>
                    <button onClick={handleNextPage} disabled={currentExpensePage * 10 >= totalExpenseDocuments} className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50">Next</button>
                </div>
            </div>
        </>
    )
}