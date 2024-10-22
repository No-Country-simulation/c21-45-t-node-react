// TODO: Luego borrar este archivo

import { Router } from "express";
import { imageUploader } from "./uploader.js"; // Tu middleware de multer para imágenes

const router = Router();

// Endpoint para agregar una mascota con múltiples imágenes
router.post("/", imageUploader.array("mascotaImages", 5), async (req, res) => {
  try {
    const imageUrls = req.files.map((file) => file.path); // URLs de las imágenes subidas a Cloudinary
    // Aquí insertas la información de la mascota y las URLs de las imágenes en la base de datos
    await addMascota(req.body, imageUrls);
    res.json({ success: true, imageUrls });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar la mascota" });
  }
});

export default router;

// LLamada que se deberia hacer desde el front:
/*
const formData = new FormData();
formData.append('nombre', 'Firulais');
formData.append('descripcion', 'Un perro amistoso');

// Añadir múltiples imágenes
const images = document.getElementById('mascotaImages').files;
for (let i = 0; i < images.length; i++) {
  formData.append('mascotaImages', images[i]);
}

// Enviar al backend
axios.post('http://localhost:3001/api/mascotas', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',  
  },
})
  .then(response => {
    console.log('Mascota agregada con éxito:', response.data);
  })
  .catch(error => {
    console.error('Error al agregar la mascota:', error);
  });

*/
