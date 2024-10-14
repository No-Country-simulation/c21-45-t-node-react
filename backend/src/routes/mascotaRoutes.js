const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');


// Ruta para crear una nueva mascota
router.post('/', mascotaController.addMascota);
// Ruta para listar todas las mascotas
router.get('/', mascotaController.listMascotas);
// Ruta para obtener todas las mascotas de un refugio
router.get('/refugio/:id', mascotaController.listMascotasByRefugio);
// Ruta para obtener una mascota por ID
router.get('/:id', mascotaController.getMascotaById);
// Ruta para editar una mascota
router.put('/:id', mascotaController.editMascota);
// Ruta para eliminar una mascota
router.delete('/:id', mascotaController.deleteMascota);

module.exports = router;