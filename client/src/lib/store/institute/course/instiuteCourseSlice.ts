import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courseDifficultLevel, IInstituteCourseData, IInstituteCourseInitialData, IInstituteCourseInputData } from "./instituteCourseSliceType";
import { Status } from "@/src/lib/types/types";
import { AppDispatch } from "../../store";
import APIWithToken from "../../http/APIWITHTOKEN";

const instituteCourseInitialData : IInstituteCourseInitialData =  {
  instituteCourses : [{
    courseId : "",
    courseName : "",
    courseDescription : "",
    coursePrice : "",
    courseDuration : "",
    courseLevel : courseDifficultLevel.BEGINNER,
    catagoryId : "",
    courseThumbnail : null
  }],
  status : Status.LOADING

}
const instituteCourseSlice = createSlice({
  name: "instituteCourseSlice",
  initialState : instituteCourseInitialData,
  reducers : {
    setInstituteCourse(state : IInstituteCourseInitialData, action: PayloadAction<[]>){
      state.instituteCourses = action.payload
    },
    setStatus(state : IInstituteCourseInitialData, action: PayloadAction<Status>){
      state.status = action.payload
    },
    setDeleteCourse(state : IInstituteCourseInitialData, action : PayloadAction<string>){
      const id = action.payload
      const index = state.instituteCourses.findIndex(course => course.courseName = action.payload)
      state.instituteCourses.splice(index, 1)
    }
  }
})

const {setInstituteCourse, setStatus,setDeleteCourse} = instituteCourseSlice.actions

export default instituteCourseSlice.reducer

export function createInstituteCourse(data : IInstituteCourseInputData){
  return async function createInstituteCourseThunk(dispatch : AppDispatch){
    try{ 
      const response = await APIWithToken.post("/institute/course", data,{
        headers : {
          "Content-Type" : "multipart/form-data"
        }
      })
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

export function fetchAllInstituteCourse(){
  return async function fetchAllInstituteCourseThunk(dispatch : AppDispatch){
    try{ 
      const response = await APIWithToken.get("/institute/course")
      if(response.status === 200){
        dispatch(setStatus(Status.SUCCESS))
        response.data.data.length > 0 && dispatch(setInstituteCourse(response.data.data))
      }else{
        dispatch(setStatus(Status.ERROR))
      }

    }catch(err){
      console.log(err)
      dispatch(setStatus(Status.ERROR))
    }
  }
}

export function fetchSingleInstituteCourse(id : string){
  return async function fetchSingleInstituteCourseThunk(dispatch : AppDispatch){
    try{ 
      const response = await APIWithToken.get("/institute/course" + id)
      if(response.status === 200){
        dispatch(setStatus(Status.SUCCESS))
        response.data.data.length > 0 && dispatch(setInstituteCourse(response.data.data))
      }else{
        dispatch(setStatus(Status.ERROR))
      }

    }catch(err){
      console.log(err)
      dispatch(setStatus(Status.ERROR))
    }
  }
}
export function deleteInstituteCourse(id : string){
  return async function deleteInstituteCourseThunk(dispatch : AppDispatch){
    try{ 
      const response = await APIWithToken.delete("/institute/course" + id)
      if(response.status === 200){
        dispatch(setStatus(Status.SUCCESS))
        dispatch(setDeleteCourse(id))
      }else{
        dispatch(setStatus(Status.ERROR))
      }

    }catch(err){
      console.log(err)
      dispatch(setStatus(Status.ERROR))
    }
  }
}
