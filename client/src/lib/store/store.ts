import { configureStore } from "@reduxjs/toolkit";
import demoSlice from "./userSlice"
const store = configureStore({
  reducer : {
    demoSlice : demoSlice
  }
})

export default store

export type AppDispatch = typeof store.dispatch
export type  RootState = ReturnType<typeof store.getState>