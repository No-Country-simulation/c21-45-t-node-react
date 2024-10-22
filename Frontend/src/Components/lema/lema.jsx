import React from 'react';
import './Lema.css'; 

const Lema = () => {
  const perro= "/ph_dog.png"
  const gato= "/ph_cat.png"
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
