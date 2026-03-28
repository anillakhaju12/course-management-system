import { Status } from "../../types/types"


export interface ITeacher {
  teacherEmail : string,
  teacherPassword : string,
  teacherInstituteNumber : string
}

export interface ITeacherInitialData {
  teacher : ITeacher[],
  status : Status
}

export interface IteacherInputData extends ITeacher{
  id : string,
  teacherName : string,
  teacherExperties : string,
  joinDate : Date,
  salary : string,
  teacherPhoto : File | null
}