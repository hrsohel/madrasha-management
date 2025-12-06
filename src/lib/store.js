import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './features/students/studentSlice';
import accountReducer from './features/accounts/accountSlice'; // Import accountReducer

export const store = configureStore({
  reducer: {
    students: studentReducer,
    accounts: accountReducer, // Add accountReducer
  },
});
