

import {cloudinary, storage} from './../service/cloudinaryConfiguration.js'
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

export default upload