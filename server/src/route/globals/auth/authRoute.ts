
import express from 'express'
import auth from '../../../controller/globals/auth/authController.js'

const router = express.Router()

router.route('/auth/register').post(auth.registerUser)
router.route('/auth/login').post(auth.loginUser)

export default router