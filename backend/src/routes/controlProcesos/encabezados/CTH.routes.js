import { Router } from "express";
import {  postCTH, putCTH } from "../../../../controllers/controlProcesos/encabezado/CTH.controllers.js";



const router = Router();


router.post('/CTH', postCTH);
router.put('/CTH', putCTH);

export default router;
