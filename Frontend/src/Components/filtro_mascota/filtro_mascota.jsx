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

  return (
    <div className="container-mascota">
      <div className="container">
        <div className="left">
          <h1>{mascota.nombre}</h1>
          <img src={gatito} alt="Imagen de mascota" />
        </div>
        <div className="right">
          <div className="atributos">
            <h3>Especie</h3>
            <h3>Raza</h3>
            <h3>Género</h3>
            <h3>Tamaño</h3>
            <h3>Fecha de nacimiento</h3>
            <h3>Castrado</h3>
            <h3>Amigable con niños</h3>
            <h3>Amigable con perros</h3>
            <h3>Amigable con gatos</h3>


          </div>
          <div className="respuestas_atributos">
            <h3>{mascota.especie}</h3>
            <h3>{mascota.raza}</h3>
            <h3>{mascota.genero}</h3>
            <h3>{mascota.tamanio}</h3>
            <h3>{mascota.nacimiento}</h3>
            <h3>{mascota.castrado}</h3>
            <h3>{mascota.ninos}</h3>
            <h3>{mascota.perro}</h3>
            <h3>{mascota.gatos}</h3>

          </div>
        </div>
      </div>
      <Contacto />
    </div>
  );
};

export default Filtro_mascota;
