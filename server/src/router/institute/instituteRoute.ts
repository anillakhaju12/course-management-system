
import express, { Router } from 'express'
import instituteController from '../../controller/institute/instituteController.js'
import middleware from '../../middleware/middleware.js'
import errorHandling from '../../service/errorHandling.js'

const router: Router = express.Router()

router.route('/institute').post(middleware.isloggedIn,instituteController.createInstituteTable,instituteController.createTeacherTable, instituteController.createStudentTable,instituteController.createCatagoryTable, errorHandling(instituteController.createCourseTable))

export default router