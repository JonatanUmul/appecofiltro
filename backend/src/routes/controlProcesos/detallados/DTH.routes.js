import { Router } from "express";
import {  postDTH, getDTH } from "../../../../controllers/controlProcesos/detalle/DTH.controllers.js";



const router = Router();


router.post('/DTH', postDTH);
router.get('/DTH/:id', getDTH);

export default router;
