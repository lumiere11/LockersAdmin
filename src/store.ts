// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import lockerReducer from './features/lockerSlice';
import dateReducer from './features/dateSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    locker: lockerReducer,
    date: dateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
