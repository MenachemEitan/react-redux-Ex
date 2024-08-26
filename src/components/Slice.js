import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const micSlice = createSlice({
  name: 'micSatus',
  initialState,
  reducers: {
    micOn: (state) => {

      state.value = true
    },
    micOff: (state) => {
      state.value = false
    },
    
  },
})

export const { micOn, micOff } = micSlice.actions

export default micSlice.reducer