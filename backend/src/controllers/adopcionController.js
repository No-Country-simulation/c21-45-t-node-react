import adopcionService from '../services/adopcionService.js';

// Crear una nueva solicitud de adopción
export const addAdopcion = async (req, res) => {
  try {
    const newAdopcion = req.body;
    const adopcion = await adopcionService.addAdopcion(newAdopcion);
    // Retorna la nueva solicitud de adopción creada y mensaje de éxito
    res.json({ success: 'Solicitud de adopción creada.', adopcion });
  } catch (error) {
    console.error('Error al agregar la solicitud de adopción:', error);
    res.status(500).json({ error: 'Error al agregar la solicitud de adopción.' });
  }
};

// Listar todas las solicitudes de adopción enviadas de un usuario
export const listAdopcionSolicitada = async (req, res) => {
  try {
    const adopcion = await adopcionService.listAdopcionSolicitada(req.params.FK_Usuario);
    // Retorna la lista de solicitudes de adopción enviadas
    if (adopcion.length === 0) {
      return res.status(404).json({ error: 'No se encontraron solicitudes de adopción.' });
    } else {
        res.json(adopcion);
    };
  } catch (error) {
    console.error('Error al obtener las solicitudes de adopción enviadas:', error);
    res.status(500).json({ error: 'Error al obtener las solicitudes de adopción enviadas.' });
  }
};

// Listar todas las solicitudes de adopción recibidas por un usuario
export const listAdopcionRecibida = async (req, res) => {
  try {
    const adopcion = await adopcionService.listAdopcionRecibida(req.params.FK_Usuario);
    // Retorna la lista de solicitudes de adopción recibidas
    if (adopcion.length === 0) {
      return res.status(404).json({ error: 'No se encontraron solicitudes de adopción.' });
    } else {
        res.json(adopcion);
    };
  } catch (error) {
    console.error('Error al obtener las solicitudes de adopción recibidas:', error);
    res.status(500).json({ error: 'Error al obtener las solicitudes de adopción recibidas.' });
  }
};

// Obtener una solicitud de adopción por ID
export const getAdopcionById = async (req, res) => {
  try {
    const adopcion = await adopcionService.getAdopcionById(req.params.id);
    if (!adopcion) {
      return res.status(404).json({ error: 'Solicitud de adopción no encontrada.' });
    }
    res.json(adopcion);
  } catch (error) {
    console.error('Error al obtener la solicitud de adopción:', error);
    res.status(500).json({ error: 'Error al obtener la solicitud de adopción.' });
  }
};

// Editar una solicitud de adopción
export const editAdopcion = async (req, res) => {
  try {
    const editedAdopcion = await adopcionService.editAdopcion(req.body, req.params.id);
    if (!editedAdopcion) {
      return res.status(404).json({ error: 'Solicitud de adopción no encontrada.' });
    }
    res.json({ success: 'Solicitud de adopción actualizada.' });
  } catch (error) {
    console.error('Error al actualizar la solicitud de adopción:', error);
    res.status(500).json({ error: 'Error al actualizar la solicitud de adopción.' });
  }
};

// Eliminar una solicitud de adopción
export const deleteAdopcion = async (req, res) => {
  try {
    const result = await adopcionService.deleteAdopcion(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Solicitud de adopción no encontrada.' });
    }
    // Devuelve un mensaje de éxito
    res.json({ success: 'Solicitud de adopción eliminada.' });
  } catch (error) {
    console.error('Error al eliminar la solicitud de adopción:', error);
    res.status(500).json({ error: 'Error al eliminar la solicitud de adopción.' });
  }
};

// Aceptar una solicitud de adopción
export const acceptAdopcion = async (req, res) => {
  try {
    const adopcion = await adopcionService.acceptAdopcion(req.params.id);
    if (!adopcion) {
      return res.status(404).json({ error: 'Solicitud de adopción no encontrada.' });
    };
    // Retorna un mensaje de éxito
    res.json({ success: 'Solicitud de adopción aceptada.' });
  } catch (error) {
    console.error('Error al aceptar la solicitud de adopción:', error);
    res.status(500).json({ error: 'Error al aceptar la solicitud de adopción.' });
  }
};

// Rechazar una solicitud de adopción
export const rejectAdopcion = async (req, res) => {
  try {
    const adopcion = await adopcionService.rejectAdopcion(req.params.id);
    if (!adopcion) {
      return res.status(404).json({ error: 'Solicitud de adopción no encontrada.' });
    };
    // Retorna un mensaje de éxito
    res.json({ success: 'Solicitud de adopción rechazada.' });
  } catch (error) {
    console.error('Error al rechazar la solicitud de adopción:', error);
    res.status(500).json({ error: 'Error al rechazar la solicitud de adopción.' });
  }
};