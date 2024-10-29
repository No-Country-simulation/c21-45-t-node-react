import pool from '../config/db.js';

const ubicacionService = {
  
  // Listar todos los países
  async listPaises() {
    try {
      const [rows] = await pool.query("SELECT * FROM Pais ORDER BY nombre");
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener países: ${error.message}`);
    }
  },

  // Listar todas las provincias de un país
  async listProvinciasByPais(id) {
    try {
      const [rows] = await pool.query("SELECT * FROM Provincia WHERE FK_Pais = ? ORDER BY nombre", [id]);
      if (rows.length === 0) {
        throw new Error("Provincias no encontradas");
      }
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener provincias del país con ID ${id}: ${error.message}`);
    }
  },

  // Listar todas las localidades de una provincia
  async listLocalidadesByProvincia(id) {
    try {
      const [rows] = await pool.query("SELECT * FROM Localidad WHERE FK_Provincia = ? ORDER BY nombre", [id]);
      if (rows.length === 0) {
        throw new Error("Localidades no encontradas");
      }
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener localidades de la provincia con ID ${id}: ${error.message}`);
    }
  },

  // Listar todas las localidad que tengan mascotas en adopcion
async listLocalidadesConMascotas() {
  try {
    const [rows] = await pool.query(
        `SELECT DISTINCT l.nombre AS localidad, p.nombre AS provincia
        FROM mascota m
        JOIN usuario u ON m.FK_Usuario = u.PK_Usuario
        JOIN direccion d ON u.FK_Direccion = d.PK_Direccion
        JOIN localidad l ON d.FK_Localidad = l.PK_Localidad
        JOIN provincia p ON l.FK_Provincia = p.PK_Provincia
        WHERE m.eliminada = 0;`,);
    if (rows.length === 0) {
      throw new Error("Localidades no encontradas");
    }
    return rows;
  } catch (error) {
    throw new Error(`Error al obtener localidades con mascotas en adopción: ${error.message}`);
  }
},
};

export default ubicacionService;