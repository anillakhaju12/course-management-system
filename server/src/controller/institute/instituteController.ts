import type { Request, Response } from "express";
import sequelize from "../../database/connection.js";
import instituteRandomNumberGenerator from "../../service/instituteRandomNumberGenerator.js";
class InstituteController{
  async createInstitute(req: Request ,res: Response){
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
      res.status(200).json({
        "message" : "institute created"
      })

    }catch(err){
      console.log(err)
      res.status(500).json({
        "message" : "try again"
      })
    }
  }
}

export default new InstituteController()