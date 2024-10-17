import express from 'express';
const router = express.Router();
import * as ubicacionController from '../controllers/ubicacionController.js';


// Ruta para listar todos los países
router.get('/pais', ubicacionController.listPaises);

// Ruta para listar todas las provincias de un país
router.get('/provincia/:id', ubicacionController.listProvinciasByPais);

// Ruta para listar todas las localidades de una provincia
router.get('/localidad/:id', ubicacionController.listLocalidadesByProvincia);

export default router;