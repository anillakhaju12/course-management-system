
//demo of state Management
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDemonInitialState } from "./types";
import API from "./http/axiosInstanceCreation";



const demoInitialState: IDemonInitialState = {
  username : "Nobody ",
  address : "Somewhere"
}

const userSlice = createSlice({
  name: "",
  initialState: demoInitialState,
  reducers: {
    setUserName(state: IDemonInitialState, action : PayloadAction<string>){
      state.username = action.payload
    },
    setAddress(state: IDemonInitialState, action : PayloadAction<string>){
      state.address = action.payload
    }
  }
})

const {setUserName, setAddress} = userSlice.actions

export {setUserName, setAddress}
export default userSlice.reducer



function registerUser(data:{}){
  return async function registerUserThunk(){
    try{
      const response = await API.post('user/register',data)
      if(response.status === 200){
        //code
      }
      else{
        // code
      }
    }catch(err){
      console.log(err)
    }
  }
}

function loginUser(){
  return async function loginUserThunk(){
    try{
      const response = await API.post('user/login')
      if(response.status === 200){
        
      }
      else{
  
      }
    }catch(err){
      console.log(err)
    }
  }
}