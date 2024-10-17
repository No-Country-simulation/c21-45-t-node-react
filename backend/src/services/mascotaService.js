import db from '../config/db.js';

// Crear una nueva mascota
export const addMascota = async (newMascota) => {
  // Se chequea que ninguno de los campos obligatorios esté vacío
    if (!newMascota.nombre || !newMascota.especie || !newMascota.raza || !newMascota.sexo || !newMascota.tamanio || !newMascota.fecha_nacimiento || !newMascota.castrado || !newMascota.vacunado || !newMascota.amigable_ninos || !newMascota.amigable_perros || !newMascota.amigable_gatos || !newMascota.enfermedades || !newMascota.detalle || !newMascota.foto || !newMascota.FK_Refugio) {
        return "Todos los campos son obligatorios.";
    };

  const connection = await db.getConnection();
  try {
    const [result] = await connection.execute(
      `INSERT INTO Mascota 
      (nombre, especie, raza, sexo, tamanio, fecha_nacimiento, castrado, vacunado, 
       amigable_ninos, amigable_perros, amigable_gatos, enfermedades, detalle, foto, FK_Refugio) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newMascota.nombre,
        newMascota.especie,
        newMascota.raza,
        newMascota.sexo,
        newMascota.tamanio,
        newMascota.fecha_nacimiento,
        newMascota.castrado,
        newMascota.vacunado,
        newMascota.amigable_ninos,
        newMascota.amigable_perros,
        newMascota.amigable_gatos,
        newMascota.enfermedades,
        newMascota.detalle,
        newMascota.foto,
        newMascota.FK_Refugio
      ]
    );
    return { id: result.insertId, ...newMascota };
  } finally {
    connection.release();
  }
};

// Obtener todas las mascotas
export const listMascotas = async () => {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute('SELECT * FROM Mascota');
    return rows.affectedRows > 0 ? rows : "No hay mascotas disponibles.";
  } finally {
    connection.release();
  }
};

// Obtener todas las mascotas de un refugio
export const listMascotasByRefugio = async (refugioId) => {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute('SELECT * FROM refugio WHERE PK_Refugio = ?', [refugioId]);
    if (rows.length === 0) {
      return "El refugio solicitado no existe.";
    } else {
        const [rows] = await connection.execute('SELECT * FROM Mascota WHERE FK_Refugio = ?', [refugioId]);
        return rows.affectedRows > 0 ? rows : "El refugio no tiene mascotas cargadas.";
    }
  } finally {
        connection.release();
  }
};

// Obtener una mascota por ID
export const getMascotaById = async (id) => {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute('SELECT * FROM Mascota WHERE PK_Mascota = ?', [id]);
    return rows[0] || null;
  } finally {
    connection.release();
  }
};

// Editar una mascota
export const editMascota = async (id, updatedMascota) => {
  // Se chequea que ninguno de los campos obligatorios esté vacío
    if (!updatedMascota.nombre || !updatedMascota.especie || !updatedMascota.raza || !updatedMascota.sexo || !updatedMascota.tamanio || !updatedMascota.fecha_nacimiento || !updatedMascota.castrado || !updatedMascota.vacunado || !updatedMascota.amigable_ninos || !updatedMascota.amigable_perros || !updatedMascota.amigable_gatos || !updatedMascota.enfermedades || !updatedMascota.detalle || !updatedMascota.foto) {
      return "Todos los campos son obligatorios.";
    }
    
  const connection = await db.getConnection();
  try {
    
    const [result] = await connection.execute(
      `UPDATE Mascota SET 
      nombre = ?, especie = ?, raza = ?, sexo = ?, tamanio = ?, 
      fecha_nacimiento = ?, castrado = ?, vacunado = ?, 
      amigable_ninos = ?, amigable_perros = ?, amigable_gatos = ?, 
      enfermedades = ?, detalle = ?, foto = ? 
      WHERE PK_Mascota = ?`,
      [
        updatedMascota.nombre,
        updatedMascota.especie,
        updatedMascota.raza,
        updatedMascota.sexo,
        updatedMascota.tamanio,
        updatedMascota.fecha_nacimiento,
        updatedMascota.castrado,
        updatedMascota.vacunado,
        updatedMascota.amigable_ninos,
        updatedMascota.amigable_perros,
        updatedMascota.amigable_gatos,
        updatedMascota.enfermedades,
        updatedMascota.detalle,
        updatedMascota.foto,
        id
      ]
    );
    return result.affectedRows > 0 ? { id, ...updatedMascota } : null; 
  } finally {
    connection.release();
  }
};

// Eliminar una mascota
export const deleteMascota = async (id) => {
  const connection = await db.getConnection();
  try {
    const [result] = await connection.execute('DELETE FROM Mascota WHERE PK_Mascota = ?', [id]);
    // Retorna true si se eliminó la mascota
    return result.affectedRows > 0;
  } finally {
    connection.release();
  }
};