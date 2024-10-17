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
};

export default ubicacionService;