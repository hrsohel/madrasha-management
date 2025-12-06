"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Filter,
  Search,
  ChevronDown,
  CirclePlus,
  X,
  MousePointerClick,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Papa from "papaparse";
import { saveAs } from "file-saver";

import ClientOnly from "@/app/components/ClientOnly";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllStudents, updateStudent } from "@/lib/features/students/studentSlice";

// shadcn SELECT
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

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
// FIXED — Nice Status Badge Component
// ----------------------
const ResidenceStatusBadge = ({ status }) => {
  const statusColors = {
    Hostel: "text-[#008043]", // Assuming Hostel maps to আবাসিক
    DayScholar: "text-[#BF6A02]", // Assuming DayScholar maps to অর্ধ-আবাসিক
    NonResidential: "text-[#AC59F3]", // Assuming NonResidential maps to অনাবাসিক
    ইনঅ্যাকটিভ: "text-[#EC221F] bg-red-100",
  };

  const statusMap = {
    Hostel: "আবাসিক",
    DayScholar: "অর্ধ-আবাসিক",
    NonResidential: "অনাবাসিক",
    // Add other mappings if necessary
  };

  const displayStatus = statusMap[status] || status;

  const colorClass = statusColors[status] || "bg-gray-100 text-gray-700";

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClass} gap-1`}
    >
      {status === "ইনঅ্যাকটিভ" && (
        <span className="w-2 h-2 rounded-full bg-red-500 inline-block "></span>
      )}
      {displayStatus}
    </span>
  );
};

// ----------------------
// All Dropdown Action Items
// ----------------------
const dropdownItems = [
  { label: "একটি সিলেক্ট করুন", value: "select" },
  { label: "ক্লাস পরিবর্তন", value: "class" },
  { label: "শাখা পরিবর্তন", value: "section" },
  { label: "বিভাগ পরিবর্তন", value: "division" },
  { label: "শিফট পরিবর্তন", value: "shift" },
  { label: "আবাসিক অবস্থা পরিবর্তন", value: "residential" },
  { label: "রক্তের গ্রুপ পরিবর্তন", value: "bloodGroup" },
  { label: "জেন্ডার পরিবর্তন", value: "gender" },
  { label: "সেশন পরিবর্তন", value: "session" },
  { label: "ইউজারঅ্যাক্টিভ করুন", value: "activate" },
  { label: "আর্কাইভ করুন", value: "archive" },
];

// ----------------------
const StatItem = ({ label, value }) => (
  <div className="flex items-center text-sm">
    <span className="font-medium mr-1">{label} :</span>
    <span>{value}</span>
  </div>
);

// ----------------------
export default function DashboardPage() {
  const history = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const dispatch = useDispatch();
  const { students, loading, error, isUpdating } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchAllStudents());
  }, [dispatch]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents(students.map((s) => s._id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((studentId) => studentId !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedOption("");
  };

  const handleDropdownSelect = (value) => {
    if (value !== "select") {
      setActiveModal(value);
    }
    setIsDropdownOpen(false);
  };

  const handleExportData = () => {
    const dataToExport = students.map((student) => ({
      ID: student._id,
      Roll: student.roll,
      Name: student.name,
      Class: student.class,
      Section: student.section,
      Residential: student.residential,
      Shift: student.shift,
      Gender: student.gender,
      Division: student.division,
      "Blood Group": student.bloodGroup,
    }));

    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "students.csv");
  };
  
  const handleSubmit = async () => {
    if (selectedStudents.length === 0) {
      alert("Please select students to update.");
      return;
    }
    if (!selectedOption && !['activate', 'archive'].includes(activeModal)) {
      alert("Please select a value to update.");
      return;
    }
  
    const payload = { [activeModal]: selectedOption };
  
    try {
      await Promise.all(
        selectedStudents.map(id => dispatch(updateStudent({ id, data: payload })).unwrap())
      );
      alert("Students updated successfully!");
      setSelectedStudents([]);
      closeModal();
    } catch (err) {
      alert(`Failed to update students: ${err.message || JSON.stringify(err)}`);
    }
  };

  const modalConfigs = {
    class: {
      title: "ক্লাস পরিবর্তন",
      selectLabel: "ক্লাস সিলেক্ট করুন",
      options: ["Class Seven", "Class Eight", "Class Nine", "Class Ten"],
      helpText: "Are you sure?",
      helpSubtext: `${selectedStudents.length} selected students will have their class changed!`,
    },
    section: {
      title: "শাখা পরিবর্তন",
      selectLabel: "শাখা সিলেক্ট করুন",
      options: ["A", "B", "C"],
      helpText: "Are you sure?",
      helpSubtext: `${selectedStudents.length} selected students will have their section changed!`,
    },
    division: {
      title: "বিভাগ পরিবর্তন",
      selectLabel: "বিভাগ সিলেক্ট করুন",
      options: ["Dhaka", "Chittagong", "Sylhet"],
      helpText: "Are you sure?",
      helpSubtext: `${selectedStudents.length} selected students will have their division changed!`,
    },
    shift: {
      title: "শিফট পরিবর্তন",
      selectLabel: "শিফট সিলেক্ট করুন",
      options: ["Morning", "Day", "Evening"],
      helpText: "Are you sure?",
      helpSubtext: `${selectedStudents.length} selected students will have their shift changed!`,
    },
    residential: {
      title: "আবাসিক অবস্থা পরিবর্তন",
      selectLabel: "আবাসিক অবস্থা সিলেক্ট করুন",
      options: ["Hostel", "DayScholar", "NonResidential"],
      helpText: "Are you sure?",
      helpSubtext: `${selectedStudents.length} selected students will have their residence status changed!`,
    },
    bloodGroup: {
      title: "রক্তের গ্রুপ পরিবর্তন",
      selectLabel: "রক্তের গ্রুপ সিলেক্ট করুন",
      options: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
      helpText: "Are you sure?",
      helpSubtext: `${selectedStudents.length} selected students will have their blood group changed!`,
    },
    gender: {
      title: "জেন্ডার পরিবর্তন",
      selectLabel: "জেন্ডার সিলেক্ট করুন",
      options: ["Male", "Female"],
      helpText: "Are you sure?",
      helpSubtext: `${selectedStudents.length} selected students will have their gender changed!`,
    },
    session: {
      title: "সেশন পরিবর্তন",
      selectLabel: "সেশন সিলেক্ট করুন",
      options: ["23-24", "24-25", "25-26"],
      helpText: "Are you sure?",
      helpSubtext: `${selectedStudents.length} selected students will have their session changed!`,
    },
    activate: {
      title: "ইউজারঅ্যাক্টিভ করুন",
      selectLabel: "",
      options: [],
      helpText: "Are you sure?",
      helpSubtext: `${selectedStudents.length} selected students will be activated!`,
      noSelect: true,
    },
    archive: {
      title: "আর্কাইভ করুন",
      selectLabel: "",
      options: [],
      helpText: "Are you sure?",
      helpSubtext: `${selectedStudents.length} selected students will be archived!`,
      noSelect: true,
    },
  };

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

        {!config.noSelect && (
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
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        )}

        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
          <p className="font-medium">{config.helpText}</p>
          <p className="text-sm text-gray-600">{config.helpSubtext}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={isUpdating}
            className="px-5 py-2 bg-[#BF6A02] text-white rounded-md font-semibold disabled:bg-gray-400"
          >
            {isUpdating ? 'Updating...' : 'আপডেট করুন'}
          </button>
          <button
            onClick={closeModal}
            className="px-5 py-2 border rounded-md font-semibold"
          >
            ক্যানসেল করুন
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* MODAL */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50   bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-4">
            {renderModalContent()}
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <p className="text-green-800 font-semibold text-xl whitespace-nowrap ">
            সকল ছাত্র
          </p>
          <div className="h-[1px] bg-[#92A09A] w-full"></div>
        </div>

        <div className="h-6 w-1 bg-[#92A09A] mx-4"></div>

        <div className="flex items-center gap-3">
          <a href="#" className="text-blue-600 font-medium">
            ২ ড্রাফট
          </a>

          <Button
            variant="outline"
            className="border-[#2B7752] py-5 text-[#246545] hover:text-[#246545] bg-[#E7FEF2] rounded-sm w-[150px] font-semibold hover:bg-[#E7FEF2]"
            onClick={handleExportData}
          >
            ডাটা এক্সপোর্ট
          </Button>

          <Button onClick={() => history.push("/add-student")} className="bg-[#2B7752] text-white rounded-sm w-[150px] font-semibold flex py-5 items-center justify-center gap-1">
            <CirclePlus size={22} />
            নতুন ছাত্র
          </Button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="my-6 bg-gray-50 py-8 rounded-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center mb-4">
            <Filter size={18} className="mr-2 text-[#2b7752]" />
            <span className="text-md font-semibold">ফিল্টার</span>
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

      {/* STATS GRID */}
      <div className="rounded-md p-4 mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4">
        {[
          ["মোট ছাত্র", students.length], // Update total student count
          ["আবাসিক", students.filter(s => s.residential === "Hostel").length],
          ["অর্ধ-আবাসিক", students.filter(s => s.residential === "DayScholar").length],
          ["অনাবাসিক", students.filter(s => s.residential === "NonResidential").length],
          ["নাজেরা", students.filter(s => s.class === "Nazera").length], // Assuming class names need mapping
          ["হিফজ", students.filter(s => s.class === "Hifz").length],
          ["সুন্নী", students.filter(s => s.class === "Sunni").length],
          ["কিতাব", students.filter(s => s.class === "Kitab").length],
          ["ইন্টারমিডিয়েট", students.filter(s => s.class === "Intermediate").length],
        ].map(([label, value], idx) => (
          <div key={idx} className="bg-[#ebffee] rounded-md p-3 font-semibold">
            <StatItem label={label} value={value} />
          </div>
        ))}
      </div>

      {/* STUDENT TABLE */}
      <div className="bg-white rounded-md">
        <div className="p-4 border-b border-gray-200 flex gap-4 items-center">
          <div className="bg-[#DFF2FF] flex gap-6 px-[14px] py-2 items-center rounded-md">
            <div>
              <input 
                type="checkbox" 
                className="mr-2" 
                onChange={handleSelectAll}
                checked={selectedStudents.length === students.length && students.length > 0}
              />
              <span className="text-sm text-[#0086CB] font-semibold">
                {selectedStudents.length} জন সিলেক্টেড
              </span>
            </div>

            <div className="flex items-center gap-3 ml-auto relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex justify-between items-center px-4 py-2 text-gray-600 border-2 rounded-md text-sm border-[#A2AFA8] bg-white w-40"
              >
                সিলেক্ট অ্যাকশন
                <ChevronDown size={16} />
              </button>

              <button 
                onClick={handleSubmit}
                disabled={isUpdating}
                className="px-4 py-2 text-white border-2 rounded-md text-sm flex items-center gap-2 font-semibold bg-[#2B7752] disabled:bg-gray-400"
              >
                <MousePointerClick className="mb-1" /> {isUpdating ? 'Updating...' : 'অ্যাকশন'}
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0  w-56 bg-white border rounded-md shadow-lg z-10 mt-[450px]">
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

        <div className="overflow-x-auto">
          {loading && <p className="text-center p-4">Loading students...</p>}
          {error && <p className="text-center p-4 text-red-500">Error: {error.message || JSON.stringify(error)}</p>}
          {!loading && !error && students.length > 0 && (
            <table className="w-full text-sm table-auto divide-y divide-gray-200 text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">
                    <input 
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedStudents.length === students.length && students.length > 0}
                    />
                  </th>
                  {[
                    "আইডি",
                    "রোল",
                    "নাম",
                    "শ্রেণী/শাখা",
                    "বিভাগ/শিফট",
                    "জেন্ডার/দেশন",
                    "রক্তের গ্রুপ",
                    "আ্যাকশান",
                  ].map((th, idx) => (
                    <th key={idx} className="px-4 py-3 font-medium">
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={student._id}
                    className={index % 2 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="p-3">
                      <input 
                        type="checkbox" 
                        checked={selectedStudents.includes(student._id)}
                        onChange={() => handleSelectStudent(student._id)}
                      />
                    </td>

                    <td className="p-3 font-semibold">{student._id}</td>
                    <td className="p-3 font-semibold">{student.roll}</td>

                    <td className="p-3 font-semibold">
                      <div className="flex flex-col items-center gap-1">
                        <span>{student.name}</span>
                        <ResidenceStatusBadge status={student.residential} />
                      </div>
                    </td>

                    <td className="p-3">
                      <div className="flex flex-col items-center font-semibold">
                        <span>{student.class}</span>
                        <span className="text-xs">{student.section}</span>
                      </div>
                    </td>

                    <td className="p-3">
                      <div className="flex flex-col items-center gap-1 font-semibold">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              student.class === "Nazera" ? "bg-yellow-500" :
                              student.class === "Hifz" ? "bg-pink-500" :
                              student.class === "Nurani" ? "bg-orange-500" :
                              student.class === "Kitab" ? "bg-red-500" :
                              "bg-gray-500"
                            }`}
                          ></span>
                          <span>{student.class}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              student.shift === "Morning" ? "bg-green-500" :
                              student.shift === "Evening" ? "bg-blue-500" :
                              "bg-gray-500"
                            }`}
                          ></span>
                          <span>{student.shift}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3">
                      <div className="flex flex-col items-center">
                        <span className="font-semibold">{student.gender}</span>
                        <span className="text-xs font-semibold">
                          {student.division}
                        </span>
                      </div>
                    </td>

                    <td className="p-3 font-semibold">{student.bloodGroup}</td>

                    <td className="p-3">
                      <Link
                        href={`/students/${student._id}`}
                        className="text-[#006FAA] cursor-pointer underline font-semibold"
                      >
                        আরও
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
