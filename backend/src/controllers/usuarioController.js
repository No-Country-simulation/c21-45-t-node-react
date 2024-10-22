import userService from "../services/usuarioService.js";
import { usuarioDTO } from "../dto/usuarioDTO.js";
import { isValidPassword } from "../utils.js";

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

    // Verificar si los campos obligatorios del perfil están completos
    const { nombre, apellido, telefono, tipo_doc, nro_doc, nro_org, FK_Direccion, FK_Rol } = user;
    let perfilCompleto = false;
    if (FK_Rol == 2) perfilCompleto = nombre && apellido && telefono && tipo_doc && nro_doc && FK_Direccion ? true : false;
    else perfilCompleto = nombre && telefono && (nro_doc || nro_org) && FK_Direccion ? true : false;

    // Agregar el campo perfilCompleto al objeto de usuario
    res.status(200).json({ ...user, perfilCompleto });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const addUsuario = async (req, res) => {
  console.log("Controller AddUsuario");
  const { email, password, tipoUsuario, nombre, apellido, nro_org } = req.body;
  try {
    // Aplicar DTO
    const usuarioTransformado = usuarioDTO({ email, password });

    await userService.addUsuario(usuarioTransformado.email, usuarioTransformado.password, tipoUsuario, nombre, apellido, nro_org);

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

export const loginUsuario = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userService.getUsuarioByEmail(email);
    console.log("user", user);

    console.log("email", email);
    console.log("password", req.body.password);

    if (user && user.password) {
      const isMatch = await isValidPassword(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send("Usuario o contraseña incorrectos");
      }
      console.log("is match");
      // Guardo usuario en sesión
      const { password, ...filteredUser } = user;
      console.log("filteredUser", filteredUser);
      req.session.user = filteredUser;
      req.session.save((err) => {
        if (err) {
          console.log("Error en guardar session", err);
          return res.status(500).send("Error al ingresar usuario");
        }
        return res.status(200).send({ status: "success", payload: filteredUser });
      });
    } else {
      return res.status(400).send("Usuario o contraseña incorrectos");
    }
  } catch (err) {
    console.log("Error en login:", err);
    return res.status(400).send("Usuario o contraseña incorrectos");
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
