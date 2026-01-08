import type { NextFunction, Response } from "express";
import sequelize from "../../database/connection.js";
import instituteRandomNumberGenerator from "../../service/instituteRandomNumberGenerator.js";
import type { ExtendRequest } from "../../middleware/extendRequest.js";
import User from "../../database/models/userModel.js";



class InstituteController{
  async createInstitute(req: ExtendRequest ,res: Response, next: NextFunction){
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
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
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
      }

        //creating table to store the which user has how many institutes 
      await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        userId VARCHAR(255) REFERENCES users(id),
        instituteNumber INT
        )`) 

        await sequelize.query(`INSERT INTO  user_institute(userId, instituteNumber) VALUES (?,?)`,{
          replacements : [req.userData?.id, instituteRandomNumber]
        })
        
      req.instituteNumber = instituteRandomNumber
      next()

    }catch(err){
      console.log(err)
      res.status(500).json({
        "message" : "try again"
      })
    }
  }

  async createTeacher(req : ExtendRequest, res: Response, next : NextFunction){
    const instituteNumber = req.instituteNumber
    await sequelize.query(`CREATE TABLE teacher_${instituteNumber}(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      teacherName VARCHAR(255),
      teacherEmail VARCHAR(255) UNIQUE,
      teacherAddress VARCHAR(255)
    )`)

    next()
  }

  async createStudent(req:ExtendRequest, res : Response){
    const instituteNumber = req.instituteNumber
    await sequelize.query(`CREATE TABLE student_${instituteNumber}(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      studentName VARCHAR(255),
      studentEmail VARCHAR(255) UNIQUE
    )`)
    res.status(200).json({
      "message" : "institute created successfully"
    })
  }
}

export default new InstituteController()