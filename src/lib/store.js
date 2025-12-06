import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './features/students/studentSlice';
import accountReducer from './features/accounts/accountSlice'; // Import accountReducer
import settingsReducer from './features/settings/settingsSlice'; // Import settingsReducer

export const store = configureStore({
  reducer: {
    students: studentReducer,
    accounts: accountReducer, // Add accountReducer
    settings: settingsReducer, // Add settingsReducer
  },
});
