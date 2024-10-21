import "./Filtro_mascota.css";
import gatito from '../../images/gatito.png';

const Filtro_mascota = ({ mascota }) => {
  return (
    <div className="container">
      <div className="left">
        <h1>{mascota.nombre}</h1> 
        <img src={gatito} alt="Imagen de mascota" />
      </div>
      <div className="right">
        <div className="atributos">
          <h3>Edad</h3>
          <h3>Género</h3>
          <h3>Raza</h3>
          <h3>Vacunas</h3>
          <h3>Tratamientos recibidos</h3>
          <h3>Comportamiento con niños</h3>
          <h3>Comportamiento con animales</h3>
        </div>
        <div className="respuestas_atributos">
          <h3>{mascota.edad}</h3>
          <h3>{mascota.genero}</h3>
          <h3>{mascota.raza}</h3>
          <h3>{mascota.vacunas}</h3>
          <h3>{mascota.tratamientos}</h3>
          <h3>{mascota.niños}</h3>
          <h3>{mascota.animales}</h3>
        </div>
      </div>
    </div>
  );
};

export default Filtro_mascota;
