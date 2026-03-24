import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInstituteCatagoryData, IInstituteCatagoryInitialData, IInstituteUserProvideCatagoryData } from "./instituteCatagorySliceType";
import { Status } from "@/src/lib/types/types";
import { AppDispatch } from "../../store";
import APIWithToken from "../../http/APIWITHTOKEN";


const catagoryInitialState : IInstituteCatagoryInitialData = {
  catagories : [{
    id : "",
    catagoryName : "",
    catagoryDescription : ""
  }],
  status : Status.LOADING
}

const instituteCatagorySlice = createSlice({
  name : "instituteCatagorySlice",
  initialState : catagoryInitialState,
  reducers : {
    setCatagory(state : IInstituteCatagoryInitialData, action : PayloadAction<IInstituteCatagoryData[]>){
      state.catagories = action.payload
    },
    setStatus(state : IInstituteCatagoryInitialData, action : PayloadAction<Status>){
      state.status = action.payload
    },
    setDeleteCatagory(state: IInstituteCatagoryInitialData, action : PayloadAction<string>){

    },
    setAddCatagory(state: IInstituteCatagoryInitialData, action : PayloadAction<IInstituteCatagoryData>){
      
    }
    
  }
})

const {setCatagory, setStatus,setDeleteCatagory,} = instituteCatagorySlice.actions
export default instituteCatagorySlice.reducer

export function createCatagory(data : IInstituteUserProvideCatagoryData){
  return async function createCatagoryThunk(dispatch : AppDispatch){
    try{
      const response = await APIWithToken.post("/institute/catagory",data)
      if(response.status == 201){
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

export function fetchCatagory(){
  return async function fetchCatagoryThunk(dispatch : AppDispatch){
    try{
      const response = await APIWithToken.get("/institute/catagory")
      if(response.status == 200){
        dispatch(setStatus(Status.SUCCESS))
        response.data.data.length > 0 && dispatch(setCatagory(response.data.data))
        
      }else{
        dispatch(setStatus(Status.ERROR))
      }
    }catch(err){
      console.log(err)
       dispatch(setStatus(Status.ERROR))
    }
  }
}
export function deleteCatagory(id: string){
  return async function deleteCatagoryThunk(dispatch : AppDispatch){
    try{
      const response = await APIWithToken.delete("/intitute/catagory"+id)
      if(response.status == 200){
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