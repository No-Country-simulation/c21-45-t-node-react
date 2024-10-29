import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios'; 
import './perfil.css';
import editarImg from '/editar.png'; 

const Perfil = () => {
  const { user, isLoading } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Asegúrate de tener userId definido
  const userId = user?.payload?.PK_Usuario; // Cambia esto si el ID está en otro lugar

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.payload.nombre || '',
        apellido: user.payload.apellido || '',
        email: user.payload.email || '',
        telefono: user.payload.telefono || '',
        tipo_doc: user.payload.tipo_doc || '',
        nro_doc: user.payload.nro_doc || '',
        calle: user.calle || '',
        numero: user.payload.numero || '',
        foto_perfil: user.payload.foto_perfil || '' ,
      });
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(!isEditing); 
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setLoading(true); 
    setErrorMessage(""); 

    try {
      const response = await axios.put(`http://localhost:3000/api/usuarios/${userId}`, formData); // Usa formData en lugar de userData

      console.log('Datos actualizados:', response.data);
      alert("Perfil actualizado exitosamente");
      setIsEditing(false); 
    } catch (error) {
      console.error(error);
      setErrorMessage("Hubo un error al actualizar el perfil. " + (error.response?.data?.message || "Intenta de nuevo más tarde."));
    } finally {
      setLoading(false); 
    }
  };

  if (isLoading) {
    return <div className='loading'>Cargando...</div>;
  }

  if (!user) {
    return <div className='error'>No hay usuario conectado.</div>;
  }

  return (
    <div className='container-perfil'>
      <img src={formData.foto_perfil} alt="Perfil" className="perfil-image" />
      <h1>Perfil de Usuario</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>} 
      <p>
        <strong>Nombre:</strong>
        {isEditing ? (
          <input 
            type="text" 
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
          />
        ) : (
          <>
            {formData.nombre || 'No disponible'}
            <img 
              src={editarImg} 
              alt="Editar" 
              onClick={handleEditClick} 
              style={{ cursor: 'pointer', marginLeft: '10px', width: '20px', height: '20px' }} 
            />
          </>
        )}
      </p>
      {/* Repite el mismo patrón para los demás campos */}
      <p>
        <strong>Apellido:</strong>
        {isEditing ? (
          <input 
            type="text" 
            name="apellido" 
            value={formData.apellido} 
            onChange={handleChange} 
          />
        ) : (
          <>
            {formData.apellido || 'No disponible'}
            <img 
              src={editarImg} 
              alt="Editar" 
              onClick={handleEditClick} 
              style={{ cursor: 'pointer', marginLeft: '10px', width: '20px', height: '20px' }} 
            />
          </>
        )}
      </p>
      <p>
        <strong>Email:</strong>
        {isEditing ? (
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
        ) : (
          <>
            {formData.email || 'No disponible'}
            <img 
              src={editarImg} 
              alt="Editar" 
              onClick={handleEditClick} 
              style={{ cursor: 'pointer', marginLeft: '10px', width: '20px', height: '20px' }} 
            />
          </>
        )}
      </p>
      <p>
        <strong>Teléfono:</strong>
        {isEditing ? (
          <input 
            type="tel" 
            name="telefono" 
            value={formData.telefono} 
            onChange={handleChange} 
          />
        ) : (
          <>
            {formData.telefono || 'No disponible'}
            <img 
              src={editarImg} 
              alt="Editar" 
              onClick={handleEditClick} 
              style={{ cursor: 'pointer', marginLeft: '10px', width: '20px', height: '20px' }} 
            />
          </>
        )}
      </p>
      <p>
        <strong>Tipo de Documento:</strong>
        {isEditing ? (
          <input 
            type="text" 
            name="tipo_doc" 
            value={formData.tipo_doc} 
            onChange={handleChange} 
          />
        ) : (
          <>
            {formData.tipo_doc || 'No disponible'}
            <img 
              src={editarImg} 
              alt="Editar" 
              onClick={handleEditClick} 
              style={{ cursor: 'pointer', marginLeft: '10px', width: '20px', height: '20px' }} 
            />
          </>
        )}
      </p>
      <p>
        <strong>Número de Documento:</strong>
        {isEditing ? (
          <input 
            type="text" 
            name="nro_doc" 
            value={formData.nro_doc} 
            onChange={handleChange} 
          />
        ) : (
          <>
            {formData.nro_doc || 'No disponible'}
            <img 
              src={editarImg} 
              alt="Editar" 
              onClick={handleEditClick} 
              style={{ cursor: 'pointer', marginLeft: '10px', width: '20px', height: '20px' }} 
            />
          </>
        )}
      </p>
      <p>
        <strong>Dirección:</strong>
        {isEditing ? (
          <input 
            type="text" 
            name="calle" 
            value={formData.calle} 
            onChange={handleChange} 
          />
        ) : (
          <>
            {formData.calle || 'No disponible'}
            <img 
              src={editarImg} 
              alt="Editar" 
              onClick={handleEditClick} 
              style={{ cursor: 'pointer', marginLeft: '10px', width: '20px', height: '20px' }} 
            />
          </>
        )}
        {isEditing ? (
          <input 
            type="text" 
            name="numero" 
            value={formData.numero} 
            onChange={handleChange} 
            placeholder="Número" 
          />
        ) : (
          <>
            {formData.numero || 'No disponible'}
            <img 
              src={editarImg} 
              alt="Editar" 
              onClick={handleEditClick} 
              style={{ cursor: 'pointer', marginLeft: '10px', width: '20px', height: '20px' }} 
            />
          </>
        )}
      </p>

      {isEditing && (
        <button onClick={handleSave} disabled={loading}>
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>
      )}
    </div>
  );
};

export default Perfil;
