import { Router } from "express";
import * as studentController from './controller/student.cotroller.js'
import { asyncHandler } from "../../services/errorHandling.js";
import validation  from "../../MiddleWare/validation.js";
import { endPoint } from "./student.endPoints.js";
import {auth} from '../../MiddleWare/auth.middleware.js'
const router = Router({mergeParams:true});


router.post('/',auth(endPoint.create),asyncHandler(studentController.creatStudent))
router.put('/update/:studentId',auth(endPoint.update),asyncHandler(studentController.updateStudent))
router.get('/:studentId',auth(endPoint.create),asyncHandler(studentController.getStudent))
router.get('/',auth(endPoint.create),asyncHandler(studentController.getAllStudents))
router.delete('/delete/:studentId',auth(endPoint.create),asyncHandler(studentController.deleteStudent))



export default router;
