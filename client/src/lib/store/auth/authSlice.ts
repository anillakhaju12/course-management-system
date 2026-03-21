import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IauthInitalData, ILoginData, IRegisterData, IUserData } from "./authSliceTypes";
import { Status } from "../../types/types";
import API from "../http/axiosInstanceCreation";
import { AppDispatch } from "../store";

const authInitialState: IauthInitalData = {
  user : {
    token :"",
    username : ""
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

export function registerUser(data : IRegisterData){
  return async function registerUserThunk(dispatch : AppDispatch){
    try{
      const response = await API.post("/auth/register", data)
      if(response.status === 201){
        dispatch(setStatus(Status.SUCCESS))
      }else{
        dispatch(setStatus(Status.ERROR))
      }
    }catch(err ){
      console.log(err)
      dispatch(setStatus(Status.ERROR))
    }   
  }
}

export function loginUser(data : ILoginData){
  return async function loginUserThunk(dispatch : AppDispatch){
    try{
      const response = await API.post("/auth/login", data)
      if(response.status === 200){
        dispatch(setUser(response.data.data))
        dispatch(setStatus(Status.SUCCESS))
        localStorage.setItem("token", response.data.data.token)
      }else{
        dispatch(setStatus(Status.ERROR))
      }
    }catch(err ){
      console.log(err)
      dispatch(setStatus(Status.ERROR))
    }
  }
}