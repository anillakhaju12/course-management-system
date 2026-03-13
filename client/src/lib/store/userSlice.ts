
//demo of state Management
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDemonInitialState } from "./types";



const demoInitialState: IDemonInitialState = {
  username : "",
  address : ""
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