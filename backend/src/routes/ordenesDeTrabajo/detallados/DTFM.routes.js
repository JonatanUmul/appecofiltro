import { Router } from "express";
import {  postDTFM, getDTFM } from "../../../../controllers/ordenesDeTrabajo/detallles/DTFM.controllers.js"



const router = Router();


router.post('/DTFM', postDTFM);
router.get("/DTFM/:id", getDTFM);


export default router;
