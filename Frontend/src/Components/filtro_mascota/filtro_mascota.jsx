import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./Filtro_mascota.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
// import { formatDate } from "../../service/formatoFecha";

const Filtro_mascota = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { mascota } = location.state || {};
  const FK_Rol = user ? user.payload.FK_Rol : null;
  console.log("mascota adoptar", mascota);

  if (!mascota) {
    return <h2>No se encontró la información de la mascota</h2>;
  }

  // Estado para el índice de la imagen actual en el carrusel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Obtener las URLs de las imágenes
  let imagenesURL = [];

  if (typeof mascota.foto === "string") {
    try {
      const parsed = JSON.parse(mascota.foto);
      imagenesURL = Array.isArray(parsed) ? parsed : [mascota.foto];
    } catch (error) {
      imagenesURL = [mascota.foto]; // Caso en que solo haya una URL de imagen
    }
  }

  // Función para cambiar a la siguiente imagen
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagenesURL.length);
  };

  // Función para cambiar a la imagen anterior
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imagenesURL.length) % imagenesURL.length);
  };

  // Formatear la fecha de nacimiento

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container-mascota">

      <div className="container">

        <div className="left">
          <h1>{mascota.nombre}</h1>

          {/* Carrusel de imágenes */}
          <div className="carousel">

            <button onClick={prevImage} className="carousel-button"> ❮ </button>

            <img src={imagenesURL[currentImageIndex]} alt={`Imagen de ${mascota.nombre}`} className="carousel-image" />

            <button onClick={nextImage} className="carousel-button"> ❯ </button>

          </div>

          <div className="section">

            <div className="left_section">

              <div className="nombre-apellido">
                <p>Pertenece a: {mascota.usuario_nombre} {mascota.usuario_apellido}</p>
              </div>

              <div className="localidad-provincia">
                <p>Ubicación: {mascota.localidad}, {mascota.provincia}</p>
              </div>

              <div className="pais">
                <p>País: {mascota.pais}</p>
              </div>
            <div className="btnAdoptar">
            <Link to="/formulario-adopcion" state={{ PK_Mascota: mascota.PK_Mascota }}>
                {/* deshabilitar si FK_Rol es distinto de 2 o de null */}

                <button className="btn-adoptar" disabled={FK_Rol !== 2 && FK_Rol !== null}>
                  Solicitar adopción
                </button>
              </Link>
            </div>
            </div>


          </div>

        </div>





        <div className="right">
          {/* Aquí van los atributos de la mascota */}
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
          </div>
          <div className="respuestas_atributos">
            <h3>{mascota.especie}</h3>
            <h3>{mascota.raza}</h3>
            <h3>{mascota.sexo}</h3>
            <h3>{mascota.tamanio}</h3>
            <h3>
              {formatDate(mascota.fecha_nacimiento)} - {mascota.edad}
            </h3>
            <h3>{mascota.castrado === 1 ? "Sí" : "No"}</h3>
            <h3>{mascota.vacunado === 1 ? "Sí" : "No"}</h3>
            <h3>{mascota.amigable_ninos === 1 ? "Sí" : "No"}</h3>
            <h3>{mascota.amigable_perros === 1 ? "Sí" : "No"}</h3>
            <h3>{mascota.amigable_gatos === 1 ? "Sí" : "No"}</h3>
            <h3>{mascota.enfermedades}</h3>
            <h3>{mascota.detalle}</h3>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Filtro_mascota;
