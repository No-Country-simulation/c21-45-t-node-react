import { Router } from "express";
import * as usuarioController from "../controllers/usuarioController.js";
import { verifyRequiredBody } from "../utils.js";

const router = Router();

router.get("/", usuarioController.getUsuarios);
router.get("/dataOK", usuarioController.getAdoptantes);
router.get("/:id", usuarioController.getUsuarioById);
router.post("/", verifyRequiredBody(["email", "password", "tipoUsuario", "nombre"]), usuarioController.addUsuario);
router.put("/:id", usuarioController.updateUsuario);
router.delete("/:id", usuarioController.deleteUsuario);

export default router;
