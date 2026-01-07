
import express, { Router } from 'express'
import instituteController from '../../controller/institute/instituteController.js'
import middleware from '../../middleware/middleware.js'

const router: Router = express.Router()

router.route('/create-institute').post(middleware.isloggedIn,instituteController.createInstitute)

export default router