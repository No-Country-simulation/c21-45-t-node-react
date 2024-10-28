import { Router } from "express";
import * as ubicacionController from '../controllers/ubicacionController.js';

const router = Router();

// Ruta para listar todos los países
router.get('/pais', ubicacionController.listPaises);

// Ruta para listar todas las provincias de un país
router.get('/provincia/:id', ubicacionController.listProvinciasByPais);

// Ruta para listar todas las localidades de una provincia
router.get('/localidad/:id', ubicacionController.listLocalidadesByProvincia);

// Ruta para listar todas las localidades que tengan mascotas en adopción
router.get('/localidadConMascotas', ubicacionController.listLocalidadesConMascotas);

export default router;