import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Async Thunk for adding a student
export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/students/add-student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      const data = await response.json();

      if (!response.ok) {
        // If the server returns a non-OK status, reject with the error message
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      // Handle network errors or other exceptions
      return rejectWithValue(error.message);
    }
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    loading: false,
    student: null,
    error: null,
    success: false,
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
      console.log('Reducer: setStudentFormData - Action Payload:', action.payload);
      const sectionName = Object.keys(action.payload)[0];
      if (sectionName) {
        console.log(`Reducer: setStudentFormData - Merging into section: ${sectionName}`);
        console.log('Reducer: setStudentFormData - Current state for section:', state.studentFormData[sectionName]);
        console.log('Reducer: setStudentFormData - Incoming data for section:', action.payload[sectionName]);
        state.studentFormData[sectionName] = {
          ...state.studentFormData[sectionName],
          ...action.payload[sectionName],
        };
        console.log('Reducer: setStudentFormData - New state for section:', state.studentFormData[sectionName]);
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
      });
  },
});

export const { setStudentFormData, clearStudentFormData, resetAddStudentStatus } = studentSlice.actions;
export default studentSlice.reducer;
