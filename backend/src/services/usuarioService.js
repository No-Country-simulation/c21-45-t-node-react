import pool from "../config/db.js";

const usuarioService = {

  // Obtener todos los usuarios junto con la dirección (si existe)
  async getUsuarios() {
    try {
      const [rows] = await pool.query(`
      SELECT 
        u.*, 
        d.calle, 
        d.numero, 
        l.nombre AS localidad, 
        p.nombre AS provincia, 
        pa.nombre AS pais
      FROM usuario u
      LEFT JOIN direccion d ON u.FK_Direccion = d.PK_Direccion
      LEFT JOIN localidad l ON d.FK_Localidad = l.PK_Localidad
      LEFT JOIN provincia p ON l.FK_Provincia = p.PK_Provincia
      LEFT JOIN pais pa ON p.FK_Pais = pa.PK_Pais
    `);
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
      const [rows] = await pool.query(`SELECT 
        u.*, 
        d.calle, 
        d.numero, 
        l.nombre AS localidad, 
        p.nombre AS provincia, 
        pa.nombre AS pais
      FROM usuario u
      LEFT JOIN direccion d ON u.FK_Direccion = d.PK_Direccion
      LEFT JOIN localidad l ON d.FK_Localidad = l.PK_Localidad
      LEFT JOIN provincia p ON l.FK_Provincia = p.PK_Provincia
      LEFT JOIN pais pa ON p.FK_Pais = pa.PK_Pais
      WHERE email = ?`, [email]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      throw new Error(`Error al obtener usuario con email ${email}: ${error.message}`);
    }
  },

  // Método para registrar el usuario
// Método para registrar el usuario
async addUsuario(email, password, tipoUsuario, nombre, apellido, nro_org) {
  try {
    let FK_Rol;

    // Determinamos el FK_Rol dependiendo del tipo de usuario
    if (tipoUsuario === "particular") {
      FK_Rol = 2; // Suponiendo que 2 es el rol de particular
      await pool.query(
        `
        INSERT INTO Usuario (email, password, nombre, apellido, FK_Rol, FK_Direccion)
        VALUES (?, ?, ?, ?, ?, null)`,
        [email, password, nombre, apellido, FK_Rol]
      );
    } else if (tipoUsuario === "organizacion") {
      FK_Rol = 3; // Suponiendo que 3 es el rol de org
      await pool.query(
        `
        INSERT INTO Usuario (email, password, nro_org, nombre, FK_Rol, FK_Direccion)
        VALUES (?, ?, ?, ?, ?, null)`,
        [email, password, nro_org, nombre, FK_Rol]
      );
    }
  } catch (error) {
    console.log("error al agregar usuario", error);
    throw new Error(`Error al agregar usuario: ${error.message}`);
  }
},

  // Actualizar un usuario por ID
  async updateUsuario(userId, userData) {
    try {
      const { nombre, apellido, email, password, telefono, tipo_doc, nro_doc, nro_org, direccion } = userData;

      let FK_Direccion;
      if (direccion) {
        // Obtener la dirección actual del usuario
        const [user] = await pool.query("SELECT FK_Direccion FROM Usuario WHERE PK_Usuario = ?", [userId]);

        FK_Direccion = user[0]?.FK_Direccion;

        // Si el usuario ya tiene una dirección, la actualiza
        if (FK_Direccion) {
          await pool.query(`UPDATE Direccion SET calle = ?, numero = ?, FK_Localidad = ? WHERE PK_Direccion = ?`, [
            direccion.calle,
            direccion.numero,
            direccion.FK_Localidad,
            FK_Direccion,
          ]);
        }
        // Si no tiene dirección, la inserta
        else {
          const [direccionResult] = await pool.query(`INSERT INTO Direccion (calle, numero, FK_Localidad) VALUES (?, ?, ?)`, [
            direccion.calle,
            direccion.numero,
            direccion.FK_Localidad,
          ]);
          FK_Direccion = direccionResult.insertId;
        }
      }

      // Actualizamos los datos del usuario
      const updateFields = [];
      const values = [];

      if (nombre) {
        updateFields.push("nombre = ?");
        values.push(nombre);
      }
      if (apellido) {
        updateFields.push("apellido = ?");
        values.push(apellido);
      }
      if (email) {
        updateFields.push("email = ?");
        values.push(email);
      }
      if (password) {
        updateFields.push("password = ?");
        values.push(password);
      }
      if (telefono) {
        updateFields.push("telefono = ?");
        values.push(telefono);
      }
      if (tipo_doc) {
        updateFields.push("tipo_doc = ?");
        values.push(tipo_doc);
      }
      if (nro_doc) {
        updateFields.push("nro_doc = ?");
        values.push(nro_doc);
      }
      if (nro_org) {
        updateFields.push("nro_org = ?");
        values.push(nro_org);
      }
      if (FK_Direccion) {
        updateFields.push("FK_Direccion = ?");
        values.push(FK_Direccion);
      }

      values.push(userId);

      const query = `UPDATE Usuario SET ${updateFields.join(", ")} WHERE PK_Usuario = ?`;
      const [result] = await pool.query(query, values);

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
};

export default usuarioService;
