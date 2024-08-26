
import { configureStore } from '@reduxjs/toolkit'
import micSliceReduser from '../components/Slice'

export const store = configureStore({
  reducer: {
    switch: micSliceReduser,
  },
})