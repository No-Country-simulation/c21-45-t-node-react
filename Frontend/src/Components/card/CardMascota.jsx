import { Link } from 'react-router-dom';
import "./CardMascota.css";


function CardMascota({ mascota }) {

  const perro= "/perro.png"
  return (
    <div className="container-card">
      <Link to='/cards' className="link-card">
        <figure className="container-img">
          <img src={perro} alt={`Imagen de ${mascota.nombre}`} />
        </figure>

        <div className="contenido-card">
          <p className="titulo">{mascota.nombre}</p>
          <div className="caracteristicas">
            <p className="caracteristica">{mascota.genero}</p>
            <p className="caracteristica">{mascota.ubicacion}</p>
            <p className="caracteristica">{mascota.tipo}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardMascota;
