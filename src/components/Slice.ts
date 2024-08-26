// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   value: false,
// }

// export const micSlice = createSlice({
//   name: 'micSatus',
//   initialState,
//   reducers: {
//     micOn: (state) => {

//       state.value = true
//     },
//     micOff: (state) => {
//       state.value = false
//     },
    
//   },
// })

// export const { micOn, micOff } = micSlice.actions

// export default micSlice.reducer


// TS

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MicState {
  value: boolean;
}

const initialState: MicState = {
  value: false,
};

export const micSlice = createSlice({
  name: 'micStatus',
  initialState,
  reducers: {
    micOn: (state) => {
      state.value = true;
    },
    micOff: (state) => {
      state.value = false;
    },
  },
});

export const { micOn, micOff } = micSlice.actions;

export default micSlice.reducer;
