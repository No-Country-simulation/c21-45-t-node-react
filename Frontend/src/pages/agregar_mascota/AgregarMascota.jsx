import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import './AgregarMascota.css';
import { UserContext } from '../../context/UserContext';

// Enum para el tipo de mascota
const TipoMascota = Object.freeze({
    PERRO: 'Perro',
    GATO: 'Gato',
});

// Enum para el sexo de la mascota
const SexoMascota = Object.freeze({
    MACHO: 'Macho',
    HEMBRA: 'Hembra',
});

// Enum para el tamaño de la mascota
const TamañoMascota = Object.freeze({
    PEQUEÑO: 'Pequeño',
    MEDIANO: 'Mediano',
    GRANDE: 'Grande',
});

// Enum positivo/negativo
const PositivoNegativo = Object.freeze({
    SI: 'Si',
    NO: 'No',
});

// Definiendo los campos del formulario
const AgregarMascota = ({ addPet }) => {
  const { user } = useContext(UserContext);

  const PK_Usuario = user ? user.payload.PK_Usuario : null;
  console.log("user.PK_Usuario", user?.PK_Usuario);
  console.log("PK_Usuario", PK_Usuario);

  // ID del usuario autenticado
  const [name, setName] = useState(''); // Nombre
  const [type, setType] = useState(''); // Si es perro o gato
  const [race, setRace] = useState(''); // Raza
  const [sex, setSex] = useState(''); // Sexo
  const [size, setSize] = useState(''); // Tamaño
  const [birth, setBirth] = useState(''); // Fecha de nacimiento
  const [cas, setCas] = useState(''); // Si está esterilizada
  const [vac, setVac] = useState(''); // Si está vacunada
  const [amn, setAmn] = useState(''); // Si es amigable con niños
  const [amp, setAmp] = useState(''); // Si es amigable con perros
  const [amg, setAmg] = useState(''); // Si es amigable con gatos
  const [enf, setEnf] = useState(''); // Enfermedades
  const [details, setDetails] = useState(''); // Detalles
  const [image, setImage] = useState(null); // Imagen

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      // Convertir "Sí" o "No" a 1 o 0
      const convertToBinary = (value) => value === 'Si' ? 1 : 0;

      // Crear FormData para enviar el archivo y los datos
      const formData = new FormData();
      formData.append('nombre', name);
      formData.append('especie', type);
      formData.append('raza', race);
      formData.append('sexo', sex);
      formData.append('tamanio', size);
      formData.append('fecha_nacimiento', birth);
      formData.append('castrado', convertToBinary(cas));
      formData.append('vacunado', convertToBinary(vac));
      formData.append('amigable_ninos', convertToBinary(amn));
      formData.append('amigable_perros', convertToBinary(amp));
      formData.append('amigable_gatos', convertToBinary(amg));
      formData.append('enfermedades', enf);
      formData.append('detalle', details);
      formData.append('FK_Usuario', PK_Usuario);

      // Añadir el archivo de imagen si existe
      if (image) {
        formData.append('mascotaImages', image); // nombre del campo en el backend
      }

      // Enviar la solicitud POST al backend
      try {
        const response = await axios.post('http://localhost:3000/api/mascota', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        if (response.data.success) {
          Swal.fire({
            title: 'Éxito',
            text: 'Mascota agregada con éxito',
            icon: 'success',
          });
        }

        // Limpiar los campos del formulario
        setName('');
        setType('');
        setRace('');
        setSex('');
        setSize('');
        setBirth('');
        setCas('');
        setVac('');
        setAmn('');
        setAmp('');
        setAmg('');
        setEnf('');
        setDetails('');
        setImage(null);
      } catch (error) {
        console.error('Error al agregar la mascota:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al agregar la mascota',
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Guardar el archivo de imagen
    }
  };

  return (
    // Formulario para agregar mascotas
    <form onSubmit={handleSubmit} className='container--agregarMascotas'>
      <input
        className='info--agregarMascotas'
        type="text"
        placeholder="Nombre de la mascota"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select
        className='info--agregarMascotas'
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      >
        <option value="">Selecciona si tu mascota es perro o gato</option>
        <option value={TipoMascota.PERRO}>{TipoMascota.PERRO}</option>
        <option value={TipoMascota.GATO}>{TipoMascota.GATO}</option>
      </select>
      <input
        className='info--agregarMascotas'
        type="text"
        placeholder="Raza"
        value={race}
        onChange={(e) => setRace(e.target.value)}
        required
      />
      <select
        className='info--agregarMascotas'
        value={sex}
        onChange={(e) => setSex(e.target.value)}
        required
      >
        <option value="">Selecciona si tu mascota es hembra o macho</option>
        <option value={SexoMascota.MACHO}>{SexoMascota.MACHO}</option>
        <option value={SexoMascota.HEMBRA}>{SexoMascota.HEMBRA}</option>
      </select>
      <select
        className='info--agregarMascotas'
        value={size}
        onChange={(e) => setSize(e.target.value)}
        required
      >
        <option value="">Selecciona el tamaño de tu mascota</option>
        <option value={TamañoMascota.PEQUEÑO}>{TamañoMascota.PEQUEÑO}</option>
        <option value={TamañoMascota.MEDIANO}>{TamañoMascota.MEDIANO}</option>
        <option value={TamañoMascota.GRANDE}>{TamañoMascota.GRANDE}</option>
      </select>
      <label className='info--agregarMascotas'>
        Fecha de nacimiento:
      </label>
      <input
        className='info--agregarMascotas'
        type="date"
        value={birth}
        onChange={(e) => setBirth(e.target.value)}
        required
      />
      <select
        className='info--agregarMascotas'
        value={cas}
        onChange={(e) => setCas(e.target.value)}
        required
      >
        <option value="">¿Tu mascota está esterilizada/castrada?</option>
        <option value={PositivoNegativo.SI}>{PositivoNegativo.SI}</option>
        <option value={PositivoNegativo.NO}>{PositivoNegativo.NO}</option>
      </select>
      <select
        className='info--agregarMascotas'
        value={vac}
        onChange={(e) => setVac(e.target.value)}
        required
      >
        <option value="">¿Tu mascota está vacunada?</option>
        <option value={PositivoNegativo.SI}>{PositivoNegativo.SI}</option>
        <option value={PositivoNegativo.NO}>{PositivoNegativo.NO}</option>
      </select>
      <select
        className='info--agregarMascotas'
        value={amn}
        onChange={(e) => setAmn(e.target.value)}
        required
      >
        <option value="">¿Tu mascota es amigable con niños?</option>
        <option value={PositivoNegativo.SI}>{PositivoNegativo.SI}</option>
        <option value={PositivoNegativo.NO}>{PositivoNegativo.NO}</option>
      </select>
      <select
        className='info--agregarMascotas'
        value={amp}
        onChange={(e) => setAmp(e.target.value)}
        required
      >
        <option value="">¿Tu mascota es amigable con perros?</option>
        <option value={PositivoNegativo.SI}>{PositivoNegativo.SI}</option>
        <option value={PositivoNegativo.NO}>{PositivoNegativo.NO}</option>
      </select>
      <select
        className='info--agregarMascotas'
        value={amg}
        onChange={(e) => setAmg(e.target.value)}
        required
      >
        <option value="">¿Tu mascota es amigable con gatos?</option>
        <option value={PositivoNegativo.SI}>{PositivoNegativo.SI}</option>
        <option value={PositivoNegativo.NO}>{PositivoNegativo.NO}</option>
      </select>
      <input
        className='info--agregarMascotas'
        type="text"
        placeholder="¿Tu mascota tiene enfermedades?"
        value={enf}
        onChange={(e) => setEnf(e.target.value)}
        required
      />
      <textarea
        className='info--agregarMascotas'
        placeholder="Detalles adicionales sobre tu mascota"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        required
      />
      <input
        className='info--agregarMascotas'
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button type="submit">Agregar Mascota</button>
    </form>
  );
};

export default AgregarMascota;
