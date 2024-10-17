import * as ubicacionService from '../services/ubicacionService.js';

// Listar todos los países
export const listPaises = async (req, res) => {
  try {
    const paises = await ubicacionService.listPaises();
    res.json(paises);
  } catch (error) {
    console.error('Error al obtener los países:', error);
    res.status(500).json({ error: 'Error al obtener los países.' });
  }
};

// Listar todas las provincias de un país
export const listProvinciasByPais = async (req, res) => {
  try {
    const id = req.params.id;
    const provincias = await ubicacionService.listProvinciasByPais(id);
    res.json(provincias);
  } catch (error) {
    console.error('Error al obtener las provincias:', error);
    res.status(500).json({ error: 'Error al obtener las provincias.' });
  }
};

// Listar todas las localidades de una provincia
export const listLocalidadesByProvincia = async (req, res) => {
  try {
    const id = req.params.id;
    const localidades = await ubicacionService.listLocalidadesByProvincia(id);
    res.json(localidades);
  } catch (error) {
    console.error('Error al obtener las localidades:', error);
    res.status(500).json({ error: 'Error al obtener las localidades.' });
  }
};