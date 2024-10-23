import pool from '../config/db.js';

const adopcionService = {

// Crear una nueva solicitud de adopción
async addAdopcion(adopcionData) {
  try {
    const { horas_solo, tipo_vivienda, otras_mascotas, detalle_mascotas, patio, cerramiento, compromiso, comentario, FK_Mascota, FK_Usuario } = adopcionData;

    //Fecha de solicitud de adopción (día actual en formato date YYYY-MM-DD)
    const fecha_solicitud = new Date().toISOString().slice(0, 10);

    // Estado inicial de la solicitud de adopción
    const FK_Estado = 1;
    
    // Establecer eliminada en 0 cuando se crea una solicitud de adopción
    const eliminada = 0;

    // Agregar solicitud de adopción a la base de datos
    const [result] = await pool.query(
      `INSERT INTO Adopcion 
      (fecha_solicitud, horas_solo, tipo_vivienda, otras_mascotas, detalle_mascotas, patio, cerramiento, compromiso, 
       comentario, eliminada, FK_Mascota, FK_Usuario, FK_Estado) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fecha_solicitud,
        adopcionData.horas_solo,
        adopcionData.tipo_vivienda,
        adopcionData.otras_mascotas,
        adopcionData.detalle_mascotas,
        adopcionData.patio,
        adopcionData.cerramiento,
        adopcionData.compromiso,
        adopcionData.comentario,
        eliminada,
        adopcionData.FK_Mascota,
        adopcionData.FK_Usuario,
        FK_Estado
      ]
    );
    return result.insertId;
  } catch (error) {
    throw new Error(`Error al agregar solicitud: ${error.message}`);
  }
},

// Listar todas las solicitudes de adopción de un usuario
async listAdopcion() {
  try {
    const query = `
      SELECT m.*, l.nombre AS localidad, p.nombre AS provincia, pais.nombre AS pais 
      FROM Mascota m
      JOIN Usuario u ON m.FK_Usuario = u.PK_Usuario
      JOIN Direccion d ON u.FK_Direccion = d.PK_Direccion
      JOIN Localidad l ON d.FK_Localidad = l.PK_Localidad
      JOIN Provincia p ON l.FK_Provincia = p.PK_Provincia
      JOIN Pais pais ON p.FK_Pais = pais.PK_Pais
      WHERE m.eliminada = 0
    `;
    const [rows] = await pool.query(query);
    return rows.affectedRows > 0 ? rows : "No hay mascotas disponibles.";
  } catch (error) {
    throw new Error(`Error al obtener mascotas: ${error.message}`);
  }
},

// Listar todas las mascotas de un usuario
async listMascotasByUsuario(FK_Usuario) {
  try {
    const [rows] = await pool.query('SELECT * FROM Usuario WHERE PK_Usuario = ?', [FK_Usuario]);
    if (rows.length === 0) {
      return "El usuario solicitado no existe.";
    } else {
        const [rows] = await pool.query('SELECT * FROM Mascota WHERE FK_Usuario = ? AND eliminada = 0', [FK_Usuario]);
        return rows.affectedRows > 0 ? rows : "El usuario no tiene mascotas cargadas.";
    }
  } catch (error) {
    throw new Error(`Error al obtener mascotas del usuario con ID ${FK_Usuario}: ${error.message}`);
  }
},

// Listar todas las mascotas por País
async listMascotasByPais(FK_Pais) {
  try {
    const query = `
      SELECT m.*, l.nombre AS localidad, p.nombre AS provincia
      FROM Mascota m
      JOIN Usuario u ON m.FK_Usuario = u.PK_Usuario
      JOIN Direccion d ON u.FK_Direccion = d.PK_Direccion
      JOIN Localidad l ON d.FK_Localidad = l.PK_Localidad
      JOIN Provincia p ON l.FK_Provincia = p.PK_Provincia
      WHERE p.FK_Pais = ? AND m.eliminada = 0
    `;
    const [rows] = await pool.query(query, [FK_Pais]);
    return rows.length > 0 ? rows : "No hay mascotas en este país.";
  } catch (error) {
    throw new Error(`Error al obtener mascotas por país con ID ${FK_Pais}: ${error.message}`);
  }
},

// Listar todas las mascotas por Provincia
async listMascotasByProvincia(FK_Provincia) {
  try {
    const query = `
      SELECT m.*, l.nombre AS localidad
      FROM Mascota m
      JOIN Usuario u ON m.FK_Usuario = u.PK_Usuario
      JOIN Direccion d ON u.FK_Direccion = d.PK_Direccion
      JOIN Localidad l ON d.FK_Localidad = l.PK_Localidad
      WHERE l.FK_Provincia = ? AND m.eliminada = 0
    `;
    const [rows] = await pool.query(query, [FK_Provincia]);
    return rows.length > 0 ? rows : "No hay mascotas en esta provincia.";
  } catch (error) {
    throw new Error(`Error al obtener mascotas por provincia con ID ${FK_Provincia}: ${error.message}`);
  }
},

// Listar todas las mascotas por Localidad
async listMascotasByLocalidad(FK_Localidad) {
  try {
    const query = `
      SELECT * 
      FROM Mascota m
      JOIN Usuario u ON m.FK_Usuario = u.PK_Usuario
      JOIN Direccion d ON u.FK_Direccion = d.PK_Direccion
      WHERE d.FK_Localidad = ? AND m.eliminada = 0
    `;
    const [rows] = await pool.query(query, [FK_Localidad]);
    return rows.length > 0 ? rows : "No hay mascotas en esta localidad.";
  } catch (error) {
    throw new Error(`Error al obtener mascotas por localidad con ID ${FK_Localidad}: ${error.message}`);
  }
},

// Obtener una mascota por ID
async getMascotaById(id) {
  try {
    const query = `
      SELECT m.*, l.nombre AS localidad, p.nombre AS provincia, pais.nombre AS pais 
      FROM Mascota m
      JOIN Usuario u ON m.FK_Usuario = u.PK_Usuario
      JOIN Direccion d ON u.FK_Direccion = d.PK_Direccion
      JOIN Localidad l ON d.FK_Localidad = l.PK_Localidad
      JOIN Provincia p ON l.FK_Provincia = p.PK_Provincia
      JOIN Pais pais ON p.FK_Pais = pais.PK_Pais
      WHERE m.PK_Mascota = ? AND m.eliminada = 0
    `;
    const [rows] = await pool.query(query, [id]);
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
    const [result] = await pool.query('UPDATE Mascota SET eliminada = 1 WHERE PK_Mascota = ?', [id]);
    // Retorna true si se eliminó la mascota
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`Error al eliminar mascota con ID ${id}: ${error.message}`);
  }
},
};

export default adopcionService;