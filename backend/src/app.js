import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
import mascotaRoutes from './routes/mascotaRoutes.js';

// Configuración de las variables de entorno
dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para manejar las rutas
app.use('/api/mascota', mascotaRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la Plataforma de Adopción de Mascotas AdoptMe!');
});

// Inicializar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
