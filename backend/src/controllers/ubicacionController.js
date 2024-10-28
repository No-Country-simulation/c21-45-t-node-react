import ubicacionService from '../services/ubicacionService.js';

// Listar todos los países
export const listPaises = async (req, res) => {
  try {
    const paises = await ubicacionService.listPaises();
    res.status(200).json(paises);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Listar todas las provincias de un país
export const listProvinciasByPais = async (req, res) => {
  try {
    const id = req.params.id;
    const provincias = await ubicacionService.listProvinciasByPais(id);
    res.status(200).json(provincias);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Listar todas las localidades de una provincia
export const listLocalidadesByProvincia = async (req, res) => {
  try {
    const id = req.params.id;
    const localidades = await ubicacionService.listLocalidadesByProvincia(id);
    res.status(200).json(localidades);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Listar todas las localidades que tengan mascotas en adopción
export const listLocalidadesConMascotas = async (req, res) => {
  try {
    const localidades = await ubicacionService.listLocalidadesConMascotas();
    res.status(200).json(localidades);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};