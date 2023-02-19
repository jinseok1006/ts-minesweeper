import { createSlice } from '@reduxjs/toolkit';

const debugSlice = createSlice({
  name: 'debug',
  initialState: false,
  reducers: {
    toggle: (state) => {
      return !state;
    },
  },
});
export default debugSlice;
