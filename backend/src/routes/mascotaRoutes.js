import { Router } from 'express';
import * as mascotaController from '../controllers/mascotaController.js';
import { verifyRequiredBody } from "../utils.js";

const router = Router();

// Ruta para crear una nueva mascota
router.post('/', verifyRequiredBody(["nombre", "especie", "raza", "sexo", "tamanio", "fecha_nacimiento", "castrado", "vacunado", 
    "amigable_ninos", "amigable_perros", "amigable_gatos", "enfermedades", "detalle", "foto", "FK_Usuario"]), mascotaController.addMascota);
// Ruta para listar todas las mascotas
router.get('/', mascotaController.listMascotas);
// Ruta para listar todas las mascotas de un usuario
router.get('/usuario/:FK_Usuario', mascotaController.listMascotasByUsuario);
// Ruta para listar todas las mascotas de un país
router.get('/usuario/:FK_Pais', mascotaController.listMascotasByPais);
// Ruta para listar todas las mascotas de una provincia
router.get('/usuario/:FK_Provincia', mascotaController.listMascotasByProvincia);
// Ruta para listar todas las mascotas de una localidad
router.get('/usuario/:FK_Localidad', mascotaController.listMascotasByLocalidad);
// Ruta para obtener una mascota por ID
router.get('/:id', mascotaController.getMascotaById);
// Ruta para editar una mascota
router.put('/:id', mascotaController.editMascota);
// Ruta para eliminar una mascota
router.delete('/:id', mascotaController.deleteMascota);
  

export default router;