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
},

};

export default adopcionService;