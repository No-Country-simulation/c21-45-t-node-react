import React from 'react';
import { Link } from 'react-router-dom'; 
import './HomePage.css'; 
import homeImage from '../../../images/home_image.png'; 
import gato from '../../../images/Rectangulo_gato.png';
import perro from '../../../images/rectangulo_perro.png';
import lupa from '../../../images/ph_magnifying-glass.png';
import Search from '../../../pages/search/search'; 

const HomePage = () => {
  return (
    <>
      <div className="home-container">
        {/* Sección izquierda con el texto */}
        <div className="home-left">
          <h1 className="main-title">Dales una segunda oportunidad, encuentra a tu nuevo mejor amigo</h1>
          
          {/* Sección con el formulario */}
          <div className="search-section">
            <h2>¡Encuentra a tu compañero!</h2>
            <p>¿Qué mascota estás buscando?</p>
            <div className="container-masc">
              <Link to="/mascotas-gato"><img src={gato} alt="Gato" /></Link>
              <Link to="/mascotas-perro"><img src={perro} alt="Perro" /></Link>
            </div>
            <p>¿De dónde eres?</p>
            
            {/* Input de texto */}
            <div className="buscador">
              <input type="text" className="search-input" placeholder="Escribe aquí..." />
              <Link to="/search">
                <img 
                  src={lupa} 
                  alt="Buscar" 
                  className="search-icon" 
                  style={{ cursor: 'pointer' }} 
                />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Sección derecha con la imagen */}
        <div className="home-right">
          <img src={homeImage} alt="Mascotas Inicio" className="main-image" />
        </div>
      </div>

      {/* Componente Search debajo de HomePage */}
      <div className="search-component">
        <Search /> 
      </div>
    </>
  );
};

export default HomePage;
