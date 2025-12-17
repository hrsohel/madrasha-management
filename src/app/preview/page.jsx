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
          }

          #print-section {
            margin: 0 !important;
            padding: 8mm !important; /* Internal margin for the content */
          }

          /* Reduce font sizes */
          #print-section {
            font-size: 8px !important;
            line-height: 1.1 !important;
          }

          #print-section h1 {
            font-size: 12px !important;
          }

          #print-section h2 {
            font-size: 10px !important;
          }

          #print-section h3,
          #print-section h4,
          #print-section h5,
          #print-section h6 {
            font-size: 9px !important;
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

          /* Scale down overall */
          #print-section {
            transform: scale(0.8);
            transform-origin: top left;
            width: 125% !important;
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
                <Preview studentData={studentFormData.student} guardianData={studentFormData.guardian} addressData={studentFormData.address} madrasaData={studentFormData.madrasa} feesData={studentFormData.fees} />
                <PersonalInfo studentData={studentFormData.student} />
                <GuadianInfo guardianData={studentFormData.guardian} />
                <Addrress addressData={studentFormData.address} />
                <MadrshaInfo madrasaData={studentFormData.madrasa} />
                <Talimi madrasaData={studentFormData.madrasa} />
                <Reciepe setNavigateToReciepe={setNavigateToReciepe} studentFormData={studentFormData} />
              </> :
                navigateToFormReciepe === 2 ? <Admissionfrom setNavigateToReciepe={setNavigateToReciepe} /> :
                  navigateToFormReciepe === 3 ? (
                    <ReciepeForAdmission2
                      setNavigateToReciepe={setNavigateToReciepe}
                      studentData={studentFormData.student}
                      guardianData={studentFormData.guardian}
                      addressData={studentFormData.address}
                      madrasaData={studentFormData.madrasa}
                      feesData={studentFormData.fees}
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
