
import { Router} from "express";
import middleware from "../../../middleware/middleware.js";
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from "../../../controller/institute/course/courseController.js";
import upload from "../../../middleware/cloudMulterMiddlwareConfig.js";



const router = Router();

router.route('/course').post(middleware.isloggedIn,upload.single('courseThumbnail'),createCourse).get(getAllCourse)
router.route('/course/:id').get(getSingleCourse).delete(deleteCourse)

export default router