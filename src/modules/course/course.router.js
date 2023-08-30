import { Router } from "express";
import * as courseController from './controller/course.controller.js'
import { asyncHandler } from "../../services/errorHandling.js";
import validation  from "../../MiddleWare/validation.js";
import studentRouter from '../student/student.router.js' 
import { endPoint } from "./course.endPoint.js";
import { auth } from "../../MiddleWare/auth.middleware.js";
const router = Router();

router.use('/:courseId/Student', studentRouter)
router.post('/',auth(endPoint.create),asyncHandler(courseController.creatCourse))
router.put('/update/:courseId',auth(endPoint.update),asyncHandler(courseController.updateCourse))
router.delete('/delete/:courseId',auth(endPoint.update),asyncHandler(courseController.forceDelete));
router.get('/',asyncHandler(courseController.getAllCourses))
router.get('/softDeleted',auth(endPoint.update),asyncHandler(courseController.getAllSoftDeletedCourses))
router.get('/:courseId',asyncHandler(courseController.getCourse));
router.patch('/softDelete/:courseId',auth(endPoint.update),asyncHandler(courseController.softDelete))
router.patch('/restore/:courseId',auth(endPoint.update),asyncHandler(courseController.restore))
router.delete('/forceDelete/:courseId',auth(endPoint.update),asyncHandler(courseController.forceDelete))


export default router;
