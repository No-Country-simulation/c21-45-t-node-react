import { Router } from "express";
import * as usuarioController from "../controllers/usuarioController.js";
import { verifyRequiredBody } from "../utils.js";

const router = Router();

router.get("/", usuarioController.getUsuarios);
router.get("/adoptantes", usuarioController.getAdoptantes);
router.get("/refugios", usuarioController.getRefugios);
router.get("/:id", usuarioController.getUsuarioById);
router.post("/", verifyRequiredBody(["email", "password", "tipoUsuario", "data"]), usuarioController.addUsuario);
router.put("/:id", usuarioController.updateUsuario);
router.delete("/:id", usuarioController.deleteUsuario);

export default router;
