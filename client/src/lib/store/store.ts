import { configureStore } from "@reduxjs/toolkit";
import teacherSlice from "./teacher/teacherSlice"
import instituteSlice from "./institute/instituteSlice"
import authSlice from "./auth/authSlice"
const store = configureStore({
  reducer : {
    auth : authSlice,
    teacher : teacherSlice, 
    institute : instituteSlice

  }
})

export default store

export type AppDispatch = typeof store.dispatch
export type  RootState = ReturnType<typeof store.getState>