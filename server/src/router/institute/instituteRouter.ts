
import express, { Router } from 'express'
import instituteController from '../../controller/institute/instituteController.js'

const router: Router = express.Router()

router.route('/create-institute').post(instituteController.createInstitute)

export default router