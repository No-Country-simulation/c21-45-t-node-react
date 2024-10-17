import React, { useState, useEffect } from 'react';
import './FormularioRegistro.css';
import homeImage from '../../images/home_image.png';
import axios from 'axios';

const FormularioRegistro = () => {
  // Estados para almacenar los países, provincias, localidades y el valor seleccionado
  const [paises, setPaises] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState(''); // Estado para el país seleccionado
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(''); // Estado para la provincia seleccionada
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState(''); // Estado para la localidad seleccionada



  
  // Obtener los países cuando el componente se monta
  useEffect(() => {
    axios.get('http://localhost:3001/api/ubicacion/pais')
      .then(response => {
        setPaises(response.data); // Guardar los países en el estado
      })
      .catch(error => {
        console.error('Error al obtener los países:', error);
      });
  }, []);

  // Obtener las provincias cuando se seleccione un país
  useEffect(() => {
    if (paisSeleccionado) { // Si hay un país seleccionado
      axios.get(`http://localhost:3001/api/ubicacion/provincia/${paisSeleccionado}`)
        .then(response => {
          setProvincias(response.data); // Guardar las provincias en el estado
          setLocalidades([]); // Limpiar localidades cuando cambia el país
        })
        .catch(error => {
          console.error('Error al obtener las provincias:', error);
        });
    }
  }, [paisSeleccionado]); // Se ejecuta cuando cambia el país seleccionado

  // Obtener las localidades cuando se seleccione una provincia
  useEffect(() => {
    if (provinciaSeleccionada) { // Si hay una provincia seleccionada
      axios.get(`http://localhost:3001/api/ubicacion/localidad/${provinciaSeleccionada}`)
        .then(response => {
          setLocalidades(response.data); // Guardar las localidades en el estado
        })
        .catch(error => {
          console.error('Error al obtener las localidades:', error);
        });
    }
  }, [provinciaSeleccionada]); // Se ejecuta cuando cambia la provincia seleccionada

  // Manejar el cambio del país seleccionado
  const handlePaisChange = (event) => {
    setPaisSeleccionado(event.target.value);
    setProvinciaSeleccionada(''); // Limpiar la selección de provincia cuando se cambia de país
  };

  // Manejar el cambio de la provincia seleccionada
  const handleProvinciaChange = (event) => {
    setProvinciaSeleccionada(event.target.value);
  };

  // Manejar el cambio de la localidad seleccionada
  const handleLocalidadChange = (event) => {
    setLocalidadSeleccionada(event.target.value);
  };

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

                    <label htmlFor="pais">País</label>
                    <select id="pais" value={paisSeleccionado} onChange={handlePaisChange}>
                        <option value="">Seleccione un país</option>
                        {paises.map(pais => (
                        <option key={pais.PK_Pais} value={pais.PK_Pais}>
                            {pais.nombre}
                        </option>
                        ))}
                    </select>
                    <br />

                    <label htmlFor="provincia">Provincia</label>
                    <select id="provincia" value={provinciaSeleccionada} onChange={handleProvinciaChange}>
                        <option value="">Seleccione una provincia</option>
                        {provincias.map(provincia => (
                        <option key={provincia.PK_Provincia} value={provincia.PK_Provincia}>
                            {provincia.nombre}
                        </option>
                        ))}
                    </select>
                    <br />

                    <label htmlFor="localidad">Localidad</label>
                    <select id="localidad" value={localidadSeleccionada} onChange={handleLocalidadChange}>
                        <option value="">Seleccione una localidad</option>
                        {localidades.map(localidad => (
                        <option key={localidad.PK_Localidad} value={localidad.PK_Localidad}>
                            {localidad.nombre}
                        </option>
                        ))}
                    </select>
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