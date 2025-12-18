"use client"
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMadrasaSettings } from '@/lib/features/settings/settingsSlice'
import Preview from '../components/preview/Preview'
import PersonalInfo from '../components/preview/PersonalInfo'
import GuadianInfo from '../components/preview/GuadianInfo'
import Addrress from '../components/preview/Addrress'
import MadrshaInfo from '../components/add-student/MadrshaInfo'
import Talimi from '../components/add-student/Talimi'
import Reciepe from '../components/preview/Reciepe'
import Admissionfrom from '../components/preview/Admissionfrom'
import ReciepeForAdmission2 from '../components/preview/ReciepeForAdmission2'

export default function page() {
  const [navigateToFormReciepe, setNavigateToReciepe] = useState(1)
  const studentFormData = useSelector((state) => state.students.studentFormData);
  const { student: addedStudent } = useSelector((state) => state.students);
  const { madrasaSettings } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMadrasaSettings());
  }, [dispatch]);

  // Normalize data for the preview components (PersonalInfo, etc.)
  // These components expect the flat structure from the form, so we map them
  const savedData = addedStudent?.data || addedStudent?.student || (addedStudent?.name ? addedStudent : {});

  const normalizedData = {
    student: (savedData.name || savedData.uid) ? { ...savedData } : (studentFormData?.student || {}),
    guardian: (savedData.guardian?.[0] || savedData.fatherName) ? { ...(savedData.guardian?.[0] || savedData) } : (studentFormData?.guardian || {}),
    address: (savedData.addresse?.[0] || savedData.presentVillage) ? {
      ...(savedData.addresse?.[0] || savedData),
      // Map nested to flat for compatibility with Preview components
      presentVillage: savedData.addresse?.[0]?.present?.village || savedData.addresse?.[0]?.presentVillage || savedData.presentVillage,
      presentUpazila: savedData.addresse?.[0]?.present?.upazila || savedData.addresse?.[0]?.presentUpazila || savedData.presentUpazila,
      presentDistrict: savedData.addresse?.[0]?.present?.district || savedData.addresse?.[0]?.presentDistrict || savedData.presentDistrict,
      presentDivision: savedData.addresse?.[0]?.present?.division || savedData.addresse?.[0]?.presentDivision || savedData.presentDivision,
      permanentVillage: savedData.addresse?.[0]?.permanent?.village || savedData.addresse?.[0]?.permanentVillage || savedData.permanentVillage,
      permanentUpazila: savedData.addresse?.[0]?.permanent?.upazila || savedData.addresse?.[0]?.permanentUpazila || savedData.permanentUpazila,
      permanentDistrict: savedData.addresse?.[0]?.permanent?.district || savedData.addresse?.[0]?.permanentDistrict || savedData.permanentDistrict,
      permanentDivision: savedData.addresse?.[0]?.permanent?.division || savedData.addresse?.[0]?.permanentDivision || savedData.permanentDivision,
      isSameAsPresent: savedData.addresse?.[0]?.isSameAsPresent || savedData.isSameAsPresent,
    } : (studentFormData?.address || {}),
    madrasa: (savedData.oldMadrasaInfo?.[0] || savedData.oldMadrasaName) ? {
      ...(savedData.oldMadrasaInfo?.[0] || savedData),
      // Map API keys to form keys if they differ
      oldMadrasaName: savedData.oldMadrasaInfo?.[0]?.oldMadrasaName || savedData.oldMadrasaInfo?.[0]?.name || savedData.oldMadrasaName,
      oldMadrasaClass: savedData.oldMadrasaInfo?.[0]?.oldMadrasaClass || savedData.oldMadrasaInfo?.[0]?.lastClass || savedData.oldMadrasaClass,
      oldMadrasaResult: savedData.oldMadrasaInfo?.[0]?.oldMadrasaResult || savedData.oldMadrasaInfo?.[0]?.lastResult || savedData.oldMadrasaResult,
      talimiGuardianName: savedData.oldMadrasaInfo?.[0]?.talimiGuardianName || savedData.oldMadrasaInfo?.[0]?.localGuardianName || savedData.talimiGuardianName,
      talimiGuardianPhone: savedData.oldMadrasaInfo?.[0]?.talimiGuardianPhone || savedData.oldMadrasaInfo?.[0]?.localGuardianPhone || savedData.talimiGuardianPhone,
      admissionExaminer: savedData.oldMadrasaInfo?.[0]?.admissionExaminer || savedData.oldMadrasaInfo?.[0]?.recommenderName || savedData.admissionExaminer,
      admissionResult: savedData.oldMadrasaInfo?.[0]?.admissionResult || savedData.oldMadrasaInfo?.[0]?.testResult || savedData.admissionResult,
    } : (studentFormData?.madrasa || {}),
    fees: (savedData.fees?.[0] || savedData.helpType) ? (() => {
      const fees = savedData.fees?.[0] || savedData;
      const total = fees.totalAmount || fees.total || (
        (Number(fees.admissionFee) || 0) +
        (Number(fees.libraryFee) || 0) +
        (Number(fees.confirmFee) || 0) +
        (Number(fees.ITFee) || 0) +
        (Number(fees.IDCardFee) || 0) +
        (Number(fees.kafelaFee) || 0) +
        (Number(fees.booksFee) || 0)
      );
      const help = Number(fees.helpAmount) || Number(fees.help) || 0;
      return {
        ...fees,
        totalAmount: total,
        payableAmount: fees.payableAmount || fees.payable || (total - help),
        helpAmount: help,
      };
    })() : (studentFormData?.fees || {}),
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print Styles for Single Page */}
      <style jsx global>{`
        @media print {
          /* Page setup */
          @page {
            size: A4;
            margin: 0mm;
          }

          /* General Reset for Print */
          body {
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          #print-section {
            margin: 0 !important;
            padding: 4mm !important; /* Internal margin for the content */
          }

          /* Adjusted font sizes for better legibility */
          #print-section {
            font-size: 13px !important;
            line-height: 1.3 !important;
          }

          #print-section h1 {
            font-size: 20px !important;
          }

          #print-section h2 {
            font-size: 18px !important;
          }

          #print-section h3,
          #print-section h4,
          #print-section h5,
          #print-section h6 {
            font-size: 15px !important;
          }

          /* Reduce gaps */
          #print-section .grid,
          #print-section [class*="grid"] {
            gap: 2px !important;
          }

          #print-section .flex,
          #print-section [class*="flex"] {
            gap: 2px !important;
          }

          #print-section .flex.items-end.justify-between {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          /* Scale down overall to ensure single page fit with larger fonts */
          #print-section {
            transform: scale(0.85);
            transform-origin: top left;
            width: 117.6% !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-100 py-8 print:py-0 print:bg-white">
        <div className="mx-auto bg-white shadow-lg p-8 print:shadow-none print:p-0">
          {/* Print Button */}
          <div className="flex justify-end mb-4 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-[#246545] text-white rounded hover:bg-[#1b4d35] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              Print
            </button>
          </div>

          <div id="print-section">
            {
              navigateToFormReciepe === 1 ? <>
                <Preview studentData={normalizedData.student} guardianData={normalizedData.guardian} addressData={normalizedData.address} madrasaData={normalizedData.madrasa} feesData={normalizedData.fees} />
                <PersonalInfo studentData={normalizedData.student} />
                <GuadianInfo guardianData={normalizedData.guardian} />
                <Addrress addressData={normalizedData.address} />
                <MadrshaInfo madrasaData={normalizedData.madrasa} />
                <Talimi madrasaData={normalizedData.madrasa} />
                <Reciepe setNavigateToReciepe={setNavigateToReciepe} studentFormData={normalizedData} />
              </> :
                navigateToFormReciepe === 2 ? <Admissionfrom setNavigateToReciepe={setNavigateToReciepe} studentData={normalizedData.student} guardianData={normalizedData.guardian} addressData={normalizedData.address} madrasaData={normalizedData.madrasa} feesData={normalizedData.fees} madrasaSettings={madrasaSettings} /> :
                  navigateToFormReciepe === 3 ? (
                    <ReciepeForAdmission2
                      setNavigateToReciepe={setNavigateToReciepe}
                      studentData={normalizedData.student}
                      guardianData={normalizedData.guardian}
                      addressData={normalizedData.address}
                      madrasaData={normalizedData.madrasa}
                      feesData={normalizedData.fees}
                      madrasaSettings={madrasaSettings}
                      addedStudent={addedStudent}
                    />
                  ) : <></>
            }
          </div>

        </div>
      </div>
    </>
  );
}
