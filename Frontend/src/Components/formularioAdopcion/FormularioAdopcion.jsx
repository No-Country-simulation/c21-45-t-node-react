import React from 'react';
import './FormularioAdopcion.css';
import homeImage from '../../images/home_image.png';

export const FormularioAdopcion = () => {
  return (

    <div className="container--componente">
    <div>
        <img src={homeImage} alt="home_image" className="imagenFormulario" />
    </div>

    {/* Formulario de Adopción */}

    <div className="container--formulario" id="container--form">
        <h2 className="title">Formulario de Adopción</h2>

        <div className="container--datos">
            <label htmlFor="fechaSolicitud">Fecha de Solicitud</label>
            <input type="date" id="fechaSolicitud" />
            <br />

            <label htmlFor="fechaAprobacion">Fecha de Aprobación</label>
            <input type="date" id="fechaAprobacion" />
            <br />

            <label htmlFor="telefono">Número de Teléfono</label>
            <input type="number" id="telefono" />
            <br />

            <label htmlFor="tiempoSolo">Disposición de tiempo (Horas al día)</label>
            <input type="number" id="tiempoSolo" />
            <br />

            <label htmlFor="tipoVivienda">Tipo de vivienda</label>
            <input type="text" id="tipoVivienda" />
            <br />

            <label htmlFor="patio">¿Cuénta con patio?</label>
            <input type="checkbox" id="patio" />
            <br />

            <label htmlFor="otrasMascotas">¿Tiene otras mascotas?</label>
            <input type="checkbox" id="otrasMascotas" />
            <br />

            <label htmlFor="compromiso">¿Acepta términos y condiciones?</label>
            <input type="checkbox" id="compromiso" />
            <br />

        </div>

        <div id="boton-enviar">
            <button type="submit" id="enviar">Enviar</button>
        </div>
    </div>
</div>

  );
};

export default FormularioAdopcion;
