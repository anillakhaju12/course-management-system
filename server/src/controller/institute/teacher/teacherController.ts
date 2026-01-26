import type { Response } from "express";
import type { ExtendRequest } from "../../../middleware/extendRequest.js";
import sequelize from "../../../database/connection.js";
import { QueryTypes } from "sequelize";
import randomPasswordGenerator from "../../../service/randomPasswordGenerator.js";
import sendMail from "../../../service/sendMailConfig.js";


class TeacherController{

  async createTeacher(req:ExtendRequest, res: Response){
    const instituteNumber = req.userData?.instituteNumber
    const {teacherName, teacherEmail, teacherAddress, teacherExperties, teacherJoinedDate, teacherSalary, courseId} = req.body
    const  teacherPhoto  = req.file?.path ?? `https://www.vecteezy.com/free-vector/anonymous-profile`

    if(!teacherName || !teacherEmail || !teacherAddress || !teacherExperties || !teacherJoinedDate || !teacherSalary){
      return res.status(400).json({
        "message" : "please provide teacherName, teacherEmail, teacherAddress, teacherExperties, teacherJoinedDate, teacherSalary"
      })
    }

    const {hashedVersion, plainVersion} = randomPasswordGenerator(teacherName)

    await sequelize.query(`INSERT INTO teacher_${instituteNumber}(
      teacherName, teacherEmail, teacherAddress, teacherExperties, joinDate, salary, teacherPhoto, teacherPassword) VALUES (?,?,?,?,?,?,?)`,{
        type : QueryTypes.INSERT,
        replacements : [teacherName, teacherEmail, teacherAddress, teacherExperties, teacherJoinedDate, teacherSalary, teacherPhoto, hashedVersion]
      })

      const teacherId : {id : string}[]  = await sequelize.query(`SELECT teacherId FROM teacher_${instituteNumber} WHERE teacherEmail = ?`,{
        type : QueryTypes.SELECT,
        replacements : [teacherEmail]
      })

      // send mail to the teacher with email/password
      const mailInfo = {
        to : teacherEmail,
        subject : 'Welcome to our platform',
        text : `your Email : ${teacherEmail} and password : ${plainVersion}`
      }

      sendMail(mailInfo)

      await sequelize.query(`UPDATE course_${instituteNumber} SET teacherId = ? WHERE courseId = ?`,{
        type: QueryTypes.UPDATE,
        replacements : [teacherId[0]?.id, courseId]
      })
      res.status(200).json({
        "message" : "Teacher Created Successfully"
      })

  }

  async getTeacher(req : ExtendRequest, res : Response){
    const instituteNumber = req.userData?.instituteNumber

    const allTeacher = await sequelize.query(`SELECT * FROM teacher_${instituteNumber}`,{
      type : QueryTypes.SELECT
    })
    res.status(200).json({
      "message" : "Teacher Data Fetched Successfully",
      "data" : allTeacher
    })
  }

  async deleteTeacher(req : ExtendRequest, res : Response){
    const instituteNumber = req.userData?.instituteNumber;
    const {id} = req.params

    await sequelize.query(`DELETE FROM teacher_${instituteNumber} WHERE id = ?`,{
      type : QueryTypes.DELETE,
      replacements : [id]
    })

  }

}

export default new TeacherController()