import type { Request, Response } from "express";
import sequelize from "../../database/connection.js";
import { QueryTypes } from "sequelize";
import bcrypt from 'bcrypt'
import generateJWTToken from "../../service/generateJWTToken.js";

interface IteacherData{
  id : string,
  teacherPassword : string
}

async function teacherLogin(req : Request, res : Response){
  const {teacherEmail, teacherPassword, teacherInstituteNumber} = req.body
  if(!teacherEmail || !teacherPassword || !teacherInstituteNumber){
    return res.status(400).json({
      "message" : "Provide teacherEmail, teacherPassword, teacherInstituteNumber"
    })
  }

  const teacherData : IteacherData[] = await sequelize.query(`SELECT * FROM teacher_${teacherInstituteNumber} WHERE teacherEmail = ?`,{type : QueryTypes.SELECT, replacements : [teacherEmail]})

  const [teacher] = teacherData

  if(!teacher){
    return res.status(401).json({"message" : "Invalid Email"})
  }
  
 const isPassword = await bcrypt.compare(teacherPassword, teacher.teacherPassword)

 if(!isPassword){
  return res.status(401).json({ message: "Invalid password" })
  }
  const token = generateJWTToken({id : teacher.id, instituteNumber : teacherInstituteNumber})
  return res.status(200).json({
    message: "teacher login successful",
    token
  })
} 

export {teacherLogin}