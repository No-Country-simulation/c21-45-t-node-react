import { Router } from "express";
import * as usuarioController from "../controllers/usuarioController.js";
import { verifyRequiredBody } from "../utils.js";

const router = Router();

router.post(
  "/register",
  verifyRequiredBody([
    "email",
    "password",
    "tipoUsuario",
    "data.nombre",
    "data.apellido",
    "data.fecha_nacimiento",
    "data.tipo_doc",
    "data.nro_doc",
    "data.direccion.calle",
    "data.direccion.numero",
  ]),
  usuarioController.registrarUsuario
);

export default router;
