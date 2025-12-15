"use client";

import AcademicYearInfo from "@/app/components/StudentInfoComponent/AcademicYearInfo";
import AddressInfo from "@/app/components/StudentInfoComponent/AddressInfo";
import FamilyInfo from "@/app/components/StudentInfoComponent/FamilyInfo";
import GuardianInfo from "@/app/components/StudentInfoComponent/GuardianInfo";
import StudentAdmissionReceipt from "@/app/components/StudentInfoComponent/StudentAdmissionReceipt";
import StudentInfo from "@/app/components/StudentInfoComponent/StudentInfo";
import AdmissionExamInfo from "@/app/components/StudentInfoComponent/AdmissionExamInfo";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudentById, clearSelectedStudent } from "@/lib/features/students/studentSlice";
import { fetchMadrasaSettings } from "@/lib/features/settings/settingsSlice";

export default function StudentDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedStudent, selectedStudentLoading, selectedStudentError } = useSelector(
    (state) => state.students
  );
  const { madrasaSettings } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(fetchMadrasaSettings());
    if (id) {
      dispatch(fetchStudentById(id));
    }
    return () => {
      dispatch(clearSelectedStudent()); // Clean up when component unmounts
    };
  }, [id, dispatch]);

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
    <div className="p-6 bg-gray-50 min-h-screen">
      <StudentInfo student={studentData} />
      {studentData.guardian && <FamilyInfo guardian={studentData.guardian} />}
      {studentData.address && <AddressInfo address={studentData.address} />}
      {studentData.admissionExamInfo && <GuardianInfo oldMadrasaInfo={studentData.admissionExamInfo} />}
      {studentData.admissionExamInfo && <AcademicYearInfo oldMadrasaInfo={studentData.admissionExamInfo} />}
      {studentData.admissionExamInfo && <AdmissionExamInfo admissionExamInfo={studentData.admissionExamInfo} />}
      {studentData.fees && <StudentAdmissionReceipt fees={studentData.fees} student={studentData} madrasaSettings={madrasaSettings} />}
    </div>
  );
}
