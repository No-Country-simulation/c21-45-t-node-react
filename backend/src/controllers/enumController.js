import * as enumService from '../services/enumService.js';

// Obtener los valores ENUM de cada entidad para los select de la interfaz (se debe enviar el atributo y la entidad)
export const getEnumValues = async (req, res) => {
    try {
      const enums = await enumService.getEnumValues(req.params.atributo, req.params.entidad);
      res.json({ enums });
    } catch (error) {
      console.error('Error obteniendo los valores ENUM:', error);
      res.status(500).json({ error: 'Error obteniendo los valores ENUM.' });
    }
  };