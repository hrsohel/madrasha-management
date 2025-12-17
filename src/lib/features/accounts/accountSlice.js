import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authFetch } from '../../utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const addIncome = createAsyncThunk(
  'accounts/addIncome',
  async (incomeData, { rejectWithValue }) => {
    try {
      const response = await authFetch(`${API_BASE_URL}/api/v1/accounts/add-income`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incomeData),
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

export const fetchAllIncomes = createAsyncThunk(
  'accounts/fetchAllIncomes',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await authFetch(`${API_BASE_URL}/api/v1/accounts/get-all-incomes?page=${page}`);
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

export const addExpense = createAsyncThunk(
  'accounts/addExpense',
  async (expenseData, { rejectWithValue }) => {
    try {
      const response = await authFetch(`${API_BASE_URL}/api/v1/accounts/add-expense`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
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

export const fetchAllExpenses = createAsyncThunk(

  'accounts/fetchAllExpenses',

  async (page = 1, { rejectWithValue }) => {

    try {

      const response = await authFetch(`${API_BASE_URL}/api/v1/accounts/get-all-expenses?page=${page}`);

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







export const addDonor = createAsyncThunk(



  'accounts/addDonor',



  async (donorData, { rejectWithValue }) => {



    try {



      const response = await authFetch(`${API_BASE_URL}/api/v1/accounts/add-donor`, {



        method: 'POST',



        headers: {



          'Content-Type': 'application/json',



        },



        body: JSON.stringify(donorData),



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







export const fetchAllDonors = createAsyncThunk(



  'accounts/fetchAllDonors',



  async (_, { rejectWithValue }) => {



    try {



      const response = await authFetch(`${API_BASE_URL}/api/v1/accounts/get-all-donors`);



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











export const fetchFinancialSummary = createAsyncThunk(



  'accounts/fetchFinancialSummary',



  async (year, { rejectWithValue }) => {



    try {



      const response = await authFetch(`${API_BASE_URL}/api/v1/financials/summary?year=${year}`);



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











const accountSlice = createSlice({



  name: 'accounts',



  initialState: {



    incomes: [],



    expenses: [],



    donors: [],



    totalDocuments: 0,



    totalExpenseDocuments: 0,



    currentPage: 1,



    currentExpensePage: 1,



    income: null,



    expense: null,



    donor: null, // New field for donor



    loading: false,



    error: null,



    success: false,



    financialSummary: null, // New field for financial summary



    monthlySummary: [], // New field for monthly summary



    previousYearSummary: null, // New field



    currentYearSummary: null, // New field



    currentYearAverage: null, // New field



  },



  reducers: {



    resetIncomeStatus: (state) => {



      state.loading = false;



      state.error = null;



      state.success = false;



    },



    resetExpenseStatus: (state) => {



      state.loading = false;



      state.error = null;



      state.success = false;



    },



    resetDonorStatus: (state) => { // New reducer for donor status



      state.loading = false;



      state.error = null;



      state.success = false;



    },



  },



  extraReducers: (builder) => {



    builder



      .addCase(addIncome.pending, (state) => {



        state.loading = true;



        state.error = null;



        state.success = false;



      })



      .addCase(addIncome.fulfilled, (state, action) => {



        state.loading = false;



        state.income = action.payload;



        state.success = true;



        state.error = null;



      })



      .addCase(addIncome.rejected, (state, action) => {



        state.loading = false;



        state.error = action.payload;



        state.success = false;



      })



      .addCase(fetchAllIncomes.pending, (state) => {



        state.loading = true;



        state.error = null;



      })



      .addCase(fetchAllIncomes.fulfilled, (state, action) => {



        state.loading = false;



        state.incomes = action.payload.incomes;



        state.totalDocuments = action.payload.totalDocuments;



        state.currentPage = action.payload.page;



      })



      .addCase(fetchAllIncomes.rejected, (state, action) => {



        state.loading = false;



        state.error = action.payload;



      })



      .addCase(addExpense.pending, (state) => {



        state.loading = true;



        state.error = null;



        state.success = false;



      })



      .addCase(addExpense.fulfilled, (state, action) => {



        state.loading = false;



        state.expense = action.payload;



        state.success = true;



        state.error = null;



      })



      .addCase(addExpense.rejected, (state, action) => {



        state.loading = false;



        state.error = action.payload;



        state.success = false;



      })



      .addCase(fetchAllExpenses.pending, (state) => {



        state.loading = true;



        state.error = null;



      })



      .addCase(fetchAllExpenses.fulfilled, (state, action) => {



        state.loading = false;



        state.expenses = action.payload.incomes; // Note: API returns 'incomes' for expenses



        state.totalExpenseDocuments = action.payload.totalDocuments;



        state.currentExpensePage = action.payload.page;



      })



      .addCase(fetchAllExpenses.rejected, (state, action) => {



        state.loading = false;



        state.error = action.payload;



      })



      // Cases for addDonor



      .addCase(addDonor.pending, (state) => {



        state.loading = true;



        state.error = null;



        state.success = false;



      })



      .addCase(addDonor.fulfilled, (state, action) => {



        state.loading = false;



        state.donors.push(action.payload.data);



        state.success = true;



        state.error = null;



      })



      .addCase(addDonor.rejected, (state, action) => {



        state.loading = false;



        state.error = action.payload;



        state.success = false;



      })



      // Cases for fetchAllDonors



      .addCase(fetchAllDonors.pending, (state) => {



        state.loading = true;



        state.error = null;



      })



      .addCase(fetchAllDonors.fulfilled, (state, action) => {



        state.loading = false;



        state.donors = action.payload.donors;



      })



      .addCase(fetchAllDonors.rejected, (state, action) => {



        state.loading = false;



        state.error = action.payload;



      })



      // Cases for fetchFinancialSummary



      .addCase(fetchFinancialSummary.pending, (state) => {



        state.loading = true;



        state.error = null;



      })



      .addCase(fetchFinancialSummary.fulfilled, (state, action) => {



        state.loading = false;



        state.financialSummary = action.payload;



        state.monthlySummary = action.payload.monthlySummary;



        state.previousYearSummary = action.payload.previousYearSummary;



        state.currentYearSummary = action.payload.currentYearSummary;



        state.currentYearAverage = action.payload.currentYearAverage;



      })



      .addCase(fetchFinancialSummary.rejected, (state, action) => {



        state.loading = false;



        state.error = action.payload;



        state.financialSummary = null;



        state.monthlySummary = [];



        state.previousYearSummary = null;



        state.currentYearSummary = null;



        state.currentYearAverage = null;



      });



  },



});









export const { resetIncomeStatus, resetExpenseStatus, resetDonorStatus } = accountSlice.actions;

export default accountSlice.reducer;
