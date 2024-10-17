import pool from '../config/db.js';

const mascotaService = {

// Crear una nueva mascota
async addMascota(mascotaData) {
  try {
    const { nombre, especie, raza, sexo, tamanio, fecha_nacimiento, castrado, vacunado, amigable_ninos, amigable_perros, amigable_gatos, enfermedades, detalle, foto, FK_Refugio } = mascotaData;

    // Agregar mascota
    const [result] = await pool.query(
      `INSERT INTO Mascota 
      (nombre, especie, raza, sexo, tamanio, fecha_nacimiento, castrado, vacunado, 
       amigable_ninos, amigable_perros, amigable_gatos, enfermedades, detalle, foto, FK_Refugio) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        mascotaData.foto,
        mascotaData.FK_Refugio
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
    const [rows] = await pool.query('SELECT * FROM Mascota');
    return rows.affectedRows > 0 ? rows : "No hay mascotas disponibles.";
  } catch (error) {
    throw new Error(`Error al obtener mascotas: ${error.message}`);
  }
},

// Listar todas las mascotas de un refugio
async listMascotasByRefugio(refugioId) {
  try {
    const [rows] = await pool.query('SELECT * FROM refugio WHERE PK_Refugio = ?', [refugioId]);
    if (rows.length === 0) {
      return "El refugio solicitado no existe.";
    } else {
        const [rows] = await pool.query('SELECT * FROM Mascota WHERE FK_Refugio = ?', [refugioId]);
        return rows.affectedRows > 0 ? rows : "El refugio no tiene mascotas cargadas.";
    }
  } catch (error) {
    throw new Error(`Error al obtener mascotas del refugio con ID ${refugioId}: ${error.message}`);
  }
},

// Obtener una mascota por ID
async getMascotaById(id) {
  try {
    const [rows] = await pool.query('SELECT * FROM Mascota WHERE PK_Mascota = ?', [id]);
    return rows[0] || null;
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
      WHERE PK_Mascota = ?`,
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
        id
      ]
    );
    return result.affectedRows > 0 ? { id, ...mascotaUpdated } : null;
  } catch (error) {
    throw new Error(`Error al actualizar mascota con ID ${id}: ${error.message}`);
  }
},

// Eliminar una mascota
async deleteMascota(id) {
  try {
    const [result] = await pool.query('DELETE FROM Mascota WHERE PK_Mascota = ?', [id]);
    // Retorna true si se eliminó la mascota
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`Error al eliminar mascota con ID ${id}: ${error.message}`);
  }
},
};

export default mascotaService;