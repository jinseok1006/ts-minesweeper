import { createSlice } from '@reduxjs/toolkit';

const flagModeSlice = createSlice({
  name: 'flagMode',
  initialState: false,
  reducers: {
    toggle: (state) => {
      return !state;
    },
  },
});

export default flagModeSlice;
