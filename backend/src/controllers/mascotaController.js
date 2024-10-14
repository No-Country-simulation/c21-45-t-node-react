const mascotaService = require('../services/mascotaService');

// Crear una nueva mascota
exports.addMascota = async (req, res) => {
  try {
    const newMascota = req.body;
    const mascota = await mascotaService.addMascota(newMascota);
    // Retorna la nueva mascota creada
    res.status(201).json(mascota);
  } catch (error) {
    console.error('Error al agregar mascota:', error);
    res.status(500).json({ error: 'Error al agregar la mascota.' });
  }
};

// Obtener todas las mascotas
exports.listMascotas = async (req, res) => {
  try {
    const mascotas = await mascotaService.listMascotas();
    // Retorna la lista de mascotas
    res.json(mascotas);
  } catch (error) {
    console.error('Error al obtener las mascotas:', error);
    res.status(500).json({ error: 'Error al obtener las mascotas.' });
  }
};

// Obtener todas las mascotas de un refugio
exports.listMascotasByRefugio = async (req, res) => {
  try {
    const mascotas = await mascotaService.listMascotasByRefugio(req.params.id);
    // Retorna la lista de mascotas del refugio
    res.json(mascotas);
  } catch (error) {
    console.error('Error al obtener las mascotas del refugio:', error);
    res.status(500).json({ error: 'Error al obtener las mascotas del refugio.' });
  }
};

// Obtener una mascota por ID
exports.getMascotaById = async (req, res) => {
  try {
    const mascota = await mascotaService.getMascotaById(req.params.id);
    if (!mascota) {
      return res.status(404).json({ error: 'Mascota no encontrada.' });
    }
    // Retorna la mascota encontrada
    res.json(mascota);
  } catch (error) {
    console.error('Error al obtener la mascota:', error);
    res.status(500).json({ error: 'Error al obtener la mascota.' });
  }
};

// Editar una mascota
exports.editMascota = async (req, res) => {
  try {
    const editedMascota = await mascotaService.editMascota(req.params.id, req.body);
    if (!editedMascota) {
      return res.status(404).json({ error: 'Mascota no encontrada.' });
    }
    // Retorna la mascota actualizada
    res.json(editedMascota);
  } catch (error) {
    console.error('Error al actualizar la mascota:', error);
    res.status(500).json({ error: 'Error al actualizar la mascota.' });
  }
};

// Eliminar una mascota
exports.deleteMascota = async (req, res) => {
  try {
    const result = await mascotaService.deleteMascota(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Mascota no encontrada.' });
    }
    // Respuesta vacía para indicar que fue eliminado
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la mascota:', error);
    res.status(500).json({ error: 'Error al eliminar la mascota.' });
  }
};