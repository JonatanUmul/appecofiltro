import { Router } from "express";
import {  PostOperarios, getOperarios } from '../../../../controllers/mantenimientos/operarios/OperariosAreas.controller.js';


const router = Router();

router.get('/Operarios/:id_area', getOperarios );
router.post('/Operarios', PostOperarios );


export default router;
