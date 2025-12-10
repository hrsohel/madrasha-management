"use client";
import { useState, useEffect } from "react";
import { Pencil, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateGuardian,
  fetchGuardianById,
} from "@/lib/features/guardians/guardianSlice";

export default function FamilyInfo({ guardian }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const {
    selectedGuardian,
    selectedGuardianLoading,
    selectedGuardianError,
    // isUpdating, // Commented out as not directly used in render logic
    // updateError, // Commented out as not directly used in render logic
    // updateSuccess, // Commented out as not directly used in render logic
  } = useSelector((state) => state.guardians);

  useEffect(() => {
    // Fetch guardian data when the component mounts or guardian prop changes
    if (guardian?._id) {
      dispatch(fetchGuardianById(guardian._id));
    }
    // Cleanup function if needed, for now clearGuardianState is not dispatched on unmount
  }, [dispatch, guardian?._id]);

  useEffect(() => {
    // Populate formData when selectedGuardian data is fetched or updated
    if (selectedGuardian) {
      setFormData({
        fatherName: selectedGuardian.fatherName || "",
        fatherNID: selectedGuardian.fatherNID || "",
        fatherPhone: selectedGuardian.fatherPhone || "",
        motherName: selectedGuardian.motherName || "",
        motherNID: selectedGuardian.motherNID || "",
        motherPhone: selectedGuardian.motherPhone || "",
        guardianName: selectedGuardian.guardianName || "",
        guardianNID: selectedGuardian.guardianNID || "",
        guardianPhone: selectedGuardian.guardianPhone || "",
        guardianRelation: selectedGuardian.guardianRelation || "",
      });
    }
  }, [selectedGuardian]);

  const handleEditClick = () => {
    // Re-fetch data to ensure the modal displays the freshest version from the store
    if (guardian?._id) {
      dispatch(fetchGuardianById(guardian._id));
    }
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("handleUpdate called");
    const guardianId = guardian?._id;
    console.log("Guardian ID:", guardianId);
    if (!guardianId) {
      console.error("Guardian ID not found, returning.");
      return;
    }

    const dataToUpdate = {
      fatherName: formData.fatherName,
      fatherNID: formData.fatherNID,
      fatherPhone: formData.fatherPhone,
      motherName: formData.motherName,
      motherNID: formData.motherNID,
      motherPhone: formData.motherPhone,
      guardianName: formData.guardianName,
      guardianNID: formData.guardianNID,
      guardianPhone: formData.guardianPhone,
      guardianRelation: formData.guardianRelation,
    };
    console.log("Data to update:", dataToUpdate);

    try {
      console.log("Dispatching updateGuardian...");
      await dispatch(
        updateGuardian({ id: guardianId, data: dataToUpdate })
      ).unwrap();
      console.log("Update successful");
      setShowModal(false);
      // Re-fetch guardian data to update the displayed info on the main page
      dispatch(fetchGuardianById(guardianId));
    } catch (error) {
      console.error("Failed to update guardian:", error);
      // Optionally, show an error message to the user
    }
  };

  if (selectedGuardianLoading) {
    return <div>Loading Guardian Info...</div>;
  }

  if (selectedGuardianError) {
    return <div>Error: {selectedGuardianError}</div>;
  }

  return (
    <div className="   ">
      <div className=" mx-auto flex gap-6 mt-10">
        {/* Left Sidebar */}
        <div className="w-48 bg-[#F7F7F7] rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold text-[#246545] mb-4">
            অভিভাবকের তথ্য
          </h2>
          <ul className="space-y-2">
            <li className="text-sm text-[#63736C] py-2 px-3 hover:bg-gray-50 rounded cursor-pointer font-semibold ">
              ঠিকানা
            </li>
            <li className="text-sm text-[#63736C] py-2 px-3 hover:bg-gray-50 rounded cursor-pointer font-semibold">
              পূর্বতন মাদ্রাসার তথ্য
            </li>
            <li className="text-sm text-[#63736C]  py-2 px-3 hover:bg-gray-50 rounded cursor-pointer font-semibold">
              আর্থিক মুরব্বি / স্থানীয় মুরব্বি
            </li>
            <li className="text-sm text-[#63736C] py-2 px-3 hover:bg-gray-50 rounded cursor-pointer font-semibold">
              ভর্তি পরীক্ষার সনদাংশ
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-[#F7F7F7] rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h1 className="text-xl font-semibold text-[#246545]">
              অভিভাবকের তথ্য
            </h1>
            <button
              onClick={handleEditClick}
              className="flex items-center text-[#2B7752] font-semi-bold gap-2 px-4 py-[6px] border-[1px] bg-[#E7FEF2] border-[#2B7752] rounded-md hover:bg-[#E7FEF2] transition-colors"
            >
              <Pencil className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </div>

          <div className="p-6">
            {/* পিতার তথ্য */}
            <div className="mb-8">
              <h3 className="text-base font-semibold text-[#63736C] mb-4 pb-2 border-b">
                পিতার তথ্য
              </h3>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">
                    নাম
                  </p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {selectedGuardian?.fatherName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">
                    মোবাইল নম্বর
                  </p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {selectedGuardian?.fatherPhone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">
                    NID
                  </p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {selectedGuardian?.fatherNID}
                  </p>
                </div>
              </div>
            </div>

            {/* মাতার তথ্য */}
            <div className="mb-8">
              <h3 className="text-base font-semibold text-[#63736C] mb-4 pb-2 border-b">
                মাতার তথ্য
              </h3>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">
                    নাম
                  </p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {selectedGuardian?.motherName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold  mb-1">
                    মোবাইল নম্বর
                  </p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {selectedGuardian?.motherPhone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">
                    NID
                  </p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {selectedGuardian?.motherNID}
                  </p>
                </div>
              </div>
            </div>

            {/* অভিভাবকের তথ্য */}
            <div>
              <h3 className="text-base font-semibold text-[#63736C] mb-4 pb-2 border-b">
                অভিভাবকের তথ্য
              </h3>
              <div className="grid grid-cols-4 gap-8">
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">
                    সম্পর্ক
                  </p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {selectedGuardian?.guardianRelation}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">
                    নাম
                  </p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {selectedGuardian?.guardianName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">
                    মোবাইল নম্বর
                  </p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {selectedGuardian?.guardianPhone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#63736C] font-semibold mb-1">
                    NID
                  </p>
                  <p className="text-sm text-[#424D47] font-semibold">
                    {selectedGuardian?.guardianNID}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto ">
            {/* Modal Header */}
            <div className="p-6 border-b border-dashed border-gray-300">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#246545]">
                  পিতা-মাতা ও অভিভাবকের তথ্য
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleUpdate}>
                {/* পিতার তথ্য */}
                <div className="mb-6 border border-dashed border-gray-300 p-4 rounded">
                  <h3 className="text-sm font-semibold text-[#63736C] mb-4">
                    পিতার তথ্য
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">
                        নাম
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">
                        মোবাইল নম্বর
                      </label>
                      <input
                        type="text"
                        name="fatherPhone"
                        value={formData.fatherPhone || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-700 mb-1">
                      NID
                    </label>
                    <input
                      type="text"
                      name="fatherNID"
                      value={formData.fatherNID || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* মাতার তথ্য */}
                <div className="mb-6 border border-dashed border-gray-300 p-4 rounded">
                  <h3 className="text-sm font-semibold text-[#63736C] mb-4">
                    মাতার তথ্য
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">
                        নাম
                      </label>
                      <input
                        type="text"
                        name="motherName"
                        value={formData.motherName || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">
                        নম্বর
                      </label>
                      <input
                        type="text"
                        name="motherPhone"
                        value={formData.motherPhone || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-700 mb-1">
                      NID
                    </label>
                    <input
                      type="text"
                      name="motherNID"
                      value={formData.motherNID || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* অভিভাবকের তথ্য */}
                <div className="mb-6 border border-dashed border-gray-300 p-4 rounded">
                  <h3 className="text-sm font-semibold text-[#63736C] mb-4">
                    অভিভাবকের তথ্য
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">
                        সম্পর্ক
                      </label>
                      <select
                        name="guardianRelation"
                        value={formData.guardianRelation || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Uncle">Uncle</option>
                        <option value="Aunt">Aunt</option>
                        <option value="Grandfather">Grandfather</option>
                        <option value="Grandmother">Grandmother</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">
                        নাম
                      </label>
                      <input
                        type="text"
                        name="guardianName"
                        value={formData.guardianName || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">
                        মোবাইল নম্বর
                      </label>
                      <input
                        type="text"
                        name="guardianPhone"
                        value={formData.guardianPhone || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-700 mb-1">
                        NID
                      </label>
                      <input
                        type="text"
                        name="guardianNID"
                        value={formData.guardianNID || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Note */}
                <p className="text-xs text-gray-600 mb-4 p-3 bg-gray-50 rounded border border-dashed border-gray-300">
                  আপডেটকৃত তথ্য সংরক্ষণ করতে &apos;সেভ করুন&apos; বাটনে ক্লিক
                  করুন অথবা &apos;ক্যানসেল&apos; করুন।
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#246545] text-white rounded text-sm hover:bg-green-800 transition-colors"
                  >
                    সেভ করুন
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors"
                  >
                    ক্যানসেল করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
