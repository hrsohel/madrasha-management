// src/app/(pages)/students/[id]/page.js
"use client";

import AcademicYearInfo from "@/app/components/StudentInfoComponent/AcademicYearInfo";
import AddressInfo from "@/app/components/StudentInfoComponent/AddressInfo";
import FamilyInfo from "@/app/components/StudentInfoComponent/FamilyInfo";
import GuardianInfo from "@/app/components/StudentInfoComponent/GuardianInfo";
import StudentAdmissionReceipt from "@/app/components/StudentInfoComponent/StudentAdmissionReceipt";
import StudentInfo from "@/app/components/StudentInfoComponent/StudentInfo";
import { useParams } from "next/navigation";

export default function StudentDetailsPage() {
  const { id } = useParams();

  return (
    <div>
      <StudentInfo />
      <FamilyInfo />
      <AddressInfo />
      <GuardianInfo />
      <AcademicYearInfo />
      <StudentAdmissionReceipt />
    </div>
  );
}
