import React from 'react';
import './FormularioRegistro.css';
import homeImage from '../../images/home_image.png';

const FormularioRegistro = () => {
    return (
        <div className="container--componente">
            <div>
                <img src={homeImage} alt="home_image" className="imagenFormulario" />
            </div>
            
            {/* Formulario de Registro*/}

            <div className="container--formulario" id="container--form">
                <h2 className="title">Datos de Registro</h2>

                <div className="container--datos">
                    <label htmlFor="nombre">Nombre Completo</label>
                    <input type="text" id="nombre" />
                    <br />

                    <label htmlFor="correo">Correo Electrónico</label>
                    <input type="email" id="correo" />
                    <br />

                    <label htmlFor="contrasena">Contraseña</label>
                    <input type="password" id="contrasena" />
                    <br />

                    <label htmlFor="telefono">Número de Teléfono</label>
                    <input type="number" id="telefono" />
                    <br />

                    <label htmlFor="direccion">Dirección</label>
                    <input type="text" id="direccion" />
                    <br />
                </div>

                <div id="boton-enviar">
                    <button type="submit" id="enviar">Enviar</button>
                </div>
            </div>
        </div>
    );
};

export default FormularioRegistro;
