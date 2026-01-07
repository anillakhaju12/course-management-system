import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import User from "../database/models/userModel.js";


interface ExtendRequest extends Request{
  userData ?: {
    username : string,
    email : string,
    role : string
  }
}

class Middleware{
  async isloggedIn(req : ExtendRequest, res : Response, next : NextFunction){
    //check token from the user
    const token = req.headers.authorization
    if(!token){
      return res.status(403).json({
        "message" : "please provide the token"
      })
    }
    jwt.verify(token, "hithisissecretkey",async (err, result : any)=>{
      if(err){
        res.status(401).json({
          "message" : "Invalid token"
        })
      }else{
        const user = await User.findByPk(result.id)
        if(!user){
           return res.status(401).json({
            "message" : "Unknown users id"
          })
        }
        req.userData = user
        next()
      }
    })

  }
}

export default new Middleware();