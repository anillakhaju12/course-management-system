import type { NextFunction, Request, Response } from "express"


const errorHandling = (func : Function)=>{
  return (req : Request, res : Response, next : NextFunction)=>{
    func(req, res, next).catch((err :Error)=>{
      res.status(501).json({
        "message" : err.message,
        "error" : err
      })
    })
  }
  
}

export default errorHandling