import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './features/students/studentSlice';
import accountReducer from './features/accounts/accountSlice'; // Import accountReducer
import settingsReducer from './features/settings/settingsSlice'; // Import settingsReducer
import guardianReducer from './features/guardians/guardianSlice'; // Import guardianReducer
import authReducer from './features/auth/authSlice'; // Import authReducer

export const store = configureStore({
  reducer: {
    students: studentReducer,
    accounts: accountReducer, // Add accountReducer
    settings: settingsReducer, // Add settingsReducer
    guardians: guardianReducer, // Add guardianReducer
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [
          'students.studentFormData.student.profileImage',
          /^students\.students\.\d+\.profileImage$/
        ],
        // Ignore these paths in the action
        ignoredActionPaths: ['payload.student.profileImage', 'meta.arg.student.profileImage', 'meta.arg.data.profileImage', 'payload.profileImage', 'meta.arg.logo', 'payload.logo'],
      },
    }),
});
