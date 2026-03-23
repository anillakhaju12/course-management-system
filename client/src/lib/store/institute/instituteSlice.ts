import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInstituteData, IInstituteInitialData } from "./instituteSliceType";
import { Status } from "../../types/types";
import { AppDispatch } from "../store";
import APIWithToken from "../http/APIWITHTOKEN";


const instituteInitialData : IInstituteInitialData = {
  institute : {
    instituteName : "", 
    instituteEmail: "", 
    institutePhoneNumber :"", 
    instituteAddress : "",
    institutePanNumber : "",
    instituteVatNumber : ""
  },
  status : Status.LOADING
}

const instituteSlice = createSlice({
  name : "institute",
  initialState : instituteInitialData,
  reducers : {
    setInstitute(state : IInstituteInitialData, action : PayloadAction<IInstituteData>){
      state.institute = action.payload
    },
    setStatus ( state : IInstituteInitialData, action : PayloadAction<Status>){
      state.status = action.payload
    }

  }
})

const { setInstitute, setStatus} = instituteSlice.actions
export default instituteSlice.reducer


export function  createInstitute(data : IInstituteData){
  return async function createInstituteThunk(dispatch : AppDispatch){
    try{
      const response = await APIWithToken.post("/institute",data)
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