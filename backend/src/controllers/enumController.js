import enumService from '../services/enumService.js';

// Obtener los valores ENUM de cada entidad para los select de la interfaz (se debe enviar el atributo y la entidad)
export const getEnumValues = async (req, res) => {
    try {
      const atributo = req.params.atributo;
      const entidad = req.params.entidad;
      const enums = await enumService.getEnumValues(atributo, entidad);
      res.status(200).json({ enums });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };