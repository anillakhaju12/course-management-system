import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IauthInitalData, IUserData } from "./authSliceTypes";
import { Status } from "../../types/types";

const authInitialState: IauthInitalData = {
  user : {
    username :"",
    password : ""
  },
  status : Status.LOADING
}

const authSlice = createSlice({
  name : "auth",
  initialState : authInitialState,
  reducers : {
    setUser(state : IauthInitalData, action : PayloadAction<IUserData>){
      state.user = action.payload
    },
    setStatus(state : IauthInitalData, action : PayloadAction<Status>){
      state.status = action.payload
    }
  }
})

const {setUser, setStatus} = authSlice.actions
export default authSlice.reducer
export { setUser, setStatus}