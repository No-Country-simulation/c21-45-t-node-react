import mascotaService from '../services/mascotaService.js';

// Crear una nueva mascota
export const addMascota = async (req, res) => {
  try {
    const newMascota = req.body;
    const imageUrls = req.files.map((file) => file.path);
    const mascota = await mascotaService.addMascota(newMascota, imageUrls);
    // Retorna la nueva mascota creada
    res.status(201).json({ success: true, imageUrls });
  } catch (error) {
    console.error('Error al agregar mascota:', error);
    res.status(500).json({ error: 'Error al agregar la mascota.' });
  }
};

// Listar todas las mascotas
export const listMascotas = async (req, res) => {
  try {
    const mascotas = await mascotaService.listMascotas();
    // Retorna la lista de mascotas
    res.json(mascotas);
  } catch (error) {
    console.error('Error al obtener las mascotas:', error);
    res.status(500).json({ error: 'Error al obtener las mascotas.' });
  }
};

// Listar todas las mascotas de un usuario
export const listMascotasByUsuario = async (req, res) => {
  try {
    const mascotas = await mascotaService.listMascotasByUsuario(req.params.FK_Usuario);
    // Retorna la lista de mascotas del usuario
    res.json(mascotas);
  } catch (error) {
    console.error('Error al obtener las mascotas del usuario:', error);
    res.status(500).json({ error: 'Error al obtener las mascotas del usuario.' });
  }
};


// Listar todas las mascotas de un país
export const listMascotasByPais = async (req, res) => {
  try {
    const mascotas = await mascotaService.listMascotasByPais(req.params.FK_Pais);
    // Retorna la lista de mascotas del país
    res.json(mascotas);
  } catch (error) {
    console.error('Error al obtener las mascotas del país:', error);
    res.status(500).json({ error: 'Error al obtener las mascotas del país.' });
  }
};


// Listar todas las mascotas de una provincia
export const listMascotasByProvincia = async (req, res) => {
  try {
    const mascotas = await mascotaService.listMascotasByProvincia(req.params.FK_Provincia);
    // Retorna la lista de mascotas de la provincia
    res.json(mascotas);
  } catch (error) {
    console.error('Error al obtener las mascotas de la provincia:', error);
    res.status(500).json({ error: 'Error al obtener las mascotas de la provincia.' });
  }
};


// Listar todas las mascotas de una localidad
export const listMascotasByLocalidad = async (req, res) => {
  try {
    const mascotas = await mascotaService.listMascotasByLocalidad(req.params.FK_Localidad);
    // Retorna la lista de mascotas de la localidad
    res.json(mascotas);
  } catch (error) {
    console.error('Error al obtener las mascotas de la localidad:', error);
    res.status(500).json({ error: 'Error al obtener las mascotas de la localidad.' });
  }
};

// Obtener una mascota por ID
export const getMascotaById = async (req, res) => {
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
export const editMascota = async (req, res) => {
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
export const deleteMascota = async (req, res) => {
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

// Filtrar mascotas por especie, sexo, tamaño, edad, localidad, provincia y país
export const filtroMascotas = async (req, res) => {
  try {
    const filterData = req.body;
    const mascotas = await mascotaService.filtroMascotas(filterData);
    // Retorna la lista de mascotas filtradas
    res.json(mascotas);
  } catch (error) {
    console.error('Error al filtrar las mascotas:', error);
    res.status(500).json({ error: 'Error al filtrar las mascotas.' });
  }
};