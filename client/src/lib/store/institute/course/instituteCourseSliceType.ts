import { Status } from "@/src/lib/types/types"


export enum courseDifficultLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCE = "advance"
  
}

export interface IInstituteCourseInputData{
  courseName : string, 
  coursePrice : string, 
  courseDuration : string, 
  courseLevel : courseDifficultLevel, 
  courseDescription : string, 
  catagoryId : string
  courseThumbnail : File | null

}

export interface IInstituteCourseData extends IInstituteCourseInputData{
  courseId : string,

}

export interface IInstituteCourseInitialData{
  instituteCourses : IInstituteCourseData[],
  status : Status
}