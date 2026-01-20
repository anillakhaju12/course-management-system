import type { Response } from "express";
import type { ExtendRequest } from "../../../middleware/extendRequest.js";
import sequelize from "../../../database/connection.js";


const createCourse = async (req : ExtendRequest, res : Response)=>{
  const {courseName, coursePrice, courseDuration, courseLevel, courseDescription} = req.body
  const instituteNumber = req.userData?.instituteNumber

  if(!courseName || !coursePrice || !courseDuration || !courseLevel || !courseDescription){
    return res.status(401).json({
      "message" : "Please send courseName, coursePrice, courseDuration, courseLevel, courseDescription"
    })
  }
  
  await sequelize.query(`INSERT INTO course_${instituteNumber}(
    courseName, coursePrice, courseDuration, courseLevel, courseDescription) VALUES (?,?,?,?,?)`, {
      replacements: [courseName, coursePrice, courseDuration, courseLevel, courseDescription]
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
  const course =  await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id = ${id}`).catch(err => {
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
  await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id = ${id}`).catch(err => {
    console.log(err) 
    res.status(500).json({"message" : "Error while delete course"})   
  })

  res.status(200).json({
    'message' : 'course deleted successful',
  })
}

const getAllCourse = async(req: ExtendRequest, res : Response)=>{
  const instituteNumber = req.userData?.instituteNumber
  const courses = await sequelize.query(`SELECT * FROM course_${instituteNumber}`) // this will return both array and meta data so you can also do destructure or set that value in variable like above
  if(courses[0].length === null){
    return res.status(300).json({
      "message" : "Course not not added yet"
    })
  }
  return res.status(200).json({
    "message" : "all the course list",
    "data" : courses
  })
  }


export {createCourse, getSingleCourse, deleteCourse, getAllCourse}