import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './FormularioAdopcion.css';
import {UserContext} from '../../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';

export const FormularioAdopcion = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { PK_Mascota } = location.state || {}; // Recuperar PK_Mascota del estado

    const homeImage = "/home_image.png"

    const {user} = useContext(UserContext);
    const PK_Usuario = user ? user.payload.PK_Usuario : null;

    const [patio, setPatio] = useState('');
    const [otrasMascotas, setOtrasMascotas] = useState('');
    const [compromiso, setCompromiso] = useState('');
    const [seguridad, setSeguridad] = useState('');
    const [tiempoSolo, setTiempoSolo] = useState('');
    const [tipoVivienda, setTipoVivienda] = useState('');
    const [comentarioAdicional, setComentarioAdicional] = useState('');
    const [especieCantidad, setEspecieCantidad] = useState('');

    const handlePatioChange = (event) => {
        setPatio(event.target.value);
    }

    const handleMascotasChange = (event) => {
        setOtrasMascotas(event.target.value);
    }

    const handleCompromisoChange = (event) => {
        const value = event.target.value;
        if (value === 'No') {
            Swal.fire({
                title: 'Advertencia',
                text: 'Si no te comprometes a cuidar de la mascota, no puedes solicitar la adopción.',
                icon: 'warning',
            });
            setCompromiso(''); // Limpia la selección
        } else {
            setCompromiso(value);
        }
    };

    const handleSeguridadChange = (event) => {
        setSeguridad(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            const data = {
                horas_solo: tiempoSolo,
                tipo_vivienda: tipoVivienda,
                detalle_mascotas: especieCantidad,
                comentario: comentarioAdicional,
                otras_mascotas: otrasMascotas,
                patio: patio,
                cerramiento: seguridad,
                compromiso: compromiso,
                FK_Mascota: PK_Mascota,
                FK_Usuario: PK_Usuario,
            };
    
            try {
                const response = await axios.post('http://localhost:3000/api/adopcion', data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                //console.log('Respuesta de la API:', response.data);
    
            if (response.data.success) {
              Swal.fire({
                title: 'Éxito',
                text: 'Formulario enviado',
                icon: 'success',
              }).then(() => {
                // Redirigir después de cerrar el modal de éxito
                navigate("/solicitudes");
            });
              // Limpiar los estados del formulario
              setPatio('');
              setOtrasMascotas('');
              setCompromiso('');
              setSeguridad('');
              setTiempoSolo('');
              setTipoVivienda('');
              setEspecieCantidad('');
              setComentarioAdicional('');
            }
          } catch (error) {
            console.error('Error al llenar el formulario:', error.response || error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al llenar el formulario',
              icon: 'error',
            });
          }
        } else {
          Swal.fire({
            title: 'Advertencia',
            text: 'Debe iniciar sesión',
            icon: 'warning',
          });
        }
      };

    return (

        <div className="container--componente">
            <div>
                <img src={homeImage} alt="home_image" className="imagenFormulario" />
            </div>

            
            <form onSubmit={handleSubmit} className="container--formulario" id="container--form">
                <h2 className="title">Formulario de Adopción</h2>

                <div className="separator">
                    <p>Completa la información solicitada</p>
                </div>

                <div className="container--datos">

                    <label htmlFor="tiempoSolo">¿Cuántas horas podría estar sola tu mascota?</label>
                    <input type="number" id="tiempoSolo" value={tiempoSolo}
                    onChange={(e) => setTiempoSolo(e.target.value)} required/>
                    <br />

                    <label htmlFor="tipoVivienda">Tipo de vivienda (casa, departamento, chalet, loft, etc.)</label>
                    <input className='form-text' type="text" id="tipoVivienda" value={tipoVivienda}
                    onChange={(e) => setTipoVivienda(e.target.value)} required/>
                    <br />

                    <label htmlFor="patio">¿Cuentas con patio en casa?</label>
                    <div className="si-no">
                    <label>
                        <input
                            type="radio"
                            value="Si"
                            checked={patio === 'Si'}
                            onChange={handlePatioChange}
                        required/>
                        Si
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
                    </div>
                    <br />

                    <label htmlFor="seguridad">¿Tu vivienda cuenta con un perímetro delimitado seguro?</label>
                    <div className="si-no">
                    <label>
                        <input
                            type="radio"
                            value="Si"
                            checked={seguridad === 'Si'}
                            onChange={handleSeguridadChange}
                        required/>
                        Si
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="No"
                            checked={seguridad === 'No'}
                            onChange={handleSeguridadChange}
                        />
                        No
                    </label>
                    </div>
                    <br />

                    <label htmlFor="otrasMascotas">¿Tienes otras mascotas?</label>
                    <div className="si-no">
                    <label>
                        <input
                            type="radio"
                            value="Si"
                            checked={otrasMascotas === 'Si'}
                            onChange={handleMascotasChange}
                        required/>
                        Si
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
                    </div>
                    <br />

                    <div className={otrasMascotas === 'No' ? 'hidden' : ''}>
                        <label htmlFor="especieCantidad">¿Cuántas mascotas y de que especie son?</label>
                        <input type="text" id="especieCantidad" value={especieCantidad}
                        onChange={(e) => setEspecieCantidad(e.target.value)} />
                    </div>
                    <br />

                    <label htmlFor="comentarioAdicional">¿Hay algo más que desees comentar?</label>
                    <input type="text" id="comentarioAdicional" value={comentarioAdicional}
                    onChange={(e) => setComentarioAdicional(e.target.value)} />
                    <br />

                    <label htmlFor="otrasMascotas">¿Se compromete a ofrecer los cuidados que necesite su mascota, su alimentación y brindarle cariño?</label>
                    <div className="si-no">
                    <label>
                        <input
                            type="radio"
                            value="Si"
                            checked={compromiso === 'Si'}
                            onChange={handleCompromisoChange}
                        required/>
                        Si
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
                    </div>
                    <br />

                </div>

                <div id="boton-enviar">
                    <button type="submit" id="enviar">Enviar</button>
                </div>
            </form>
        </div>
    );
};

export default FormularioAdopcion;
