// features/user/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from 'moment';

// Initial state
const initialState: {
  dateStart: string;
  dateEnd: string;
} = {
  dateStart: moment().startOf('month').format('YYYY-MM-DD'),
  dateEnd: moment().endOf('month').format('YYYY-MM-DD'),
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate: (
      state,
      action: PayloadAction<{ dateStart: string; dateEnd: string }>
    ) => {
      state.dateStart = action.payload.dateStart;
      state.dateEnd = action.payload.dateEnd;
    },
  },
});

// Export actions
export const { setDate } = dateSlice.actions;

// Export reducer
export default dateSlice.reducer;
