import { Router } from "express";
import * as offerController from './controller/offer.controller.js'
import { asyncHandler } from "../../services/errorHandling.js";
import validation  from "../../MiddleWare/validation.js";
import {auth} from '../../MiddleWare/auth.middleware.js'
import  endPoint  from "./offer.endPoint.js";
const router = Router({mergeParams:true});


router.post('/',auth(endPoint.create),asyncHandler(offerController.creatOffer))
router.put('/:offerId',auth(endPoint.update),asyncHandler(offerController.updateOffer))
router.get('/:offerId',auth(endPoint.update),asyncHandler(offerController.getOffer))
router.get('/',asyncHandler(offerController.getAllOffer))
router.delete('/:offerId',asyncHandler(offerController.deleteOffer))




export default router;
