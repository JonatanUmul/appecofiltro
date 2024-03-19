import { Router } from "express";
import {  postDCPB, getDCPB } from "../../../../controllers/controlProcesos/detalle/DCPB.controllers.js";



const router = Router();


router.post('/DCPB', postDCPB);
router.get('/DCPB/:id', getDCPB)

export default router;
