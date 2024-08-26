
// import { configureStore } from '@reduxjs/toolkit'
// import micSliceReduser from '../components/Slice'

// export const store = configureStore({
//   reducer: {
//     switch: micSliceReduser,
//   },
// })


// TS
import { configureStore } from '@reduxjs/toolkit';
import micSliceReducer from '../components/Slice.ts';

export const store = configureStore({
  reducer: {
    switch: micSliceReducer,
  },
});

// Define RootState and AppDispatch types based on the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
