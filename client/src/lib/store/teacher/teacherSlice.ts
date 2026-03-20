import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITeacher, ITeacherInitialData } from "./teacherSliceType";
import { Status } from "../../types/types";
import API from "../http/axiosInstanceCreation";
import { AppDispatch } from "../store";

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

export function teacherLogin(data : ITeacher){
  return async function teacherLoginThunk(dispatch : AppDispatch){
    try{
      const response = await API.post("/teacher/login", data)
      if(response.status === 200){
        dispatch(setStatus(Status.SUCCESS))
      }else{
        dispatch(setStatus(Status.ERROR))
      }
    }catch(err){
      console.log(err)
      dispatch(setStatus(Status.ERROR))
    }
    }

}