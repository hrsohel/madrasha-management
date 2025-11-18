"use client";

import { useState } from "react";
import { Filter, Search, ChevronDown, CirclePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



import ClientOnly from "@/app/components/ClientOnly";

// shadcn SELECT

import {

  Select,

  SelectTrigger,

  SelectContent,

  SelectItem,

  SelectValue,

} from "@/components/ui/select";



// ----------------------

// Filter Dropdown Options

// ----------------------

const filterOptions = {

  শ্রেণী: ["নাজেরা", "হিফজ", "সুন্নী", "কিতাব", "ইন্টারমিডিয়েট"],

  শাখা: ["বক্তাবলী", "গার্ডেন"],

  বিভাগ: ["সকাল", "বিকাল"],

  নিক্ষেপ: ["ছাত্র", "ছাত্রী"],

  জেন্ডার: ["পুরুষ", "মহিলা"],

  "আবাসিক অবস্থা": ["আবাসিক", "অর্ধ-আবাসিক", "অনাবাসিক", "ইন্টারমিডিয়েট"],

  "রক্তের গ্রুপ": ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],

};



// ----------------------

// Main Table Student Data

// ----------------------

const studentData = [

  {

    id: "১",

    roll: "১০১",

    name: "আবদুল করিম",

    residenceType: "আবাসিক",

    classSection: "দশম/ক",

    department: "বিজ্ঞান",

    departmentColor: "bg-blue-500",

    session: "সকাল",

    sessionYear: "২০২৪",

    grade: "A+",

  },

  {

    id: "২",

    roll: "১০২",

    name: "ফাতেমা খাতুন",

    residenceType: "অনাবাসিক",

    classSection: "দশম/খ",

    department: "মানবিক",

    departmentColor: "bg-green-500",

    session: "দিবা",

    sessionYear: "২০২৪",

    grade: "A",

  },

];



// ----------------------

// All Dropdown Action Items

// ----------------------

const dropdownItems = [

  { label: "একটি সিলেক্ট করুন", value: "select" },

  { label: "ক্লাস পরিবর্তন", value: "class" },

  { label: "শাখা পরিবর্তন", value: "section" },

  { label: "বিভাগ পরিবর্তন", value: "department" },

  { label: "শিক্ষা পরিবর্তন", value: "education" },

  { label: "আবাসিক অবস্থা পরিবর্তন", value: "residence" },

  { label: "রিসেল্ট ড্রপ পরিবর্তন", value: "result" },

  { label: "ডেজার পরিবর্তন", value: "designation" },

  { label: "সেশন পরিবর্তন", value: "session" },

  { label: "ইউজারঅ্যাক্টিভ করুন", value: "activate" },

  { label: "আর্কাইভ করুন", value: "archive" },

];



// ----------------------

// Stats Item Component

// ----------------------

const StatItem = ({ label, value }) => (

  <div className="flex items-center text-sm">

    <span className="font-medium mr-1">{label} :</span>

    <span>{value}</span>

  </div>

);



// ----------------------

// Dashboard Page Component

// ----------------------

export default function DashboardPage() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [activeModal, setActiveModal] = useState(null);

  const [selectedOption, setSelectedOption] = useState("");



  // Modal Close

  const closeModal = () => {

    setActiveModal(null);

    setSelectedOption("");

  };



  // Dropdown Select Handler

  const handleDropdownSelect = (value) => {

    if (value !== "select") {

      setActiveModal(value);

    }

    setIsDropdownOpen(false);

  };



  // Submit

  const handleSubmit = () => {

    console.log("Submitted:", activeModal, selectedOption);

    closeModal();

  };



  // Modal Configs

  const modalConfigs = {

    class: {

      title: "ক্লাস পরিবর্তন",

      selectLabel: "ক্লাস সিলেক্ট করুন",

      options: ["প্রথম", "দ্বিতীয়", "তৃতীয়", "চতুর্থ", "পঞ্চম"],

      helpText: "আপনার কি নিশ্চিত?",

      helpSubtext: "২০ জন সিলেক্টেড শিক্ষার্থীর ক্লাস পরিবর্তন হবে!",

    },

    section: {

      title: "শাখা পরিবর্তন",

      selectLabel: "শাখা সিলেক্ট করুন",

      options: ["ক", "খ", "গ"],

      helpText: "আপনার কি নিশ্চিত?",

      helpSubtext: "২০ জন সিলেক্টেড শিক্ষার্থীর শাখা পরিবর্তন হবে!",

    },

    department: {

      title: "বিভাগ পরিবর্তন",

      selectLabel: "বিভাগ সিলেক্ট করুন",

      options: ["বিজ্ঞান", "মানবিক", "ব্যবসায় শিক্ষা"],

      helpText: "আপনার কি নিশ্চিত?",

      helpSubtext: "২০ জন সিলেক্টেড শিক্ষার্থীর বিভাগ পরিবর্তন হবে!",

    },

    session: {

      title: "সেশন পরিবর্তন",

      selectLabel: "সেশন সিলেক্ট করুন",

      options: ["সকাল", "দিবা", "সন্ধ্যা"],

      helpText: "আপনার কি নিশ্চিত?",

      helpSubtext: "২০ জন সিলেক্টেড শিক্ষার্থীর সেশন পরিবর্তন হবে!",

    },

  };



  // Modal UI

  const renderModalContent = () => {

    const config = modalConfigs[activeModal];

    if (!config) return null;



    return (

      <div className="p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-xl font-semibold">{config.title}</h2>

          <button onClick={closeModal}>

            <X size={24} />

          </button>

        </div>



        <div className="mb-6">

          <label className="block text-sm font-medium mb-2">

            {config.selectLabel}

          </label>



          <select

            value={selectedOption}

            onChange={(e) => setSelectedOption(e.target.value)}

            className="w-full px-4 py-2 border rounded-md"

          >

            <option value="">একটি নির্বাচন করুন</option>

            {config.options.map((opt, idx) => (

              <option key={idx}>{opt}</option>

            ))}

          </select>

        </div>



        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">

          <p className="font-medium">{config.helpText}</p>

          <p className="text-sm text-gray-600">{config.helpSubtext}</p>

        </div>



        <div className="flex gap-3">

          <button

            onClick={handleSubmit}

            className="px-5 py-2 bg-[#BF6A02] text-white rounded-md"

          >

            আপডেট করুন

          </button>

          <button onClick={closeModal} className="px-5 py-2 border rounded-md">

            ক্যানসেল করুন

          </button>

        </div>

      </div>

    );

  };



  return (

    <div className="p-6 bg-gray-50 min-h-screen">

      {/* MODAL OVERLAY */}

      {activeModal && (

        <div className="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">

          <div className="bg-white rounded-lg max-w-md w-full p-4">

            {renderModalContent()}

          </div>

        </div>

      )}



      {/* HEADER */}

      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-3 flex-1">

          <p className="text-green-800 font-semibold text-xl whitespace-nowrap">

            সকল ছাত্র

          </p>

          <div className="h-[1px] bg-[#92A09A] w-full"></div>

        </div>



        <div className="h-6 w-1 bg-[#92A09A] mx-4"></div>



        <div className="flex items-center gap-3">

          <a href="#" className="text-blue-600 font-medium whitespace-nowrap">

            ২ ড্রাফট

          </a>



          <Button

            variant="outline"

            className="border-[#2B7752] py-5 text-[#246545] hover:text-[#246545] bg-[#E7FEF2] rounded-sm w-[150px] font-semibold hover:bg-[#E7FEF2]"

          >

            ডাটা এক্সপোর্ট

          </Button>



          <Button className="bg-[#2B7752] text-white rounded-sm w-[150px] font-semibold flex py-5 items-center justify-center gap-1">

            <CirclePlus size={22} />

            নতুন ছাত্র

          </Button>

        </div>

      </div>



      {/* FILTER SECTION */}

      <div className="my-6 bg-gray-50  py-8 rounded-md">

        <div className="flex justify-between items-center">

          <div className="flex items-center mb-4">

            <Filter size={18} className="mr-2 text-[#2b7752]" />

            <span className="text-sm font-medium">ফিল্টার</span>

          </div>



          <div className="relative w-80">

            <Input

              type="text"

              placeholder="নাম, রোল, আইডি দিয়ে সার্চ করুন..."

              className="pl-10 pr-7 py-5 border"

            />

            <Search

              size={18}

              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"

            />

          </div>

        </div>



        <div className="bg-white p-4 rounded-lg border flex flex-wrap gap-4 mt-4">

          {Object.keys(filterOptions).map((label, i) => (

            <ClientOnly key={i}>

              <Select>

                <SelectTrigger className="w-[180px]">

                  <SelectValue placeholder={label} />

                </SelectTrigger>

                <SelectContent>

                  {filterOptions[label].map((opt, idx) => (

                    <SelectItem key={idx} value={opt}>

                      {opt}

                    </SelectItem>

                  ))}

                </SelectContent>

              </Select>

            </ClientOnly>

          ))}

        </div>

      </div>



      {/* STAT GRID */}

      <div className=" rounded-md p-4 mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4">

        {[

          ["মোট ছাত্র", "৩০০০"],

          ["আবাসিক", "৮৫০০"],

          ["অনাবাসিক", "২০০"],

          ["অর্ধ-আবাসিক", "৬০০"],

          ["নাজেরা", "৭০০"],

          ["হিফজ", "২০০"],

          ["সুন্নী", "২০০"],

          ["কিতাব", "১০০০"],

          ["ইন্টারমিডিয়েট", "২"],

        ].map(([label, value], idx) => {

          const bgColors = [

            "bg-[#ebffee]",

            "bg-[#ebffee]",

            "bg-[#ebffee]",

            "bg-[#ebffee]",

            "bg-[#ebffee]",

            "bg-[#ebffee]",

            "bg-[#ebffee]",

            "bg-[#ebffee]",

            "bg-[#ebffee]",

          ];



          return (

            <div

              key={idx}

              className={`${bgColors[idx % bgColors.length]} rounded-md p-3`}

            >

              <StatItem label={label} value={value} />

            </div>

          );

        })}

      </div>



      {/* STUDENT TABLE */}

      <div className="bg-white rounded-md ">

        <div className="p-4 border-b border-gray-200 flex gap-4 items-center ">

          <div className="bg-[#DFF2FF] flex gap-6 px-[14px] py-2 items-center rounded-md">

            <div>

              <input type="checkbox" className="mr-2" />

              <span className="text-sm text-[#0086CB] font-semibold">

                ২০ জন সিলেক্টেড

              </span>

            </div>

            <div>

              <div className="relative ml-auto ">

                <button

                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}

                  className="flex justify-between items-center px-4 py-2 text-gray-600 border-2 rounded-md text-sm border-[#A2AFA8] bg-white w-40"

                >

                  সিলেক্ট একশান

                  <ChevronDown size={16} />

                </button>



                {isDropdownOpen && (

                  <div className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-10">

                    {dropdownItems.map((item, idx) => (

                      <button

                        key={idx}

                        onClick={() => handleDropdownSelect(item.value)}

                        className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm border-b last:border-0"

                      >

                        {item.label}

                      </button>

                    ))}

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>



        <div className="overflow-x-auto">

          <table className="w-full text-sm table-auto divide-y divide-gray-200 text-center">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-3">

                  <input type="checkbox" />

                </th>

                {[

                  "আইডি",

                  "রোল",

                  "নাম",

                  "শ্রেণী/শাখা",

                  "বিভাগ/শিক্ষা",

                  "জেন্ডার/সেশন",

                  "রক্তের গ্রুপ",

                  "এ্যাকশান",

                ].map((th, idx) => (

                  <th key={idx} className="px-4 py-3 font-medium">

                    {th}

                  </th>

                ))}

              </tr>

            </thead>



            <tbody>

              {studentData.map((student, index) => (

                <tr

                  key={index}

                  className={index % 2 ? "bg-gray-50" : "bg-white"}

                >

                  <td className="p-3">

                    <input type="checkbox" />

                  </td>



                  <td className="p-3">{student.id}</td>

                  <td className="p-3">{student.roll}</td>



                  <td className="p-3">

                    <div>

                      {student.name}

                      <div className="text-xs text-green-700">

                        {student.residenceType}

                      </div>

                    </div>

                  </td>



                  <td className="p-3">{student.classSection}</td>



                  <td className="p-3 flex justify-center">

                    <span

                      className={`w-2 h-2 rounded-full ${student.departmentColor} mr-2`}

                    ></span>

                    {student.department}

                  </td>



                  <td className="p-3">

                    <div>

                      {student.session}

                      <div className="text-xs">{student.sessionYear}</div>

                    </div>

                  </td>



                  <td className="p-3">{student.grade}</td>



                  <td className="p-3">

                    <a className="text-blue-500 cursor-pointer">আরও</a>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}


