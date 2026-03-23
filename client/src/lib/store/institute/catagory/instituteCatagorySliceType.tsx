import { Status } from "@/src/lib/types/types"

export interface IInstituteUserProvideCatagoryData{
  catagoryName : string,
  catagoryDescription : string
}

export interface IInstituteCatagoryData extends IInstituteUserProvideCatagoryData{
  id : string,
  
}

export interface IInstituteCatagoryInitialData{
  catagories : IInstituteCatagoryData[],
  status : Status
}