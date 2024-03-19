import { Router } from "express";
import {  postDCPS, getDCPS} from "../../../../controllers/controlProcesos/detalle/DCPS.controllers.js";



const router = Router();


router.post('/DCPS', postDCPS);
router.get('/DCPS/:id', getDCPS);

export default router;
