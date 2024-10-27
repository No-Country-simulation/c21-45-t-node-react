import React, { useState } from 'react';
import './Pregunta.css'; // Importa el archivo CSS

const Pregunta = ({ pregunta, respuesta}) => {
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);

  const manejarClick = () => {
    setMostrarRespuesta(!mostrarRespuesta);
  };

  return (
    <div className="pregunta-container">
      <div className="pregunta-text" onClick={manejarClick}>
        
        <h3>{pregunta}</h3>
        <span className='flecha'><img src="/flecha.png" alt="" srcSet="" /></span> 
      </div>

      <div className={`respuesta-container ${mostrarRespuesta ? 'mostrar' : ''}`}>
        <p>{respuesta}</p>
      </div>
    </div>
  );
};

export default Pregunta;
