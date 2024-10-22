import { Router } from "express";
import * as usuarioController from "../controllers/usuarioController.js";
import { verifyRequiredBody } from "../utils.js";

const router = Router();

router.post("/register", verifyRequiredBody(["email", "password", "tipoUsuario", "nombre"]), usuarioController.registrarUsuario);

router.post("/login", verifyRequiredBody(["email", "password"]), usuarioController.loginUsuario);

export default router;
