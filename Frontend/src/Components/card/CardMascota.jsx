import { Link } from "react-router-dom";
import "./CardMascota.css";

function CardMascota({ mascota }) {
  // Obtener la URL de la imagen
  let imagenURL = mascota.foto;

  if (typeof imagenURL === "string") {
    try {
      const parsed = JSON.parse(imagenURL);
      imagenURL = Array.isArray(parsed) ? parsed[0] : imagenURL;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container-card">
      <Link to="/detalle-mascota" className="link-card">
        <figure className="container-img">
          <img src={imagenURL} alt={`Imagen de ${mascota.nombre}`} />
        </figure>

        <div className="contenido-card">
          <p className="titulo">
            <span className="icono-animal">{mascota.especie == "Perro" ? "🐶" : "🐱"} </span>
            {mascota.nombre}
          </p>
          <div className="caracteristicas">
            <div className="caracteristicas-principal">
              <span className="caracteristica">{mascota.sexo}</span>
              <span className="caracteristica">{mascota.edad}</span>
            </div>
            <div className="caracteristicas-ubicacion">
              <span className="icono-ubicacion">📍</span>
              <span className="ubicacion-texto">
                {mascota.provincia}, {mascota.pais}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardMascota;
