
import express, { Router } from 'express'
import teacherController from '../../../controller/institute/teacher/teacherController.js'
import middleware from '../../../middleware/middleware.js'
import upload from '../../../middleware/cloudMulterMiddlwareConfig.js'
import errorHandling from '../../../service/errorHandling.js'

const router : Router = express.Router()

router.route('/teacher').post(middleware.isloggedIn,upload.single(`teacherPhoto`),errorHandling(teacherController.createTeacher)).get(errorHandling(teacherController.getTeacher))

router.route('/teacher/:id').delete(middleware.isloggedIn, errorHandling(teacherController.deleteTeacher))

export default router