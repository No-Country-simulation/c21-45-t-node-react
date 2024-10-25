import React, { useState } from 'react';
import './FormularioAdopcion.css';

export const FormularioAdopcion = () => {

    const homeImage = "/home_image.png"

    const [patio, setPatio] = useState('');
    const [otrasMascotas, setOtrasMascotas] = useState('');
    const [compromiso, setCompromiso] = useState('');

    const handlePatioChange = (event) => {
        setPatio(event.target.value);
    }

    const handleMascotasChange = (event) => {
        setOtrasMascotas(event.target.value);
    }

    const handleCompromisoChange = (event) => {
        setCompromiso(event.target.value);
    }

    return (

        <div className="container--componente">
            <div>
                <img src={homeImage} alt="home_image" className="imagenFormulario" />
            </div>

            {/* Formulario de Adopción */}

            <div className="container--formulario" id="container--form">
                <h2 className="title">Formulario de Adopción</h2>

                <div className="separator">
                    <p>Completa la información solicitada</p>
                </div>

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

                    <label htmlFor="patio">¿Cuentas con patio en casa?</label>
                    <label>
                        <input
                            type="radio"
                            value="Sí"
                            checked={patio === 'Sí'}
                            onChange={handlePatioChange}
                        />
                        Sí
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="No"
                            checked={patio === 'No'}
                            onChange={handlePatioChange}
                        />
                        No
                    </label>
                    <br />

                    <label htmlFor="otrasMascotas">¿Tienes otras mascotas?</label>
                    <label>
                        <input
                            type="radio"
                            value="Sí"
                            checked={otrasMascotas === 'Sí'}
                            onChange={handleMascotasChange}
                        />
                        Sí
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="No"
                            checked={otrasMascotas === 'No'}
                            onChange={handleMascotasChange}
                        />
                        No
                    </label>
                    <br />

                    <label htmlFor="otrasMascotas">¿Aceptas términos y condiciones?</label>
                    <label>
                        <input
                            type="radio"
                            value="Sí"
                            checked={compromiso === 'Sí'}
                            onChange={handleCompromisoChange}
                        />
                        Sí
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="No"
                            checked={compromiso === 'No'}
                            onChange={handleCompromisoChange}
                        />
                        No
                    </label>
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