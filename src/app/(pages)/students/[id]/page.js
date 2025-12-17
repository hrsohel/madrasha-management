"use client";

import AcademicYearInfo from "@/app/components/StudentInfoComponent/AcademicYearInfo";
import AddressInfo from "@/app/components/StudentInfoComponent/AddressInfo";
import FamilyInfo from "@/app/components/StudentInfoComponent/FamilyInfo";
import GuardianInfo from "@/app/components/StudentInfoComponent/GuardianInfo";
import StudentAdmissionReceipt from "@/app/components/StudentInfoComponent/StudentAdmissionReceipt";
import StudentInfo from "@/app/components/StudentInfoComponent/StudentInfo";
import AdmissionExamInfo from "@/app/components/StudentInfoComponent/AdmissionExamInfo";
import { EditStudentModal } from "@/app/components/StudentInfoComponent/EditStudentModal";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudentById, clearSelectedStudent } from "@/lib/features/students/studentSlice";
import { fetchMadrasaSettings } from "@/lib/features/settings/settingsSlice";
import { Printer, Edit } from "lucide-react";

export default function StudentDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedStudent, selectedStudentLoading, selectedStudentError } = useSelector(
    (state) => state.students
  );
  const { madrasaSettings } = useSelector((state) => state.settings);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMadrasaSettings());
    if (id) {
      dispatch(fetchStudentById(id));
    }
    return () => {
      dispatch(clearSelectedStudent()); // Clean up when component unmounts
    };
  }, [id, dispatch]);

  const handlePrint = () => {
    window.print();
  };

  const handleUpdateSuccess = () => {
    // Refresh data after successful update
    if (id) {
      dispatch(fetchStudentById(id));
    }
  };

  if (selectedStudentLoading) {
    return <div className="text-center p-6">Loading student details...</div>;
  }

  if (selectedStudentError) {
    return (
      <div className="text-center p-6 text-red-500">
        Error: {selectedStudentError.message || JSON.stringify(selectedStudentError)}
      </div>
    );
  }

  if (!selectedStudent) {
    return <div className="text-center p-6">No student found.</div>;
  }

  // Extract relevant data for sub-components
  const studentData = {
    ...selectedStudent,
    // Assuming guardian and addresse are arrays, and we want the first one
    guardian: selectedStudent.guardian ? selectedStudent.guardian[0] : null,
    address: selectedStudent.addresse ? selectedStudent.addresse[0] : null,
    admissionExamInfo: selectedStudent.oldMadrasaInfo ? selectedStudent.oldMadrasaInfo[0] : null,
    fees: selectedStudent.fees ? selectedStudent.fees[0] : null,
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen printable-content">
      {/* Action Buttons */}
      <div className="mb-6 flex justify-end gap-3 print-button">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2"
        >
          <Edit className="w-5 h-5" />
          তথ্য সম্পাদনা করুন
        </button>

        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2"
        >
          <Printer className="w-5 h-5" />
          প্রিন্ট করুন
        </button>
      </div>

      <StudentInfo student={studentData} studentId={studentData._id} onUpdateSuccess={handleUpdateSuccess} />
      {studentData.address && <AddressInfo address={studentData.address} studentId={studentData._id} onUpdateSuccess={handleUpdateSuccess} />}
      {studentData.guardian && <FamilyInfo guardian={Array.isArray(studentData.guardian) ? studentData.guardian[0] : studentData.guardian} studentId={studentData._id} onUpdateSuccess={handleUpdateSuccess} />}
      {studentData.admissionExamInfo && <GuardianInfo oldMadrasaInfo={studentData.admissionExamInfo} studentId={studentData._id} onUpdateSuccess={handleUpdateSuccess} />}
      {studentData.admissionExamInfo && <AcademicYearInfo oldMadrasaInfo={studentData.admissionExamInfo} studentId={studentData._id} onUpdateSuccess={handleUpdateSuccess} />}
      {studentData.admissionExamInfo && <AdmissionExamInfo admissionExamInfo={studentData.admissionExamInfo} studentId={studentData._id} onUpdateSuccess={handleUpdateSuccess} />}
      {studentData.fees && <StudentAdmissionReceipt fees={studentData.fees} student={studentData} madrasaSettings={madrasaSettings} />}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditStudentModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          studentData={studentData} // Pass the processed studentData which includes guardian/address objects
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
}
