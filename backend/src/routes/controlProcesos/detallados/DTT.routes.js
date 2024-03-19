import { Router } from "express";
import {  postDTT, getDTT } from "../../../../controllers/controlProcesos/detalle/DTT.controllers.js";



const router = Router();


router.post('/DTT', postDTT);
router.get('/DTT/:id', getDTT);

export default router;
