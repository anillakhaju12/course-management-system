import type { Response } from "express";
import type { ExtendRequest } from "../../../middleware/extendRequest.js";
import sequelize from "../../../database/connection.js";
import { QueryTypes } from "sequelize";


const createCourse = async (req : ExtendRequest, res : Response)=>{
  const {courseName, coursePrice, courseDuration, courseLevel, courseDescription, catagoryId} = req.body
  const instituteNumber = req.userData?.instituteNumber
  const courseThumbnail = req.file?.path
  console.log(req.file)

  if(!courseName || !coursePrice || !courseDuration || !courseLevel || !courseDescription || !catagoryId){
    return res.status(401).json({
      "message" : "Please send courseName, coursePrice, courseDuration, courseLevel, courseDescription, catagoryId"
    })
  }
  console.log(instituteNumber)
  
  await sequelize.query(`INSERT INTO course_${instituteNumber}(
    courseName, coursePrice, courseDuration, courseLevel, courseDescription, courseThumbnail, catagoryId) VALUES (?,?,?,?,?,?)`, {
      type: QueryTypes.INSERT,
      replacements: [courseName, coursePrice, courseDuration, courseLevel, courseDescription, courseThumbnail,catagoryId]
    }).then(()=>{
      res.status(200).json({
        "message" : "Course added successfully"
      })
    }).catch(err=>{
      console.log(err)
      res.status(500).json({
        "message" : "something went wrong!! Please try again"
      })
    })
}

const getSingleCourse = async(req : ExtendRequest, res : Response)=>{
  const instituteNumber = req.userData?.instituteNumber
  const id = req.params.id
  const course =  await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id = ${id}`,{
    type : QueryTypes.SELECT
  }).catch(err => {
    console.log(err) 
    res.status(500).json({"message" : "Error while fetching single course"})   
  })

  res.status(200).json({
    'message' : 'successful',
    'data' : course
  })
}

const deleteCourse = async(req : ExtendRequest, res : Response)=>{
  const instituteNumber = req.userData?.instituteNumber
  const id = req.params.id
  await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id = ${id}`,{type: QueryTypes.DELETE}).catch(err => {
    console.log(err) 
    res.status(500).json({"message" : "Error while delete course"})   
  })

  res.status(200).json({
    'message' : 'course deleted successful',
  })
}

const getAllCourse = async(req: ExtendRequest, res : Response)=>{
  const instituteNumber = req.userData?.instituteNumber
  const courses = await sequelize.query(`SELECT * FROM course_${instituteNumber} JOIN catagory_${instituteNumber} ON course_${instituteNumber}.catagoryId = catagory_${instituteNumber}.id`,{type : QueryTypes.SELECT}) 

  return res.status(200).json({
    "message" : "all the course list",
    "data" : courses
  })
  }


export {createCourse, getSingleCourse, deleteCourse, getAllCourse}