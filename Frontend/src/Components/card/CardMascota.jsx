import { Link } from 'react-router-dom';
import "./CardMascota.css";


function CardMascota({ mascota }) {

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

  const perro= "/perro.png"
  return (
    <div className="container-card">
      <Link to='/cards' className="link-card">
        <figure className="container-img">
          <img src={imagenURL} alt={`Imagen de ${mascota.nombre}`} />
        </figure>

        <div className="contenido-card">
          <p className="titulo">{mascota.nombre}</p>
          <div className="caracteristicas">
            <p className="caracteristica">{mascota.sexo}</p>
            <p className="caracteristica">{mascota.provincia}</p>
            <p className="caracteristica">{mascota.raza}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardMascota;
