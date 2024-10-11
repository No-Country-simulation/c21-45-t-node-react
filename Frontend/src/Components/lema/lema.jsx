import React from 'react';
import './Lema.css'; // Asegúrate de importar el archivo CSS

// Importa la imagen que deseas usar de fondo
import perro from '../../images/ph_dog.png'; // Cambia la ruta según tu estructura de carpetas
import gato from '../../images/ph_cat.png'; // Cambia la ruta según tu estructura de carpetas

const Lema = () => {
  return (
    <div className="lema-container">
        <img src={gato} alt="" />
      <div className="lema-texto">
        <h2>Tu decisión puede cambiar una vida.</h2>
        <h2 >Dale a tu mascota la oportunidad de un nuevo comienzo.</h2>
      </div>
      <img src={perro} alt="" />

    </div>
  );
};

export default Lema;
