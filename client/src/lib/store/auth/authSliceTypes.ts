import { Status } from "../../types/types"


export interface ILoginData{
  email : string, 
  password : string
}

export interface IRegisterData extends ILoginData{
  username : string
}
export interface IUserData {
  token : string, 
  username : string
}


export interface IauthInitalData{
  user : IUserData,
  status : Status
}