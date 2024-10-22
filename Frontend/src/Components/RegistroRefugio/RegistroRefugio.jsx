import React from 'react';
import './RegistroRefugio.css';
import homeImage from '../../images/home_image.png';

const RegistroRefugio = () => {
    return (
        <div className="container-componente">
            <div>
                <img src={homeImage} alt="home_image" className="imagenFormulario" />
            </div>

            {/* Formulario de Registro*/}

            <div className="container--formulario" id="container--form">
                <h2 className="title">Registro Refugio</h2>

                <div className="container--datos">

                    

                    <label htmlFor="nombre">Nombre del refugio</label>
                    <input type="text" id="nombre" />
                    <br />

                  
                    <label htmlFor="correo">Correo Electrónico</label>
                    <input type="email" id="correo" />
                    <br />

                    <label htmlFor="contrasena">Contraseña</label>
                    <input type="password" id="contrasena" />
                    <br />

                    <label htmlFor="contrasena">Repetir contraseña</label>
                    <input type="password" id="contrasena" />
                    <br />


                </div>

                <div id="boton-enviar">
                    <button type="submit" id="enviar">Enviar</button>
                </div>
            </div>
        </div>
    );
};

export default RegistroRefugio;
