import { Status } from "../../types/types"


export interface ITeacher {
  teacherEmail : "", teacherPassword : "", teacherInstituteNumber : ""
}

export interface ITeacherInitialData {
  teacher : ITeacher,
  status : Status
}