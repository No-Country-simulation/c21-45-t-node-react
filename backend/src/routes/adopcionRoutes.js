import { Router } from 'express';
import * as adopcionController from '../controllers/adopcionController.js';

const router = Router();

// Ruta para crear una nueva solicitud de adopción
router.post('/', adopcionController.addAdopcion);
// Ruta para listar todas las solicitudes de adopción enviadas de un usuario
router.get('/enviadas/:FK_Usuario', adopcionController.listAdopcionSolicitada);
// Ruta para listar todas las solicitudes de adopción recibidas por un usuario
router.get('/recibidas/:FK_Usuario', adopcionController.listAdopcionRecibida);
// Ruta para obtener una solicitud de adopción por su ID
router.get('/:id', adopcionController.getAdopcionById);
// Ruta para editar una solicitud de adopción
router.put('/:id', adopcionController.editAdopcion);
// Ruta para eliminar una solicitud de adopción
router.delete('/:id', adopcionController.deleteAdopcion);
// Ruta para aceptar una solicitud de adopción
router.put('/aceptar/:id', adopcionController.acceptAdopcion);
// Ruta para rechazar una solicitud de adopción
router.put('/rechazar/:id', adopcionController.rejectAdopcion);


export default router;