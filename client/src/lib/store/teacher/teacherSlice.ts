import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITeacher, ITeacherInitialData } from "./teacherSliceType";
import { Status } from "../../types/types";

const teacherInitialData : ITeacherInitialData = {
  teacher : {teacherEmail : "", teacherPassword : "", teacherInstituteNumber : ""},
  status : Status.LOADING
}

const teacherSlice = createSlice({
  name : "teacher",
  initialState : teacherInitialData, 
  reducers :{
    setTeacher(state : ITeacherInitialData, action : PayloadAction<ITeacher>){
      state.teacher = action.payload
    },
    setStatus(state : ITeacherInitialData, action : PayloadAction<Status>){
      state.status = action.payload
    }
    
  }
})

export const {setTeacher, setStatus} = teacherSlice.actions
export default teacherSlice.reducer