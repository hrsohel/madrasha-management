"use client"
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
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
  return (
    <div>
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
        navigateToFormReciepe === 3 ? <ReciepeForAdmission2 setNavigateToReciepe={setNavigateToReciepe} /> : <></>
      }
    </div>
  )
}
