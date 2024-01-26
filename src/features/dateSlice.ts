// features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial state
const initialState: {
    month: number
} = {
    month: new Date().getMonth() + 1
};

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setDate: (state, action: PayloadAction<{ month: number; }>) => {
            state.month = action.payload.month;
        },
    },
});

// Export actions
export const { setDate } = dateSlice.actions;

// Export reducer
export default dateSlice.reducer;
