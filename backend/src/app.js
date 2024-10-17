import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import mascotaRoutes from "./routes/mascotaRoutes.js";
import enumRoutes from "./routes/enumRoutes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import authRouter from "./routes/auth.routes.js";
import ubicacionRoutes from "./routes/ubicacionRoutes.js";

// Configuración de las variables de entorno
dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Middleware para manejar las rutas
app.use("/api/mascota", mascotaRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/auth", authRouter);
app.use("/api/enum", enumRoutes);
app.use("/api/ubicacion", ubicacionRoutes);

// Inicializar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
