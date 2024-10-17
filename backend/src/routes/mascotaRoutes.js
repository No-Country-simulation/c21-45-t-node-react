import { Router } from 'express';
import * as mascotaController from '../controllers/mascotaController.js';

const router = Router();

// Ruta para crear una nueva mascota
router.post('/', mascotaController.addMascota);
// Ruta para listar todas las mascotas
router.get('/', mascotaController.listMascotas);
// Ruta para listar todas las mascotas de un refugio
router.get('/refugio/:id', mascotaController.listMascotasByRefugio);
// Ruta para obtener una mascota por ID
router.get('/:id', mascotaController.getMascotaById);
// Ruta para editar una mascota
router.put('/:id', mascotaController.editMascota);
// Ruta para eliminar una mascota
router.delete('/:id', mascotaController.deleteMascota);
  

export default router;