// features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial state
const initialState: {uid: string | null, name: string | null, loading: boolean} = {
  uid: '',
  name: '',
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ uid: string; name: string }>) => {
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Export actions
export const { setUser, setLoading } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
