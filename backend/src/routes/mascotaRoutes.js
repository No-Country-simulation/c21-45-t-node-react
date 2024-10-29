import { Router } from "express";
import * as mascotaController from "../controllers/mascotaController.js";
import { verifyRequiredBody } from "../utils.js";
import { imageUploader } from "../utils/uploader.js";

const router = Router();

// Ruta para crear una nueva mascota
router.post(
  "/",
  imageUploader.array("mascotaImages", 5),
  verifyRequiredBody([
    "nombre",
    "especie",
    "raza",
    "sexo",
    "tamanio",
    "fecha_nacimiento",
    "castrado",
    "vacunado",
    "amigable_ninos",
    "amigable_perros",
    "amigable_gatos",
    "enfermedades",
    "detalle",
    "FK_Usuario",
  ]),
  mascotaController.addMascota
);
// Ruta para listar todas las mascotas
router.get("/", mascotaController.listMascotas);
// Ruta para listar todas las mascotas de un usuario
router.get("/usuario/:FK_Usuario", mascotaController.listMascotasByUsuario);
// Ruta para listar todas las mascotas de un país
router.get("/pais/:FK_Pais", mascotaController.listMascotasByPais);
// Ruta para listar todas las mascotas de una provincia
router.get("/provincia/:FK_Provincia", mascotaController.listMascotasByProvincia);
// Ruta para listar todas las mascotas de una localidad
router.get("/localidad/:FK_Localidad", mascotaController.listMascotasByLocalidad);
// Ruta para obtener una mascota por ID
router.get("/:id", mascotaController.getMascotaById);
// Ruta para editar una mascota
router.put("/:id", mascotaController.editMascota);
// Ruta para eliminar una mascota
router.delete("/:id", mascotaController.deleteMascota);
// Ruta para filtrar mascotas
router.post("/filtro", mascotaController.filtroMascotas);

export default router;
