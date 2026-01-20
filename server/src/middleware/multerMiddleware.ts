// configuration multer

import multer from "multer";
import type { ExtendRequest } from "./extendRequest.js";

const storage = multer.diskStorage({
  //location incoming file
  //cb or callback function
  destination : function( req : ExtendRequest, file : Express.Multer.File, callback: any){
    //callback consist two parameter (if error, if success)
    callback(null, './src/storage')
  },
  //after storing the file in above location, it give name to store data
  filename : function(eq : ExtendRequest, file : Express.Multer.File, callback: any){
    callback(null, Date.now() + "-" + file.originalname )
  }
})
export {multer, storage}