// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import lockerReducer from './features/lockerSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    locker: lockerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
