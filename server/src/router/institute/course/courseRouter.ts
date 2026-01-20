
import { Router} from "express";
import middleware from "../../../middleware/middleware.js";
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from "../../../controller/institute/course/courseController.js";

import {cloudinary, storage} from './../../../service/cloudinaryConfiguration.js'
import multer from 'multer'

const upload = multer({storage : storage,
  fileFilter : (req, file,callback)=>{
    const allowedFileType = ['image/png', 'image/jpeg', 'image/jpg']
    if(allowedFileType.includes(file.mimetype)){
      callback(null, true)
    }else{
      callback(new Error('Only image allowed'))
    }
  }
})



const router = Router();

router.route('/course').post(middleware.isloggedIn,upload.single('courseThumbnail'),createCourse).get(getAllCourse)
router.route('/course/:id').get(getSingleCourse).delete(deleteCourse)

export default router