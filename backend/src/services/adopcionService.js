import pool from '../config/db.js';

const adopcionService = {

// Crear una nueva solicitud de adopción
async addAdopcion(adopcionData) {
  try {
    const { horas_solo, tipo_vivienda, otras_mascotas, detalle_mascotas, patio, cerramiento, compromiso, comentario, FK_Mascota, FK_Usuario } = adopcionData;

    // Validar que los campos obligatorios no estén vacíos
    if (!horas_solo || !tipo_vivienda || !otras_mascotas || !patio || !cerramiento || !compromiso || !FK_Mascota || !FK_Usuario) {
      throw new Error('Faltan campos obligatorios');
    }

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
    // Devolver el ID de la solicitud de adopción creada
    return result.insertId;
  } catch (error) {
    throw new Error(`Error al agregar solicitud: ${error.message}`);
  }
},

// Listar todas las solicitudes de adopción enviadas de un usuario
async listAdopcionSolicitada(FK_Usuario) {
  try {
    const [result] = await pool.query(
      `SELECT a.*, m.nombre FROM Adopcion a JOIN Mascota m ON a.FK_Mascota = m.PK_Mascota WHERE a.FK_Usuario = ? AND a.eliminada = 0`, [FK_Usuario]);

      return result;
  } catch (error) {
    throw new Error(`Error al obtener solicitudes de adopción: ${error.message}`);
  }
},

// Listar todas las solicitudes de adopción recibidas por un usuario
async listAdopcionRecibida(FK_Usuario) {
  try {
    const [result] = await pool.query(
      `SELECT a.*, m.nombre,
        u.nombre AS nombre_usuario, u.apellido AS apellido_usuario, u.email AS email_usuario, u.telefono AS telefono_usuario 
        FROM Adopcion a
        JOIN Mascota m ON a.FK_Mascota = m.PK_Mascota 
        JOIN Usuario u ON a.FK_Usuario = u.PK_Usuario 
        WHERE m.FK_Usuario = ? AND a.eliminada = 0`, 
      [FK_Usuario]
    );

        return result;
  } catch (error) {
    throw new Error(`Error al obtener solicitudes de adopción: ${error.message}`);
  }
},

// Obtener una solicitud de adopción por su ID
async getAdopcionById(id) {
  try {
    const [result] = await pool.query(`SELECT * FROM Adopcion WHERE PK_Adopcion = ?`, [id]);
    return result[0];
  } catch (error) {
    throw new Error(`Error al obtener solicitud de adopción: ${error.message}`);
  }
},

// Editar una solicitud de adopción
async editAdopcion(adopcionData, id) {
  try {
    const { horas_solo, tipo_vivienda, otras_mascotas, detalle_mascotas, patio, cerramiento, compromiso, comentario } = adopcionData;

    // Validar que los campos obligatorios no estén vacíos
    if (!id || !horas_solo || !tipo_vivienda || !otras_mascotas || !patio || !cerramiento || !compromiso) {
      throw new Error('Faltan campos obligatorios');
    }

    // Actualizar solicitud de adopción en la base de datos
    const [result] = await pool.query(
      `UPDATE Adopcion SET horas_solo = ?, tipo_vivienda = ?, otras_mascotas = ?, detalle_mascotas = ?, patio = ?, cerramiento = ?, compromiso = ?, comentario = ? WHERE PK_Adopcion = ?`,
      [horas_solo, tipo_vivienda, otras_mascotas, detalle_mascotas, patio, cerramiento, compromiso, comentario, id]
    );
    return result.affectedRows;
  } catch (error) {
    throw new Error(`Error al actualizar solicitud de adopción: ${error.message}`);
  }
},

// Eliminar una solicitud de adopción
async deleteAdopcion(id) {
  try {
    const [result] = await pool.query(`UPDATE Adopcion SET eliminada = 1 WHERE PK_Adopcion = ?`, [id]);
    return result.affectedRows;
  } catch (error) {
    throw new Error(`Error al eliminar solicitud de adopción: ${error.message}`);
  }
},

// Aceptar una solicitud de adopción
async acceptAdopcion(id) {
  try {
    // Fecha de aprobación de adopción (día actual en formato date YYYY-MM-DD)
    const fecha_aprobacion = new Date().toISOString().slice(0, 10);

    // Estado de la solicitud de adopción
    const FK_Estado = 2;

    // Actualizar el estado de la solicitud de adopción
    const [adopcionResult] = await pool.query(
      `UPDATE Adopcion SET FK_Estado = ?, fecha_aprobacion = ? WHERE PK_Adopcion = ?`,
      [FK_Estado, fecha_aprobacion, id]
    );

    if (adopcionResult.affectedRows === 0) {
      throw new Error('No se encontró la solicitud de adopción con el ID proporcionado.');
    }

    // Obtener el FK_Mascota asociado con la solicitud de adopción
    const [adopcionData] = await pool.query(
      `SELECT FK_Mascota FROM Adopcion WHERE PK_Adopcion = ?`,
      [id]
    );

    if (adopcionData.length === 0) {
      throw new Error('No se encontró la mascota asociada a la solicitud de adopción.');
    }

    const FK_Mascota = adopcionData[0].FK_Mascota;

    // Actualizar la tabla Mascota para establecer eliminada = 1
    const [mascotaResult] = await pool.query(
      `UPDATE Mascota SET eliminada = 1 WHERE PK_Mascota = ?`,
      [FK_Mascota]
    );

    return mascotaResult.affectedRows;
  } catch (error) {
    throw new Error(`Error al aceptar solicitud de adopción: ${error.message}`);
  }
},

// Rechazar una solicitud de adopción
async rejectAdopcion(id) {
  try {
    // Estado de la solicitud de adopción
    const FK_Estado = 3;

    const [result] = await pool.query(
      `UPDATE Adopcion SET FK_Estado = ? WHERE PK_Adopcion = ?`,
      [FK_Estado, id]
    );
      return result.affectedRows;
  } catch (error) {
    throw new Error(`Error al rechazar solicitud de adopción: ${error.message}`);
  }
},
};

export default adopcionService;