import { useLocation } from "react-router-dom";
import Contacto from "../contacto/contacto";
import "./Filtro_mascota.css";
;

const Filtro_mascota = () => {
  const gatito= "/gatito.png"
  const location = useLocation();
  const { mascota } = location.state || {}; 

  if (!mascota) {
    return <h2>No se encontró la información de la mascota</h2>;
  }

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  // Obtener la URL de la imagen
  let imagenURL = mascota.foto;

  if (typeof imagenURL === "string") {
    try {
      const parsed = JSON.parse(imagenURL);
      imagenURL = Array.isArray(parsed) ? parsed[0] : imagenURL;
    } catch (error) {
      // No hacer nada, la URL ya es una cadena válida
    }
  }

  return (
    <div className="container-mascota">
      <div className="container">
        <div className="left">
          <h1>{mascota.nombre}</h1>
          <img src={imagenURL} alt={`Imagen de ${mascota.nombre}`} />
        </div>
        <div className="right">
          <div className="atributos">
            <h3>Especie</h3>
            <h3>Raza</h3>
            <h3>Género</h3>
            <h3>Tamaño</h3>
            <h3>Fecha de nacimiento</h3>
            <h3>Castrado</h3>
            <h3>Vacunado</h3>
            <h3>Amigable con niños</h3>
            <h3>Amigable con perros</h3>
            <h3>Amigable con gatos</h3>
            <h3>Enfermedades</h3>
            <h3>Detalles</h3>
            <h3>Localidad - Provincia</h3>
            <h3>País</h3>
            <h3>Mascota publicada por</h3>


          </div>
          <div className="respuestas_atributos">
            <h3>{mascota.especie}</h3>
            <h3>{mascota.raza}</h3>
            <h3>{mascota.sexo}</h3>
            <h3>{mascota.tamanio}</h3>
            <h3>{formatDate(mascota.fecha_nacimiento)} - {mascota.edad}</h3>
            <h3>{mascota.castrado === 1 ? "Sí" : "No"}</h3>
            <h3>{mascota.vacunado === 1 ? "Sí" : "No"}</h3>
            <h3>{mascota.amigable_ninos === 1 ? "Sí" : "No"}</h3>
            <h3>{mascota.amigable_perros === 1 ? "Sí" : "No"}</h3>
            <h3>{mascota.amigable_gatos === 1 ? "Sí" : "No"}</h3>
            <h3>{mascota.enfermedades}</h3>
            <h3>{mascota.detalle}</h3>
            <h3>{mascota.localidad} - {mascota.provincia}</h3>
            <h3>{mascota.pais}</h3>
            <h3>{mascota.usuario_nombre} {mascota.usuario_apellido}</h3>
          </div>
        </div>
      </div>
      <Contacto />
    </div>
  );
};

export default Filtro_mascota;
