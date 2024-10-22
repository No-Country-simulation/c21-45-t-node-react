import { Router } from 'express';
import * as enumController from '../controllers/enumController.js';

const router = Router();

// Obtener los valores ENUM de cada entidad para los select de la interfaz (debe mandar como parámetros el atributo y la entidad)
router.get('/:atributo/:entidad', enumController.getEnumValues);

export default router;