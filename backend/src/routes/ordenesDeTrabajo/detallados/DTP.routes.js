import { Router } from "express";
import {  getDTP,postDTP } from "../../../../controllers/ordenesDeTrabajo//detallles/DTP.controllers.js"



const router = Router();


router.post('/DTP', postDTP);

router.get('/DTP/:id', getDTP);

export default router;
