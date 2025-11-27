import React from 'react'
import AddSrudentform1 from '../components/add-student/AddSrudentform1'
import AddSrudentform2 from "../components/add-student/AddStudentForm2"
import TopPagination from '../components/add-student/TopPagination'
import AddStudentform3 from '../components/add-student/AddStudentform3'
import AddStudentform4 from '../components/add-student/AddStudentform4'
import AddStudentForm5 from '../components/add-student/AddStudentForm5'
import Preview from '../components/preview/Preview'

export default function pages() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="">
        <TopPagination />
        <AddSrudentform2 />
        {/* <AddStudentform3 /> */}
        {/* <AddStudentform4 /> */}
        {/* <AddStudentForm5 /> */}
      </div>
    </div>
  )
}
