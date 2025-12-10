import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Async Thunk for fetching a single guardian by ID
export const fetchGuardianById = createAsyncThunk(
  'guardians/fetchGuardianById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/guardians/get-single-guardian/${id}`);
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data.data; // Assuming API returns { success: true, data: guardianObject }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk for updating a guardian
export const updateGuardian = createAsyncThunk(
  'guardians/updateGuardian',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/guardians/update-guardian/${id}`, {
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

const guardianSlice = createSlice({
  name: 'guardians',
  initialState: {
    selectedGuardian: null,
    selectedGuardianLoading: false,
    selectedGuardianError: null,
    isUpdating: false,
    updateError: null,
    updateSuccess: false,
  },
  reducers: {
    clearGuardianState: (state) => {
      state.selectedGuardian = null;
      state.selectedGuardianLoading = false;
      state.selectedGuardianError = null;
      state.isUpdating = false;
      state.updateError = null;
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducers for fetchGuardianById
      .addCase(fetchGuardianById.pending, (state) => {
        state.selectedGuardianLoading = true;
        state.selectedGuardianError = null;
        state.selectedGuardian = null;
      })
      .addCase(fetchGuardianById.fulfilled, (state, action) => {
        state.selectedGuardianLoading = false;
        state.selectedGuardian = action.payload;
        state.selectedGuardianError = null;
      })
      .addCase(fetchGuardianById.rejected, (state, action) => {
        state.selectedGuardianLoading = false;
        state.selectedGuardian = null;
        state.selectedGuardianError = action.payload;
      })
      // Reducers for updateGuardian
      .addCase(updateGuardian.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
        state.updateSuccess = false;
      })
      .addCase(updateGuardian.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.selectedGuardian = action.payload; // Update the selected guardian with the response
        state.updateSuccess = true;
        state.updateError = null;
      })
      .addCase(updateGuardian.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.payload;
        state.updateSuccess = false;
      });
  },
});

export const { clearGuardianState } = guardianSlice.actions;
export default guardianSlice.reducer;
