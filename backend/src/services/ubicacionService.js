import db from '../config/db.js';

// Listar todos los países´
export const listPaises = async () => {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute(`SELECT * FROM Pais ORDER BY nombre`);
    return rows;
  } finally {
    connection.release();
  }
};

// Listar todas las provincias de un país
export const listProvinciasByPais = async (id) => {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute(`SELECT * FROM Provincia WHERE FK_Pais = ? ORDER BY nombre`, [id]);
    return rows;
  } finally {
    connection.release();
  }
};

// Listar todas las localidades de una provincia
export const listLocalidadesByProvincia = async (id) => {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute(`SELECT * FROM Localidad WHERE FK_Provincia = ? ORDER BY nombre`, [id]);
    return rows;
  } finally {
    connection.release();
  }
};