import React from 'react'

export default function GeneralAccountTable() {
    const tableData = [
        {
            "খাতের নাম": "যাকাত",
            "অর্থপ্রাপ্তি": "৫০৮",
            "প্রদানকার": {
                "amount": "-৫০৮",
                "note": "ফিতরা তাহফ"
            },
            "চলতি মাস আয়": "+ ৫০৮",
            "চলতি মাস ব্যয়": "- ৫০৮"
        },
        {
            "খাতের নাম": "ফিতরা",
            "অর্থপ্রাপ্তি": "২০৮",
            "প্রদানকার": {
                "amount": "+ ৫০৮",
                "note": "যাকাত থেকে"
            },
            "চলতি মাস আয়": "+ ২০৮",
            "চলতি মাস ব্যয়": "- ২০৮"
        },
        {
            "খাতের নাম": "সদকা",
            "অর্থপ্রাপ্তি": "৩০৮",
            "প্রদানকার": "-",
            "চলতি মাস আয়": "+ ৩০৮",
            "চলতি মাস ব্যয়": "- ৩০৮"
        },
        {
            "খাতের নাম": "দোকান ভাড়া",
            "অর্থপ্রাপ্তি": "৩০৮",
            "প্রদানকার": "-",
            "চলতি মাস আয়": "+ ৩০৮",
            "চলতি মাস ব্যয়": "- ৩০৮"
        },
        {
            "খাতের নাম": "লিল্লাহ বোর্ডিং",
            "অর্থপ্রাপ্তি": "৩০৮",
            "প্রদানকার": "-",
            "চলতি মাস আয়": "+ ৩০৮",
            "চলতি মাস ব্যয়": "- ৩০৮"
        }
    ]
    return (
        <>
            <div className='flex items-center justify-between mt-4'>
                <div className='flex items-center justify-center gap-2'>
                    <span className='text-[24px] text-[#246545]'>অক্টোবর </span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 8L12.496 13.688L17.992 8V11.048L12.496 16.712L7 11.048L7 8Z" fill="#424D47" />
                    </svg>

                </div>
                <div className='flex items-center justify-center gap-4'>
                    <div className='bg-[#E7FEF2] px-[16px] py-[8px] rounded-md flex items-center justify-center gap-4'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 9H6.65856C5.65277 9 5.14987 9 5.02472 8.69134C4.89957 8.38268 5.25517 8.01942 5.96637 7.29289L8.21091 5M5 15H17.3414C18.3472 15 18.8501 15 18.9753 15.3087C19.1004 15.6173 18.7448 15.9806 18.0336 16.7071L15.7891 19" stroke="#246545" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className='text-[16px] text-[#246545]'>ট্রান্সফার </span>
                    </div>
                    <div className='bg-[#E7FEF2] px-[16px] py-[8px] rounded-md flex items-center justify-center gap-4'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8V16M16 12H8M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#246545" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className='text-[16px] text-[#246545]'>নতুন খাত </span>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <table className='w-full general-account-table'>
                    <thead>
                        <tr className='bg-[#F7F7F7]'>
                            <th className='text-[16px] font-[500] text-[#63736C] py-[8px]'>খাতের নাম</th>
                            <th className='text-[16px] font-[500] text-[#63736C] py-[8px]'>অবশিষ্ট = ১৭৫০ ৳ </th>
                            <th className='text-[16px] font-[500] text-[#63736C] py-[8px]'>ট্রান্সফার </th>
                            <th className='text-[16px] font-[500] text-[#63736C] py-[8px]'>চলতি মাস আয় = ১৭৫০ ৳ </th>
                            <th className='text-[16px] font-[500] text-[#63736C] py-[8px]'>চলতি মাস ব্যয় = ১৭৫০ ৳ </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData.map((data, index) => (
                                <tr key={index} className='text-center'>
                                    <td className='py-[24px]'>{data['খাতের নাম']}</td>
                                    <td className='py-[24px]'>{data["অর্থপ্রাপ্তি"]}</td>
                                    <td className='py-[24px]'>{data["প্রদানকার"].amount} {data["প্রদানকার"].note}</td>
                                    <td className='py-[24px]'>{data["চলতি মাস আয়"]}</td>
                                    <td className='py-[24px]'>{data["চলতি মাস ব্যয়"]}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
