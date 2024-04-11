import { Router } from "express";
import {  postDTCC, getDTCC } from "../../../../controllers/ordenesDeTrabajo/detallles/DTCC.controllers.js";



const router = Router();


router.post('/DTCC', postDTCC);
router.get('/DTCC/:id', getDTCC);
// router.get('/DTCC/:fecha_creacion_inicio/:fecha_creacion_fin/:id_aserradero', getDTCCC);
export default router;
