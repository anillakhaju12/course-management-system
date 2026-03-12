import express, { Router } from 'express'
import errorHandling from '../../service/errorHandling.js'
import { teacherLogin } from '../../controller/teacher/teacherController.js'

const router : Router = express.Router()

router.route('/').post(errorHandling(teacherLogin))


export default router