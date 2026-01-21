import type { NextFunction, Response } from "express";
import sequelize from "../../database/connection.js";
import instituteRandomNumberGenerator from "../../service/instituteRandomNumberGenerator.js";
import type { ExtendRequest } from "../../middleware/extendRequest.js";
import User from "../../database/models/userModel.js";
import { catagorySeed } from "../../seed.js";



class InstituteController{
  async createInstituteTable(req: ExtendRequest ,res: Response, next: NextFunction){
    try{
      const {instituteName, instituteEmail, institutePhoneNumber, instituteAddress} = req.body
      const {institutePanNumber = null, instituteVatNumber = null} = req.body
      const instituteRandomNumber = instituteRandomNumberGenerator() 

      if(!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress){
        return res.status(400).json({
          "message" : "please send instituteName, instituteEmail, institutePhoneNumber and instituteAddress"
        })
      }
      await sequelize.query(`CREATE TABLE institute_${instituteRandomNumber} ( 
        id VARCHAR(31) PRIMARY KEY DEFAULT (UUID()),
        instituteName VARCHAR(255) NOT NULL, 
        instituteEmail VARCHAR(255) NOT NULL UNIQUE, 
        institutePhoneNumber VARCHAR(255) NOT NULL, 
        instituteAddress VARCHAR(255) NOT NULL,
        institutePanNumber VARCHAR(255),
        instituteVatNumber VARCHAR(255),
        createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`)
      
      await sequelize.query(`INSERT INTO institute_${instituteRandomNumber}(
        instituteName, instituteEmail, institutePhoneNumber, instituteAddress, institutePanNumber, instituteVatNumber) VALUES (?,?,?,?,?,?)`, {
          replacements: [instituteName, instituteEmail, institutePhoneNumber, instituteAddress, institutePanNumber, instituteVatNumber]
        })

        //stote the instituteNumber which user is currently at in it's User Table
      if(req.userData){
        await User.update({currentInstituteNumber : instituteRandomNumber},{where : {id : req.userData.id}})

        // update request memory for next middleware
        req.userData.instituteNumber = instituteRandomNumber

      }

        //creating table to store the which user has how many institutes 
      await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
        id VARCHAR(31) PRIMARY KEY DEFAULT (UUID()),
        userId VARCHAR(255) REFERENCES users(id),
        instituteNumber INT  NOT NULL
        )`) 

        await sequelize.query(`INSERT INTO  user_institute(userId, instituteNumber) VALUES (?,?)`,{
          replacements : [req.userData?.id, instituteRandomNumber]
        })

      next()

    }catch(err){
      console.log(err)
      res.status(500).json({
        "message" : "try again"
      })
    }
  }

  async createTeacherTable(req : ExtendRequest, res: Response, next : NextFunction){
    try{
      const instituteNumber = req.userData?.instituteNumber
      await sequelize.query(`CREATE TABLE teacher_${instituteNumber}(
        id VARCHAR(31) PRIMARY KEY DEFAULT (UUID()),
        teacherEmail VARCHAR(255) UNIQUE  NOT NULL,
        teacherName VARCHAR(255)  NOT NULL,
        teacherAddress VARCHAR(255)  NOT NULL,
        teacherExperties VARCHAR(255) NOT NULL ,
        joinDate DATE  NOT NULL,
        salary VARCHAR(255)  NOT NULL,
        createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`)
  
      next()
    }catch(err){
      console.log("Error ",err)
      res.status(500).json({
        "message" : "Something went error in teacher table",
        "error" : err
      })
    }
  }

  async createStudentTable(req:ExtendRequest, res : Response, next : NextFunction){
    try{
      const instituteNumber = req.userData?.instituteNumber
      await sequelize.query(`CREATE TABLE student_${instituteNumber}(
        id VARCHAR(31) PRIMARY KEY DEFAULT (UUID()),
        studentEmail VARCHAR(255) UNIQUE NOT NULL,
        studentName VARCHAR(255) NOT NULL,
        studentJoinDate DATE NOT NULL,
        studentAddress TEXT NOT NULL,
        studentImage VARCHAR(255),
        createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`)
      next()
    }catch(err){
      console.log("Error ",err)
      res.status(500).json({
        "message" : "Something went error in student table",
        "error" : err
      })
    }
  }
  async createCourseTable(req:ExtendRequest, res : Response){
    const instituteNumber = req.userData?.instituteNumber
    await sequelize.query(`CREATE TABLE course_${instituteNumber}(
        id VARCHAR(31) PRIMARY KEY DEFAULT (UUID()),
      courseName VARCHAR(255) UNIQUE NOT NULL,
      coursePrice VARCHAR(255) NOT NULL,
      courseDuration VARCHAR(255) NOT NULL,
      courseThumbnail VARCHAR(255),
      courseDescription VARCHAR(255) NOT NULL,
      catagoryId VARCHAR(31) NOT NULL REFERENCES catagory_${instituteNumber} (id),
      courseLevel ENUM('beginner', 'intermediate','advance') NOT NULL,
      createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`)
    res.status(200).json({
      "message" : "institute created successfully"
    })
  }
  async createCatagoryTable(req: ExtendRequest, res:Response, next : NextFunction){
    const instituteNumber = req.userData?.instituteNumber
    
    await sequelize.query(`CREATE TABLE IF NOT EXIST catagory_${instituteNumber}(
      id VARCHAR(31) PRIMARY KEY DEFAULT (UUID()),
      catagoryName VARCHAR(255) NOT NULL,
      catagoryDescription VARCHAR(255) NOT NULL,
      createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
      )`)
      next()
    catagorySeed.forEach(async (catagory)=>{
      await sequelize.query(`INSERT INTO catagory_${instituteNumber}(
        catagoryName, catagoryDescription) VALUES (?,?)`,{
          replacements : [catagory.catagoryName, catagory.catagoryDescription]
        })
    })
  }
}


export default new InstituteController()