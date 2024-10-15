import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
import mascotaRoutes from './routes/mascotaRoutes.js';
import enumRoutes from './routes/enumRoutes.js';

// Configuración de las variables de entorno
dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para manejar las rutas
app.use('/api/mascota', mascotaRoutes);
app.use('/api/enum', enumRoutes);

// Inicializar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
