import React from 'react'
import Preview from '../components/preview/Preview'
import PersonalInfo from '../components/preview/PersonalInfo'
import GuadianInfo from '../components/preview/GuadianInfo'
import Addrress from '../components/preview/Addrress'
import MadrshaInfo from '../components/add-student/MadrshaInfo'
import Talimi from '../components/add-student/Talimi'

export default function page() {
  return (
    <div>
        <Preview />
        <PersonalInfo />
        <GuadianInfo />
        <Addrress />
        <MadrshaInfo />
        <Talimi />
    </div>
  )
}
