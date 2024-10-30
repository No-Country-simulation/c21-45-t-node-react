import pool from "../config/db.js";

const mascotaService = {
  // Crear una nueva mascota
  async addMascota(mascotaData, imageUrls) {
    try {
      const {
        nombre,
        especie,
        raza,
        sexo,
        tamanio,
        fecha_nacimiento,
        castrado,
        vacunado,
        amigable_ninos,
        amigable_perros,
        amigable_gatos,
        enfermedades,
        detalle,
        FK_Usuario,
      } = mascotaData;

      // Establecer eliminada en 0 cuando se crea una mascota
      const eliminada = 0;

      // Agregar mascota
      const [result] = await pool.query(
        `INSERT INTO Mascota 
      (nombre, especie, raza, sexo, tamanio, fecha_nacimiento, castrado, vacunado, 
       amigable_ninos, amigable_perros, amigable_gatos, enfermedades, detalle, foto, eliminada, FK_Usuario) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          mascotaData.nombre,
          mascotaData.especie,
          mascotaData.raza,
          mascotaData.sexo,
          mascotaData.tamanio,
          mascotaData.fecha_nacimiento,
          mascotaData.castrado,
          mascotaData.vacunado,
          mascotaData.amigable_ninos,
          mascotaData.amigable_perros,
          mascotaData.amigable_gatos,
          mascotaData.enfermedades,
          mascotaData.detalle,
          JSON.stringify(imageUrls),
          eliminada,
          mascotaData.FK_Usuario,
        ]
      );
      return result.insertId;
    } catch (error) {
      throw new Error(`Error al agregar mascota: ${error.message}`);
    }
  },

  // Listar todas las mascotas
  async listMascotas() {
    try {
      const query = `
            SELECT m.*, 
              l.nombre AS localidad, 
              p.nombre AS provincia, 
              pais.nombre AS pais,
              CASE
                WHEN TIMESTAMPDIFF(MONTH, m.fecha_nacimiento, CURDATE()) <= 6 THEN 'Cachorro'
                WHEN TIMESTAMPDIFF(YEAR, m.fecha_nacimiento, CURDATE()) <= 7 THEN 'Adulto'
                ELSE 'Senior'
              END AS edad,
              u.nombre AS usuario_nombre,
              COALESCE(u.apellido, '') AS usuario_apellido
            FROM Mascota m
            JOIN Usuario u ON m.FK_Usuario = u.PK_Usuario
            JOIN Direccion d ON u.FK_Direccion = d.PK_Direccion
            JOIN Localidad l ON d.FK_Localidad = l.PK_Localidad
            JOIN Provincia p ON l.FK_Provincia = p.PK_Provincia
            JOIN Pais pais ON p.FK_Pais = pais.PK_Pais
            WHERE m.eliminada = 0
    `;
      const [rows] = await pool.query(query);
      if (rows.length === 0) {
        return "No hay mascotas disponibles.";
      } else {
        return rows;
      }
    } catch (error) {
      throw new Error(`Error al obtener mascotas: ${error.message}`);
    }
  },

  // Listar todas las mascotas de un usuario
  async listMascotasByUsuario(FK_Usuario) {
    try {
      const [rows] = await pool.query("SELECT * FROM Usuario WHERE PK_Usuario = ?", [FK_Usuario]);
      if (rows.length === 0) {
        return "El usuario solicitado no existe.";
      } else {
        const [rows] = await pool.query(`SELECT m.*, 
                CASE
                WHEN TIMESTAMPDIFF(MONTH, m.fecha_nacimiento, CURDATE()) <= 6 THEN 'Cachorro'
                WHEN TIMESTAMPDIFF(YEAR, m.fecha_nacimiento, CURDATE()) <= 7 THEN 'Adulto'
                ELSE 'Senior'
                END AS edad FROM Mascota m WHERE FK_Usuario = ? AND eliminada = 0`, [FK_Usuario]);
        if (rows.length === 0) {
          return "El usuario no tiene mascotas cargadas.";
        } else {
          return rows;
        }
      }
    } catch (error) {
      throw new Error(`Error al obtener mascotas del usuario con ID ${FK_Usuario}: ${error.message}`);
    }
  },

  // Listar todas las mascotas por País
  async listMascotasByPais(FK_Pais) {
    try {
      const query = `
      SELECT m.*, l.nombre AS localidad, p.nombre AS provincia,
      CASE
        WHEN TIMESTAMPDIFF(MONTH, m.fecha_nacimiento, CURDATE()) <= 6 THEN 'Cachorro'
        WHEN TIMESTAMPDIFF(YEAR, m.fecha_nacimiento, CURDATE()) <= 7 THEN 'Adulto'
        ELSE 'Senior'
        END AS edad,
        u.nombre AS usuario_nombre,
        u.apellido AS usuario_apellido
      FROM Mascota m
      JOIN Usuario u ON m.FK_Usuario = u.PK_Usuario
      JOIN Direccion d ON u.FK_Direccion = d.PK_Direccion
      JOIN Localidad l ON d.FK_Localidad = l.PK_Localidad
      JOIN Provincia p ON l.FK_Provincia = p.PK_Provincia
      WHERE p.FK_Pais = ? AND m.eliminada = 0
    `;
      const [rows] = await pool.query(query, [FK_Pais]);
      if (rows.length === 0) {
        return "No hay mascotas en este país.";
      } else {
        return rows;
      }
    } catch (error) {
      throw new Error(`Error al obtener mascotas por país con ID ${FK_Pais}: ${error.message}`);
    }
  },

  // Listar todas las mascotas por Provincia
  async listMascotasByProvincia(FK_Provincia) {
    try {
      const query = `
      SELECT m.*, l.nombre AS localidad,
      CASE
        WHEN TIMESTAMPDIFF(MONTH, m.fecha_nacimiento, CURDATE()) <= 6 THEN 'Cachorro'
        WHEN TIMESTAMPDIFF(YEAR, m.fecha_nacimiento, CURDATE()) <= 7 THEN 'Adulto'
        ELSE 'Senior'
        END AS edad,
        u.nombre AS usuario_nombre,
        u.apellido AS usuario_apellido
      FROM Mascota m
      JOIN Usuario u ON m.FK_Usuario = u.PK_Usuario
      JOIN Direccion d ON u.FK_Direccion = d.PK_Direccion
      JOIN Localidad l ON d.FK_Localidad = l.PK_Localidad
      WHERE l.FK_Provincia = ? AND m.eliminada = 0
    `;
      const [rows] = await pool.query(query, [FK_Provincia]);
      if (rows.length === 0) {
        return "No hay mascotas en esta provincia.";
      } else {
        return rows;
      }
    } catch (error) {
      throw new Error(`Error al obtener mascotas por provincia con ID ${FK_Provincia}: ${error.message}`);
    }
  },

  // Listar todas las mascotas por Localidad
  async listMascotasByLocalidad(FK_Localidad) {
    try {
      const query = `
      SELECT * ,
      CASE
        WHEN TIMESTAMPDIFF(MONTH, m.fecha_nacimiento, CURDATE()) <= 6 THEN 'Cachorro'
        WHEN TIMESTAMPDIFF(YEAR, m.fecha_nacimiento, CURDATE()) <= 7 THEN 'Adulto'
        ELSE 'Senior'
        END AS edad,
        u.nombre AS usuario_nombre,
        u.apellido AS usuario_apellido
      FROM Mascota m
      JOIN Usuario u ON m.FK_Usuario = u.PK_Usuario
      JOIN Direccion d ON u.FK_Direccion = d.PK_Direccion
      WHERE d.FK_Localidad = ? AND m.eliminada = 0
    `;
      const [rows] = await pool.query(query, [FK_Localidad]);
      if (rows.length === 0) {
        return "No hay mascotas en esta localidad.";
      } else {
        return rows;
      }
    } catch (error) {
      throw new Error(`Error al obtener mascotas por localidad con ID ${FK_Localidad}: ${error.message}`);
    }
  },

  // Obtener una mascota por ID
  async getMascotaById(id) {
    try {
      const query = `
      SELECT m.*, l.nombre AS localidad, p.nombre AS provincia, pais.nombre AS pais,
      CASE
        WHEN TIMESTAMPDIFF(MONTH, m.fecha_nacimiento, CURDATE()) <= 6 THEN 'Cachorro'
        WHEN TIMESTAMPDIFF(YEAR, m.fecha_nacimiento, CURDATE()) <= 7 THEN 'Adulto'
        ELSE 'Senior'
        END AS edad,
        u.nombre AS usuario_nombre,
        u.apellido AS usuario_apellido
      FROM Mascota m
      JOIN Usuario u ON m.FK_Usuario = u.PK_Usuario
      JOIN Direccion d ON u.FK_Direccion = d.PK_Direccion
      JOIN Localidad l ON d.FK_Localidad = l.PK_Localidad
      JOIN Provincia p ON l.FK_Provincia = p.PK_Provincia
      JOIN Pais pais ON p.FK_Pais = pais.PK_Pais
      WHERE m.PK_Mascota = ? AND m.eliminada = 0
    `;
      const [rows] = await pool.query(query, [id]);
      if (rows.length === 0) {
        return "No se encontró la mascota solicitada.";
      } else {
        return rows[0];
      }
    } catch (error) {
      throw new Error(`Error al obtener mascota con ID ${id}: ${error.message}`);
    }
  },

  // Editar una mascota
  async editMascota(id, mascotaUpdated) {
    try {
      const [result] = await pool.query(
        `UPDATE Mascota SET 
      nombre = ?, especie = ?, raza = ?, sexo = ?, tamanio = ?, 
      fecha_nacimiento = ?, castrado = ?, vacunado = ?, 
      amigable_ninos = ?, amigable_perros = ?, amigable_gatos = ?, 
      enfermedades = ?, detalle = ?, foto = ? 
      WHERE PK_Mascota = ? AND eliminada = 0`,
        [
          mascotaUpdated.nombre,
          mascotaUpdated.especie,
          mascotaUpdated.raza,
          mascotaUpdated.sexo,
          mascotaUpdated.tamanio,
          mascotaUpdated.fecha_nacimiento,
          mascotaUpdated.castrado,
          mascotaUpdated.vacunado,
          mascotaUpdated.amigable_ninos,
          mascotaUpdated.amigable_perros,
          mascotaUpdated.amigable_gatos,
          mascotaUpdated.enfermedades,
          mascotaUpdated.detalle,
          mascotaUpdated.foto,
          id,
        ]
      );
      if (result.affectedRows === 0) {
        return "No se encontró la mascota solicitada.";
      } else {
        return { id, ...mascotaUpdated };
      }
    } catch (error) {
      throw new Error(`Error al actualizar mascota con ID ${id}: ${error.message}`);
    }
  },

  // Eliminar una mascota
  async deleteMascota(id) {
    try {
      const [result] = await pool.query("UPDATE Mascota SET eliminada = 1 WHERE PK_Mascota = ?", [id]);
      // Retorna true si se eliminó la mascota
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error al eliminar mascota con ID ${id}: ${error.message}`);
    }
  },

  // Filtrar mascotas por edad, sexo, tamaño, especie, límite, ubicación, país, provincia y localidad
  async filtroMascotas(filterData) {
    try {
      const { edad, sexo, tamanio, especie, limite, ubicacion, pais, provincia, localidad } = filterData;

      // Base de la consulta
      let query = `
      SELECT m.*, l.nombre AS localidad, p.nombre AS provincia, pais.nombre AS pais,
      CASE
        WHEN TIMESTAMPDIFF(MONTH, m.fecha_nacimiento, CURDATE()) <= 6 THEN 'Cachorro'
        WHEN TIMESTAMPDIFF(YEAR, m.fecha_nacimiento, CURDATE()) <= 7 THEN 'Adulto'
        ELSE 'Senior'
      END AS edad,
      u.nombre AS usuario_nombre,
      u.apellido AS usuario_apellido
      FROM Mascota m
      JOIN Usuario u ON m.FK_Usuario = u.PK_Usuario
      JOIN Direccion d ON u.FK_Direccion = d.PK_Direccion
      JOIN Localidad l ON d.FK_Localidad = l.PK_Localidad
      JOIN Provincia p ON l.FK_Provincia = p.PK_Provincia
      JOIN Pais pais ON p.FK_Pais = pais.PK_Pais
      WHERE m.eliminada = 0
    `;

      const params = [];

      // Filtros dinámicos según los parámetros recibidos
      if (edad) {
        query += ` AND CASE
        WHEN TIMESTAMPDIFF(MONTH, m.fecha_nacimiento, CURDATE()) <= 6 THEN 'Cachorro'
        WHEN TIMESTAMPDIFF(YEAR, m.fecha_nacimiento, CURDATE()) <= 7 THEN 'Adulto'
        ELSE 'Senior'
      END = ?`;
        params.push(edad);
      }
      if (sexo) {
        query += ` AND m.sexo = ?`;
        params.push(sexo);
      }
      if (tamanio) {
        query += ` AND m.tamanio = ?`;
        params.push(tamanio);
      }
      if (especie) {
        query += ` AND m.especie = ?`;
        params.push(especie);
      }
      if (ubicacion) {
        query += ` AND l.nombre = ?`;
        params.push(ubicacion);
      }
      if (localidad) {
        query += ` AND l.PK_Localidad = ?`;
        params.push(localidad);
      } else if (provincia) {
        query += ` AND p.PK_Provincia = ?`;
        params.push(provincia);
      } else if (pais) {
        query += ` AND pais.PK_Pais = ?`;
        params.push(pais);
      }
      if (limite) {
        query += ` LIMIT ?`;
        params.push(parseInt(limite, 10));
      }      

      const [rows] = await pool.query(query, params);
      if (rows.length === 0) {
        return "No hay mascotas que cumplan con los filtros seleccionados.";
      } else {
        return rows;
      }
    } catch (error) {
      throw new Error(`Error al filtrar mascotas: ${error.message}`);
    }
  },
};

export default mascotaService;
