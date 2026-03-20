import { Status } from "@/src/lib/types/types"

export enum teacherExpertiseLevel{
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  PRO = "pro"

} 
export interface IInstituteTeacherData{
    teacherName : string, 
    teacherEmail: string, 
    teacherAddress : string, 
    teacherExpertise : teacherExpertiseLevel,
    teacherJoinedDate : string, 
    teacherSalary : string, 
    courseId : string
    teacherPhoto : string | null
}

export interface IInstituteTeacherInitialData{
  instituteTeacher : IInstituteTeacherData
  status : Status
}