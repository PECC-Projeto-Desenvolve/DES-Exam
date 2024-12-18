import { configureStore } from '@reduxjs/toolkit';
import examSlice from './slices/examSlice'; // Importe o slice diretamente

export const store = configureStore({
  reducer: {
    exam: examSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
