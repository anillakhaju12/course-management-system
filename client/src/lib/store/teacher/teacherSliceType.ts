import { Status } from "../../types/types"


export interface ITeacher {
  teacherEmail : string,
  teacherPassword : string,
  teacherInstituteNumber : string
}

export interface ITeacherInitialData {
  teacher : ITeacher,
  status : Status
}