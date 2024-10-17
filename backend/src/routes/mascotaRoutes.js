import { Router } from 'express';
import * as mascotaController from '../controllers/mascotaController.js';
import { verifyRequiredBody } from "../utils.js";

const router = Router();

// Ruta para crear una nueva mascota
router.post('/', verifyRequiredBody(["nombre", "especie", "raza", "sexo", "tamanio", "fecha_nacimiento", "castrado", "vacunado", 
    "amigable_ninos", "amigable_perros", "amigable_gatos", "enfermedades", "detalle", "foto", "FK_Refugio"]), mascotaController.addMascota);
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