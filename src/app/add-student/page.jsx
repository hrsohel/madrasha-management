"use client"
import React, { useState } from 'react'
import AddSrudentform1 from '../components/add-student/AddSrudentform1'
import AddSrudentform2 from "../components/add-student/AddStudentForm2"
import TopPagination from '../components/add-student/TopPagination'
import AddStudentform3 from '../components/add-student/AddStudentform3'
import AddStudentform4 from '../components/add-student/AddStudentform4'
import AddStudentForm5 from '../components/add-student/AddStudentForm5'
import Preview from '../components/preview/Preview'

export default function pages() {
  const [pagination, setPagination] = useState(1)
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="">
        <TopPagination pagination={pagination} />
        {
          pagination === 1 ? <AddSrudentform1 setPagination={setPagination} /> :
          pagination === 2 ? <AddSrudentform2 setPagination={setPagination} /> :
          pagination === 3 ? <AddStudentform3 setPagination={setPagination} /> :
          pagination === 4 ? <AddStudentform4 setPagination={setPagination} /> :
          pagination === 5 ? <AddStudentForm5 setPagination={setPagination} /> : <></>
        }
      </div>
    </div>
  )
}
