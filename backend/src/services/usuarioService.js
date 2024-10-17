import pool from "../config/db.js";

const usuarioService = {
  // Obtener todos los usuarios
  async getUsuarios() {
    try {
      console.log("service getUsuarios");
      const [rows] = await pool.query("SELECT * FROM usuario");
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
  },

  // Obtener un usuario por ID
  async getUsuarioById(userId) {
    try {
      const [rows] = await pool.query("SELECT * FROM usuario WHERE PK_Usuario = ?", [userId]);
      if (rows.length === 0) {
        throw new Error("Usuario no encontrado");
      }
      return rows[0];
    } catch (error) {
      throw new Error(`Error al obtener usuario con ID ${userId}: ${error.message}`);
    }
  },

  // Obtener un usuario por email
  async getUsuarioByEmail(email) {
    try {
      const [rows] = await pool.query("SELECT * FROM usuario WHERE email = ?", [email]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      throw new Error(`Error al obtener usuario con email ${email}: ${error.message}`);
    }
  },

  // Crear un nuevo usuario según el tipo
  async addAdoptante(adoptanteData) {
    try {
      const { nombre, apellido, fecha_nacimiento, tipo_doc, nro_doc, direccion } = adoptanteData;

      // Agregar dirección
      const [direccionResult] = await pool.query(
        `
        INSERT INTO Direccion (calle, numero, FK_Localidad) 
        VALUES (?, ?, ?)`,
        [direccion.calle, direccion.numero, direccion.FK_Localidad]
      );
      const FK_Direccion = direccionResult.insertId;

      // Agregar adoptante
      const [adoptanteResult] = await pool.query(
        `
        INSERT INTO Adoptante (nombre, apellido, fecha_nacimiento, tipo_doc, nro_doc, FK_Direccion)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [nombre, apellido, fecha_nacimiento, tipo_doc, nro_doc, FK_Direccion]
      );

      // Devolvemos el ID del adoptante creado
      return adoptanteResult.insertId;
    } catch (error) {
      throw new Error(`Error al agregar adoptante: ${error.message}`);
    }
  },

  async addRefugio(refugioData) {
    try {
      const { tipo, nombre, apellido, telefono, direccion } = refugioData;

      // Agregar dirección
      const [direccionResult] = await pool.query(
        `
        INSERT INTO Direccion (calle, numero, FK_Localidad) 
        VALUES (?, ?, ?)`,
        [direccion.calle, direccion.numero, direccion.FK_Localidad]
      );
      const FK_Direccion = direccionResult.insertId;

      // Agregar refugio
      const [refugioResult] = await pool.query(
        `
        INSERT INTO Refugio (tipo, nombre, apellido, telefono, FK_Direccion)
        VALUES (?, ?, ?, ?, ?)`,
        [tipo, nombre, apellido, telefono, FK_Direccion]
      );

      // Devolvemos el ID del refugio creado
      return refugioResult.insertId;
    } catch (error) {
      throw new Error(`Error al agregar refugio: ${error.message}`);
    }
  },

  // Método para registrar el usuario
  async addUsuario(email, password, tipoUsuario, FK_Tipo) {
    try {
      let FK_Rol;

      // Determinamos el FK_Rol dependiendo del tipo de usuario
      if (tipoUsuario === "adoptante") {
        FK_Rol = 2; // Suponiendo que 2 es el rol de adoptante
      } else if (tipoUsuario === "refugio") {
        FK_Rol = 3; // Suponiendo que 3 es el rol de refugio
      }

      await pool.query(
        `
        INSERT INTO Usuario (email, password, FK_Rol, ${tipoUsuario === "adoptante" ? "FK_Adoptante" : "FK_Refugio"})
        VALUES (?, ?, ?, ?)`,
        [email, password, FK_Rol, FK_Tipo]
      );
    } catch (error) {
      console.log("error al agregar usuario", error);
      throw new Error(`Error al agregar usuario: ${error.message}`);
    }
  },

  // Actualizar un usuario por ID
  async updateUsuario(userId, userData) {
    try {
      const { name, email, password } = userData;
      const [result] = await pool.query("UPDATE usuario SET name = ?, email = ?, password = ? WHERE PK_Usuario = ?", [name, email, password, userId]);

      if (result.affectedRows === 0) {
        throw new Error("Usuario no encontrado o sin cambios");
      }
      return { id: userId, ...userData };
    } catch (error) {
      throw new Error(`Error al actualizar usuario con ID ${userId}: ${error.message}`);
    }
  },

  // Eliminar un usuario por ID
  async deleteUsuario(userId) {
    try {
      const [result] = await pool.query("DELETE FROM usuario WHERE PK_Usuario = ?", [userId]);
      if (result.affectedRows === 0) {
        throw new Error("Usuario no encontrado");
      }
      return { message: "Usuario eliminado correctamente" };
    } catch (error) {
      throw new Error(`Error al eliminar usuario con ID ${userId}: ${error.message}`);
    }
  },

  // Obtener todos los Adoptantes
  async getAdoptantes() {
    try {
      const [rows] = await pool.query(`
        SELECT Usuario.*, Adoptante.*
        FROM Usuario
        INNER JOIN Adoptante ON Usuario.FK_Adoptante = Adoptante.PK_Adoptante
      `);
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener adoptantes: ${error.message}`);
    }
  },

  // Obtener todos los Refugios
  async getRefugios() {
    try {
      const [rows] = await pool.query(`
          SELECT Usuario.*, Refugio.*
          FROM Usuario
          INNER JOIN Refugio ON Usuario.FK_Refugio = Refugio.PK_Refugio
      `);
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener refugios: ${error.message}`);
    }
  },
};

export default usuarioService;
