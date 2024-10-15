import express from 'express';
const router = express.Router();
import * as enumController from '../controllers/enumController.js';

// Obtener los valores ENUM de cada entidad para los select de la interfaz (debe mandar como parámetros el atributo y la entidad)
router.get('/:atributo/:entidad', enumController.getEnumValues);

export default router;