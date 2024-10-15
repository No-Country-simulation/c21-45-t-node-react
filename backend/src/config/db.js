import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Pool de conexiones a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const getConnection = async () => {
  return await pool.getConnection();
};

// Exporta el pool y la función getConnection como objeto predeterminado
export default {
  pool,
  getConnection,
};

// Test de conexión
(async () => {
  try {
    const connection = await getConnection();
    console.log('Conexión a la base de datos exitosa.');
    connection.release();
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
  }
})();