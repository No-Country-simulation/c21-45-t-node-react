import "./CardMascota.css";
import perro from '../../images/perro.png'

function CardMascota({ mascota }) {
  return (
    <div className="container-card">
      <figure className="container-img">
        <img src={perro} alt="" />
      </figure>

      <div className="contenido-card">
        <p className="titulo">{mascota.nombre}</p>
        <div className="caracteristicas">
          <p className="caracteristica">{mascota.genero}</p>
          <p className="caracteristica">{mascota.ubicacion}</p>
          <p className="caracteristica">{mascota.tipo}</p>
        </div>
      </div>
    </div>
  );
}

export default CardMascota;
