import { Router } from "express";
import * as superviserController from './controller/superviser.controller.js'
import { asyncHandler } from "../../services/errorHandling.js";
import validation  from "../../MiddleWare/validation.js";
import { auth } from "../../MiddleWare/auth.middleware.js";
import { endPoint } from "./superviser.endPoint.js";
const router = Router({mergeParams:true});

router.post('/',auth(endPoint.create),asyncHandler(superviserController.createSuperviser))
router.put('/update/:superviserId',auth(endPoint.update),asyncHandler(superviserController.updateSuperviser))
router.put('/deleteCourse/:superviserId',auth(endPoint.update),asyncHandler(superviserController.deleteCourse))
router.delete('/delete/:superviserId',auth(endPoint.delete),asyncHandler(superviserController.deleteSuperviser))




export default router;
