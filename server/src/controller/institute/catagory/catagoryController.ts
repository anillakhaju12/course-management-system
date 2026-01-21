import type { Response } from "express";
import type { ExtendRequest } from "../../../middleware/extendRequest.js";
import sequelize from "../../../database/connection.js";
import { QueryTypes } from "sequelize";

class CataoryController{
  async createCatagory(req:ExtendRequest, res: Response){
    const {catagoryName, catagoryDescription} =  req.body
    const instituteNumber = req.userData?.instituteNumber
    if(!catagoryName || !catagoryDescription){
      return res.status(400).json({
        "message": "Please provide catagoryName, catagoryDescription"
      })
    }
    await sequelize.query(`INSERT INTO catagory_${instituteNumber}(
      catagoryName, catagoryDescription) VALUES (?,?)`,{
        type : QueryTypes.INSERT,
        replacements :[catagoryName,catagoryDescription]
      })
      res.status(200).json({
        "message" : "Catagory add successfully"
      })
  }

  async getCatagory(req: ExtendRequest, res : Response){
    const instituteNumber = req.userData?.instituteNumber
    const catagories = await sequelize.query(`SELECT * FROM catagory_${instituteNumber}`, {
      type : QueryTypes.SELECT
    })
    res.status(200).json({
      "message" : "Catagories fetch sccessfully",
      data : catagories
    })
  }

  async deleteCatagory(req: ExtendRequest, res : Response){
    const instituteNumber = req.userData?.instituteNumber
    const {id} = req.params
    await sequelize.query(`DELETE FROM catagory_${instituteNumber} WHERE id =?`,{
      type : QueryTypes.DELETE,
      replacements : [id]
    })
    res.status(200).json({
      "message" : "Catagory deleted successfully"
    })
  }
}

export default  new CataoryController()