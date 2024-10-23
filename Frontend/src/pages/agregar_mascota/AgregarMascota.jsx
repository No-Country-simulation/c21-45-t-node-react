import React, { useState } from 'react';
import './AgregarMascota.css';

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

// Definiendo los campos
const AgregarMascota = ({ addPet, userId }) => {
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
  const [image, setImage] = useState(''); // Imagen

  const handleSubmit = (e) => {
    e.preventDefault();
    const petData={ name, type, race, size, birth, cas, vac, amn, amp, amg, enf, details, image, userId };
    addPet(petData);
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
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
        setImage(URL.createObjectURL(file)); // Previsualización
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
        <option value="">¿Es amigable con perros?</option>
        <option value={PositivoNegativo.SI}>{PositivoNegativo.SI}</option>
        <option value={PositivoNegativo.NO}>{PositivoNegativo.NO}</option>
      </select>
      <select
      className='info--agregarMascotas'
      value={amg}
      onChange={(e) => setAmg(e.target.value)}
      required
      >
        <option value="">¿Es amigable con gatos?</option>
        <option value={PositivoNegativo.SI}>{PositivoNegativo.SI}</option>
        <option value={PositivoNegativo.NO}>{PositivoNegativo.NO}</option>
      </select>
      <input
        className='info--agregarMascotas'
        type="text"
        placeholder="¿Tu mascota tiene alguna enfermedad?"
        value={enf}
        onChange={(e) => setEnf(e.target.value)}
        required
      />
      <input
        className='info--agregarMascotas'
        type="text"
        placeholder="Añade información importante de tu mascota"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        required
      />
      <label className='info--agregarMascotas'>
      Sube una foto
      </label>
      <input
        className='info--agregarMascotas'
        type="file"
        accept="image/*"
        OnChange={handleImageChange}
        required
      />
      {image && <img src={image} alt="Previsualización" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
      <button type="submit" className='info--agregarMascotas'>Agregar mascota</button>
    </form>
  );
};

export default AgregarMascota;
