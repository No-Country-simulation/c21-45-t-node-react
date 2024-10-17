import db from '../config/db.js';

// Listar los valores ENUM de cada entidad para los select de la interfaz
export const getEnumValues = async (column, table) => {
    const connection = await db.getConnection();
    try {
      const [rows] = await connection.execute(`
        SELECT COLUMN_TYPE 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = ? 
        AND COLUMN_NAME = ?`,
        [table, column]
      );
  
      if (rows.length === 0) {
        throw new Error(`No se encontró la columna ${column} en la tabla ${table}`);
      }
  
      const enumString = rows[0].COLUMN_TYPE;
  
      const enumValues = enumString
        .substring(5, enumString.length - 1)
        .split("','")
        .map(value => value.replace(/'/g, ''));
  
      // Devuelve un array con los valores del ENUM
      return enumValues;
    } finally {
      connection.release();
    }
  };