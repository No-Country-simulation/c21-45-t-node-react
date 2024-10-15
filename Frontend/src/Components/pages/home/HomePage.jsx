import React from 'react';
import './HomePage.css'; 
import homeImage from '../../../images/home_image.png'; 
import gato from '../../../images/Rectangulo_gato.png';
import perro from '../../../images/rectangulo_perro.png';
import lupa from '../../../images/ph_magnifying-glass.png';
import CardMascota from '../../card/CardMascota';



const HomePage = () => {
  return (
    <div className="home-container">
      {/* Sección izquierda con el texto */}
      <div className="home-left">
        <h1 className="main-title">Dales una segunda oportunidad, encuentra a tu nuevo mejor amigo</h1>
        
        {/* Sección con el formulario */}
        <div className="search-section">
          <h2>¡Encuentra a tu compañero!</h2>
          <p>¿Qué mascota estás buscando?</p>
          <div className="container-masc">
          <a href="http:/mascotas-gato"><img src={gato} alt="" srcset="" /></a>
          <a href="http:/mascotas-perro"><img src={perro} alt="" srcset="" /></a>
          </div>
          <p>¿De dónde eres?</p>
          
          {/* Input de texto */}
          <div className="buscador">
          <input type="text" className="search-input" placeholder="Escribe aquí..."/>
          <img src={lupa} alt="" srcset="" />
          </div>

        </div>
      </div>
      
      {/* Sección derecha con la imagen */}
      <div className="home-right">
        <img src={homeImage} alt="Mascotas Inicio" className="main-image" />
      </div>

     

    
    </div>
  );
};

export default HomePage;
