import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInstituteData, IInstituteInitialData } from "./instituteSliceType";
import { Status } from "../../types/types";


const instituteInitialData : IInstituteInitialData = {
  institute : {instituteName : "", instituteEmail: "", institutePhoneNumber :"", instituteAddress : ""},
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
export {setInstitute, setStatus}