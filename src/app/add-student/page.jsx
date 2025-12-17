"use client"
import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, resetAddStudentStatus, setStudentFormData, clearStudentFormData } from '@/lib/features/students/studentSlice';

import AddSrudentform1 from '../components/add-student/AddSrudentform1';
import AddSrudentform2 from "../components/add-student/AddStudentForm2";
import TopPagination from '../components/add-student/TopPagination';
import AddStudentform3 from '../components/add-student/AddStudentform3';
import AddStudentform4 from '../components/add-student/AddStudentform4';
import AddStudentForm5 from '../components/add-student/AddStudentForm5';
import Preview from '../components/preview/Preview';

export default function AddStudentPage() {
  const [pagination, setPagination] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);
  // const [localProfileImageFile, setLocalProfileImageFile] = useState(null); // Local state for the actual File object


  const dispatch = useDispatch();
  const { loading, error, success, student } = useSelector((state) => state.students);
  const studentFormData = useSelector((state) => state.students.studentFormData);

  const handleFormDataChange = useCallback((section, data) => {
    // Check if the data contains a profileImage file
    if (section === 'student' && data.profileImage instanceof File) {
      // setLocalProfileImageFile(data.profileImage); // Store the actual File object locally
      // Dispatch a serializable representation for Redux state (e.g., for preview)
      dispatch(setStudentFormData({
        [section]: {
          ...studentFormData[section],
          // profileImage: URL.createObjectURL(data.profileImage), // Store URL for preview
          profileImage: data.profileImage, // Store URL for preview
        },
      }));
    } else {
      // For all other data, proceed as normal
      const newSectionData = {
        ...studentFormData[section],
        ...data,
      };
      dispatch(setStudentFormData({
        [section]: newSectionData,
      }));
    }
  }, [dispatch, studentFormData]);

  const handleSubmit = () => {
    console.log("Submitting form data:", studentFormData);
    // Combine Redux form data with the locally stored profile image file
    const formDataForSubmission = {
      ...studentFormData,
      student: {
        ...studentFormData.student,
        // profileImage: localProfileImageFile, // Attach the actual File object
      },
    };
    dispatch(addStudent(formDataForSubmission));
  };

  // Clear form data when component mounts to ensure fresh state
  useEffect(() => {
    dispatch(clearStudentFormData());
    setIsInitialized(true);
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Student added successfully!");
      dispatch(resetAddStudentStatus());
      dispatch(clearStudentFormData()); // Clear form data from Redux
      // Optionally reset form or navigate
      setTimeout(() => {
        setPagination(1);
      }, 0);
    }
    if (error) {
      toast.error(`Error: ${error.message || error.field || JSON.stringify(error)}`);
    }
  }, [success, error, dispatch]);

  if (!isInitialized) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="">
        <TopPagination pagination={pagination} />
        {
          pagination === 1 ? <AddSrudentform1 setPagination={setPagination} formData={studentFormData.student} onDataChange={(data) => handleFormDataChange('student', data)} /> :
            pagination === 2 ? <AddSrudentform2 setPagination={setPagination} formData={studentFormData.guardian} onDataChange={(data) => handleFormDataChange('guardian', data)} /> :
              pagination === 3 ? <AddStudentform3 setPagination={setPagination} formData={studentFormData.address} onDataChange={(data) => handleFormDataChange('address', data)} /> :
                pagination === 4 ? <AddStudentform4 setPagination={setPagination} formData={studentFormData.madrasa} onDataChange={(data) => handleFormDataChange('madrasa', data)} /> :
                  pagination === 5 ? (
                    <AddStudentForm5
                      setPagination={setPagination}
                      formData={studentFormData.fees}
                      onDataChange={(data) => handleFormDataChange('fees', data)}
                    />
                  ) : <></>
        }

        {loading && <p>Loading...</p>}
        {/* Error messages will be handled by the alert in useEffect */}
      </div>
    </div>
  );
}