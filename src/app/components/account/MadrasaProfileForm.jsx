import { Upload } from "lucide-react";
import Image from "next/image";

export default function MadrasaProfileForm() {
    return (
        <div className="px-[24px] mt-12 w-[60%] mx-auto">
            <div className='border-[1px] border-gray-200 relative'>
                <h1 className='text-[#63736C] absolute top-1/2 left-0 -translate-y-1/2 bg-white pr-4 py-1 font-sembold text-[24px]'>লোগো  </h1>
            </div>
            <div className="flex items-center justify-start gap-4 mt-8">
                <div>
                    <Image src="/802422a1353a261fc2a0056a2430a594a0d6f235.png" className="w-[120px] h-[120px] rounded-full border border-[#424D47] object-cover" width={1000} height={1000} alt="public\5bcd817eb9c739cb0855646f3940ffa81a6dc895.jpg" />
                </div>
                <div>
                    <label htmlFor="image" className="bg-[#E7FEF2] px-[16px] py-[8px] text-[#2B7752] text-[18px] font-[500]">নতুন লোগো উপলোড </label>
                    <input type="file" name="image" id="image" className="hidden" />
                    <p className="text-[#63736C] text-[16px] mt-4">Image must be 1200x1200.png or .jpg</p>
                </div>
            </div>
            <div className="mt-12">
                <div className='border-[1px] border-gray-200 relative'>
                    <h1 className='text-[#63736C] absolute top-1/2 left-0 -translate-y-1/2 bg-white pr-4 py-1 font-sembold text-[24px]'>মাদ্রাসার নাম  </h1>
                </div>
                <div className="mt-8">
                    <label htmlFor="">বাংলা</label>
                    <input type="text" className="w-full border rounded-sm p-1 text-lg outline-none focus:border-green-700" name="" id="" defaultValue="দারুল উলুম মূঈনুস সুন্নাহ" />
                </div>
                <div className="mt-8">
                    <label htmlFor="">ইংরেজি</label>
                    <input type="text" className="w-full border rounded-sm p-1 text-lg outline-none focus:border-green-700" name="" id="" defaultValue="Darul Ulum Muinus Sunnah Sreemangal" />
                </div>
                <div className="mt-8">
                    <label htmlFor="">আরবি </label>
                    <input type="text" className="w-full border rounded-sm p-1 text-lg outline-none focus:border-green-700" name="" id="" defaultValue="دارالعلوم معين السنة سريمنغل" />
                </div>
                <div className='border-[1px] border-gray-200 relative my-8'>
                    <h1 className='text-[#63736C] absolute top-1/2 left-0 -translate-y-1/2 bg-white pr-4 py-1 font-sembold text-[24px]'>ঠিকানা </h1>
                </div>
                <div className="mt-8">
                    <label htmlFor="">বাংলা</label>
                    <input type="text" className="w-full border rounded-sm p-1 text-lg outline-none focus:border-green-700" name="" id="" defaultValue="ভানুগাছ রোড , রেল গেট, শ্রীমঙ্গল, মৌলভীবাজার, সিলেট " />
                </div>
                <div className="mt-8">
                    <label htmlFor="">ইংরেজি</label>
                    <input type="text" className="w-full border rounded-sm p-1 text-lg outline-none focus:border-green-700" name="" id="" defaultValue="Bhanugach Road, Rail Gate, Srimangal, Moulvibazar, Sylhet" />
                </div>
                <div className="mt-8">
                    <label htmlFor="">আরবি </label>
                    <input type="text" className="w-full border rounded-sm p-1 text-lg outline-none focus:border-green-700" name="" id="" defaultValue="دارالعلوم معين السنة سريمنغطريق بهانوغاتش، بوابة السكك الحديدية، سريمانغال، مولفيبازار، سيلهيت" />
                </div>
                <div className='border-[1px] border-gray-200 relative my-8'>
                    <h1 className='text-[#63736C] absolute top-1/2 left-0 -translate-y-1/2 bg-white pr-4 py-1 font-sembold text-[24px]'>যোগাযোগ  </h1>
                </div>
                <div className="mt-8">
                    <label htmlFor="">Email</label>
                    <input type="text" className="w-full border rounded-sm p-1 text-lg outline-none focus:border-green-700" name="" id="" defaultValue="darululummuinussunnah@gmail.com " />
                </div>
                <div className="mt-8">
                    <label htmlFor="">Mobile number</label>
                    <input type="text" className="w-full border rounded-sm p-1 text-lg outline-none focus:border-green-700" name="" id="" defaultValue=" +880 1611-109960" />
                </div>
            </div>
        </div>
    );
}