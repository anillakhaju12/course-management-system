import { Status } from "../../types/types"

export interface IUserData {
  email : string, 
  password : string
}

export interface IRegisterData extends IUserData{
  username : string
}

export interface IauthInitalData{
  user : IUserData,
  status : Status
}