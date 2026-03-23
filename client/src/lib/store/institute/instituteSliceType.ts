import { Status } from "../../types/types"


export interface IInstituteData  {
  instituteName : string, 
  instituteEmail : string, 
  institutePhoneNumber : string, 
  instituteAddress : string,
  institutePanNumber ?: string,
  instituteVatNumber ?: string
  
}

export interface IInstituteInitialData {
  institute : IInstituteData,
  status : Status
}