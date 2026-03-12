import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import User from "../database/models/userModel.js";
import type { ExtendRequest } from "./extendRequest.js";



class Middleware{
  async isloggedIn(req : ExtendRequest, res : Response, next : NextFunction){
    //check token from the user
    const token = req.headers.authorization
    if(!token){
      return res.status(403).json({
        "message" : "please provide the token"
      })
    }
    const secretKey = process.env.TOKEN_SECRET_KEY
    if(!secretKey){
      return res.status(500).json({
        "message" : "Please try again"
      })
    }
    jwt.verify(token, secretKey,async (err, result : any)=>{
      if(err){
        res.status(401).json({
          "message" : "Invalid token"
        })
      }else{
        const user = await User.findByPk(result.id, {
          attributes : ['id', 'currentInstituteNumber' ]
        })
        if(!user){
           return res.status(401).json({
            "message" : "Unknown users id"
          })
        }
        req.userData = {
          id: user.id,
          instituteNumber : user.currentInstituteNumber
        }
        next()
      }
    })

  }
}

export default new Middleware();