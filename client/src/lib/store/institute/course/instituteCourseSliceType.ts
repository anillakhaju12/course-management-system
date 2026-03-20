import { Status } from "@/src/lib/types/types"


export enum courseDifficultLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCE = "advance"
  
}

export interface IInstituteCourseData{
  courseName : string, 
  coursePrice : string, 
  courseDuration : string, 
  courseLevel : courseDifficultLevel, 
  courseDescription : string, 
  catagoryId : string

}

export interface IInstituteCourseInitialData{
  instituteCourses : IInstituteCourseData[],
  status : Status
}