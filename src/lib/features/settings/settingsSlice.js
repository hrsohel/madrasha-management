import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authFetch } from '../../utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchMadrasaSettings = createAsyncThunk(
  'settings/fetchMadrasaSettings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authFetch(`${API_BASE_URL}/api/v1/students/madrasa-settings`);
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data; // Corrected: return the whole data object
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateMadrasaSettings = createAsyncThunk(
  'settings/updateMadrasaSettings',
  async (settingsData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Append nested name fields
      formData.append('name[bangla]', settingsData.name.bangla);
      formData.append('name[english]', settingsData.name.english);
      formData.append('name[arabic]', settingsData.name.arabic);

      // Append nested location fields
      formData.append('location[bangla]', settingsData.location.bangla);
      formData.append('location[english]', settingsData.location.english);
      formData.append('location[arabic]', settingsData.location.arabic);

      // Append nested contact fields
      formData.append('contact[email]', settingsData.contact.email);
      formData.append('contact[phone]', settingsData.contact.phone);

      // Append logo if it exists
      if (settingsData.logo) {
        formData.append('logo', settingsData.logo);
      }

      const response = await authFetch(`${API_BASE_URL}/api/v1/students/madrasa-settings`, {
        method: 'PATCH',
        body: formData,
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

export const addOrUpdateFee = createAsyncThunk(
  'settings/addOrUpdateFee',
  async ({ feeName, amount }, { rejectWithValue }) => {
    try {
      const response = await authFetch(`${API_BASE_URL}/api/v1/students/madrasa-settings/fees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feeName, amount }),
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

export const removeFee = createAsyncThunk(
  'settings/removeFee',
  async (feeName, { rejectWithValue }) => {
    try {
      const response = await authFetch(`${API_BASE_URL}/api/v1/students/madrasa-settings/fees/${feeName}`, {
        method: 'DELETE',
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

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    madrasaSettings: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetSettingsStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMadrasaSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMadrasaSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.madrasaSettings = action.payload;
      })
      .addCase(fetchMadrasaSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMadrasaSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateMadrasaSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.madrasaSettings = action.payload.data || action.payload;
        state.success = true;
      })
      .addCase(updateMadrasaSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(addOrUpdateFee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addOrUpdateFee.fulfilled, (state, action) => {
        state.loading = false;
        state.madrasaSettings = action.payload.data || action.payload;
        state.success = true;
      })
      .addCase(addOrUpdateFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(removeFee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(removeFee.fulfilled, (state, action) => {
        state.loading = false;
        state.madrasaSettings = action.payload.data || action.payload;
        state.success = true;
      })
      .addCase(removeFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetSettingsStatus } = settingsSlice.actions;
export default settingsSlice.reducer;
