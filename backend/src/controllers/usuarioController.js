import userService from "../services/usuarioService.js";
import { usuarioDTO } from "../DTO/usuarioDTO.js";

export const getUsuarios = async (req, res) => {
  console.log("Controller getUsuarios");
  try {
    const users = await userService.getUsuarios();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsuarioById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userService.getUsuarioById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const addUsuario = async (req, res) => {
  console.log("Controller AddUsuario");
  const { email, password, tipoUsuario, data } = req.body;
  try {
    // Aplicar DTO
    const usuarioTransformado = usuarioDTO({ email, password });

    if (tipoUsuario === "adoptante") {
      const nuevoAdoptante = await userService.addAdoptante(data);
      await userService.addUsuario(usuarioTransformado.email, usuarioTransformado.password, "adoptante", nuevoAdoptante);
    } else if (tipoUsuario === "refugio") {
      const nuevoRefugio = await userService.addRefugio(data);
      await userService.addUsuario(usuarioTransformado.email, usuarioTransformado.password, "refugio", nuevoRefugio);
    } else {
      return res.status(400).json({ error: "Tipo de usuario no válido" });
    }

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const registrarUsuario = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await userService.getUsuarioByEmail(email);
    if (user) {
      return res.status(400).json({ error: "Ya existe un usuario con ese email" });
    }

    return await addUsuario(req, res);
  } catch (error) {
    console.log("Error en registerUser: " + error.message);
    throw new Error(error.message);
  }
};

export const updateUsuario = async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  try {
    const updatedUser = await userService.updateUsuario(userId, userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  const userId = req.params.id;
  try {
    await userService.deleteUsuario(userId);
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getAdoptantes = async (req, res) => {
  try {
    const adoptantes = await userService.getAdoptantes();
    res.status(200).json(adoptantes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los adoptantes" });
  }
};

export const getRefugios = async (req, res) => {
  try {
    const refugios = await userService.getRefugios();
    res.status(200).json(refugios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los refugios" });
  }
};
