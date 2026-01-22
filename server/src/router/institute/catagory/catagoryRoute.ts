
import express, { Router } from 'express'
import errorHandling from '../../../service/errorHandling.js'
import middleware from '../../../middleware/middleware.js'
import catagoryController from '../../../controller/institute/catagory/catagoryController.js'

const router: Router =  express.Router()

router.route("/catagory").post(middleware.isloggedIn, errorHandling(catagoryController.createCatagory)).get(middleware.isloggedIn, errorHandling(catagoryController.getCatagory))

router.route("/catagory/:id").delete(middleware.isloggedIn, errorHandling(catagoryController.deleteCatagory))

export default router