import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInstituteTeacherData, IInstituteTeacherInitialData, teacherExpertiseLevel } from "./instituteTeacherSliceType";
import { Status } from "@/src/lib/types/types";
import { AppDispatch } from "../../store";
import APIWithToken from "../../http/APIWITHTOKEN";


const instituteTeacherInitialData : IInstituteTeacherInitialData= {
  instituteTeacher : {
    teacherEmail : "",
    teacherName : "",
    teacherAddress : "",
    teacherExpertise : teacherExpertiseLevel.INTERMEDIATE,
    teacherJoinedDate : "",
    teacherSalary : "",
    teacherPhoto : null,
    courseId : ""
  },
  status : Status.LOADING
} 

const instituteTeacherSlice = createSlice({
  name : "instituteTeacherSlice",
  initialState : instituteTeacherInitialData,
  reducers : {
    setInstituteTeacher(state : IInstituteTeacherInitialData, action : PayloadAction<IInstituteTeacherData>){
      state.instituteTeacher = action.payload
    },
    setStatus(state : IInstituteTeacherInitialData, action : PayloadAction<Status>){
      state.status = action.payload
    }

  }
})

const { setInstituteTeacher, setStatus} = instituteTeacherSlice.actions

export default instituteTeacherSlice.reducer

export function createInstituteTeacher(data : IInstituteTeacherData){
  return async function createInstituteTeacherThunk(dispatch : AppDispatch){
    try{
      const response = await APIWithToken.post("/institute/teacher", data)
      if(response.status === 201){
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

export function fetchInstituteTeacher(){
  return async function fetchInstituteTeacherThunk(dispatch : AppDispatch){
    try{
      const response = await APIWithToken.get("/institute/teacher")
      if(response.status === 200){
        dispatch(setStatus(Status.SUCCESS))
        response.data.data.length > 0 && dispatch(setInstituteTeacher(response.data.data))
      }else{
        dispatch(setStatus(Status.ERROR))
      }
    }catch(err){
      console.log(err)
      dispatch(setStatus(Status.ERROR))
    }
  }
}

export function deleteInstituteTeacher(id : string){
  return async function deleteInstituteTeacherThunk(dispatch : AppDispatch){
    try{
      const response = await APIWithToken.delete("/institute/teacher/" + id)
      if(response.status === 200){
        dispatch(setStatus(Status.SUCCESS))
        //popout the data from the slice after deleting
      }else{
        dispatch(setStatus(Status.ERROR))
      }
    }catch(err){
      console.log(err)
      dispatch(setStatus(Status.ERROR))
    }
  }
}