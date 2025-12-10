import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Async Thunk for adding a student
export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (studentFormDataFromState, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Append all parts of the studentFormDataFromState to the FormData object
      // Assuming studentFormDataFromState has structure: { student: {}, address: {}, guardian: {}, madrasa: {}, fees: {} }
      for (const section in studentFormDataFromState) {
        if (studentFormDataFromState.hasOwnProperty(section)) {
          const sectionData = studentFormDataFromState[section];
          if (section === 'student' && sectionData.profileImage instanceof File) {
            formData.append('profileImage', sectionData.profileImage);
            // Append other student data fields, excluding profileImage
            for (const key in sectionData) {
              if (sectionData.hasOwnProperty(key) && key !== 'profileImage') {
                formData.append(`student[${key}]`, sectionData[key]);
              }
            }
          } else {
            // Append other section data fields
            for (const key in sectionData) {
              if (sectionData.hasOwnProperty(key)) {
                formData.append(`${section}[${key}]`, sectionData[key]);
              }
            }
          }
        }
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/students/add-student`, {
        method: 'POST',
        body: formData, // No 'Content-Type' header needed for FormData; browser sets it automatically
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk for fetching all students
export const fetchAllStudents = createAsyncThunk(
  'students/fetchAllStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/students/get-all-students`);
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk for fetching a single student by ID
export const fetchStudentById = createAsyncThunk(
  'students/fetchStudentById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/students/get_student_with_guardian_address/${id}`);
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data.data[0] || null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk for updating a student
export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/students/update-student/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok) {
        return rejectWithValue(responseData);
      }
      return responseData.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    loading: false,
    isUpdating: false,
    error: null,
    success: false,
    selectedStudent: null,
    selectedStudentLoading: false,
    selectedStudentError: null,
    studentFormData: {
      student: {},
      address: {},
      guardian: {},
      madrasa: {},
      fees: {},
    },
  },
  reducers: {
    setStudentFormData: (state, action) => {
      const sectionName = Object.keys(action.payload)[0];
      if (sectionName) {
        state.studentFormData[sectionName] = {
          ...state.studentFormData[sectionName],
          ...action.payload[sectionName],
        };
      }
    },
    clearStudentFormData: (state) => {
      state.studentFormData = {
        student: {},
        address: {},
        guardian: {},
        madrasa: {},
        fees: {},
      };
    },
    resetAddStudentStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearSelectedStudent: (state) => {
      state.selectedStudent = null;
      state.selectedStudentLoading = false;
      state.selectedStudentError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Reducers for fetchAllStudents
      .addCase(fetchAllStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reducers for fetchStudentById
      .addCase(fetchStudentById.pending, (state) => {
        state.selectedStudentLoading = true;
        state.selectedStudentError = null;
        state.selectedStudent = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.selectedStudentLoading = false;
        state.selectedStudent = action.payload;
        state.selectedStudentError = null;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.selectedStudentLoading = false;
        state.selectedStudent = null;
        state.selectedStudentError = action.payload;
      })
      // Reducers for updateStudent
      .addCase(updateStudent.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.students.findIndex(student => student._id === action.payload._id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      });
  },
});

export const { setStudentFormData, clearStudentFormData, resetAddStudentStatus, clearSelectedStudent } = studentSlice.actions;
export default studentSlice.reducer;
