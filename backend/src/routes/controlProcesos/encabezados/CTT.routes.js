import { Router } from "express";
import {  postCTT, putCTT } from "../../../../controllers/controlProcesos/encabezado/CTT.controllers.js";



const router = Router();


router.post('/CTT', postCTT);
router.put('/CTT', putCTT);

export default router;
