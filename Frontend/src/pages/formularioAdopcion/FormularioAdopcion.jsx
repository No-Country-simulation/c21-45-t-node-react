import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './FormularioAdopcion.css';
import {UserContext} from '../../context/UserContext';

export const FormularioAdopcion = () => {

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
        setCompromiso(event.target.value);
    }

    const handleSeguridadChange = (event) => {
        setSeguridad(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
          const convertToBinary = (value) => value === 'Si' ? 1 : 0;
    
          const formData = new FormData();
          formData.append('horas_solo', tiempoSolo);
          formData.append('tipo_vivienda', tipoVivienda);
          formData.append('detalle_mascotas', especieCantidad);
          formData.append('comentario', comentarioAdicional);
          formData.append('otras_mascotas', convertToBinary(otrasMascotas));
          formData.append('patio', convertToBinary(patio));
          formData.append('cerramiento', convertToBinary(seguridad));
          formData.append('compromiso', convertToBinary(compromiso));
          formData.append('FK_Usuario', PK_Usuario);

          try {
            const response = await axios.post('http://localhost:3000/api/adopcion', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
    
            console.log('Respuesta de la API:', response.data);
    
            if (response.data.success) {
              Swal.fire({
                title: 'Éxito',
                text: 'Formulario enviado',
                icon: 'success',
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
                    onChange={(e) => setTiempoSolo(e.target.value)} />
                    <br />

                    <label htmlFor="tipoVivienda">Tipo de vivienda (casa, departamento, chalet, loft, etc.)</label>
                    <input type="text" id="tipoVivienda" value={tipoVivienda}
                    onChange={(e) => setTipoVivienda(e.target.value)} />
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

                    <label htmlFor="seguridad">¿Tu vivienda cuenta con un perímetro delimitado seguro?</label>
                    <label>
                        <input
                            type="radio"
                            value="Sí"
                            checked={seguridad === 'Sí'}
                            onChange={handleSeguridadChange}
                        />
                        Sí
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
            </form>
        </div>
    );
};

export default FormularioAdopcion;
