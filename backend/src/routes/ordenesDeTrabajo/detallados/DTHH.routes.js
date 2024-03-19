import { Router } from "express";
import {  postDTHH, getDTHH } from "../../../../controllers/ordenesDeTrabajo/detallles/DTHH.controllers.js";



const router = Router();

router.post('/DTHH', postDTHH);
router.get('/DTHH/:id', getDTHH);

export default router;
