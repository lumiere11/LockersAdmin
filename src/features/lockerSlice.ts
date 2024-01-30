// features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial state
const initialState: {number: number, total: number} = {
    number: 0,
    total: 0
};

const lockerSlice = createSlice({
    name: 'locker',
    initialState,
    reducers: {
        setLocker: (state, action: PayloadAction<{ number: number; total: number }>) => {
            state.number = action.payload.number;
            state.total = action.payload.total
        },
    },
});

// Export actions
export const { setLocker } = lockerSlice.actions;

// Export reducer
export default lockerSlice.reducer;
