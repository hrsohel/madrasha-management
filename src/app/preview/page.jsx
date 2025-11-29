"use client"
import React, { useState } from 'react'
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
  return (
    <div>
      {
        navigateToFormReciepe === 1 ? <>
          <Preview />
          <PersonalInfo />
          <GuadianInfo />
          <Addrress />
          <MadrshaInfo />
          <Talimi />
          <Reciepe setNavigateToReciepe={setNavigateToReciepe} />
        </> : 
        navigateToFormReciepe === 2 ? <Admissionfrom setNavigateToReciepe={setNavigateToReciepe} /> :
        navigateToFormReciepe === 3 ? <ReciepeForAdmission2 setNavigateToReciepe={setNavigateToReciepe} /> : <></>
      }
    </div>
  )
}
