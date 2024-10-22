import React from 'react';
import './Requisitos.css';


const Requisitos = () => {

  const huella= "/huella.png"
  const gatito= "gatito.png"

  const requisitos = [
    {
      imagen: huella,
      titulo: 'Ser mayor de edad:',
      descripcion: 'Se requiere tener al menos 18 años para adoptar.'
    },
    {
      imagen: huella,
      titulo: 'Presentar identificación oficial:',
      descripcion: 'Necesitarás un documento de identidad válido.'
    },
    {
      imagen: huella,
      titulo: 'Proporcionar comprobante de domicilio:',
      descripcion: 'Esto asegura un lugar estable y adecuado para la mascota.'
    },
    {
      imagen: huella,
      titulo: 'Completar la solicitud de adopción:',
      descripcion: 'Incluye preguntas sobre tu estilo de vida y experiencia con mascotas.'
    },
    {
      imagen: huella,
      titulo: 'Entrevista o visita domiciliaria:',
      descripcion: 'En algunos casos, se verifica que tu hogar sea seguro y adecuado.'
    }
  ];

  return (
    <div className="container-all">
      <img src={gatito} alt="Gatito" />
      <div className="requisitos-container">
        <h2>Requisitos para adoptar</h2>
        <div className="requisitos-list">
          {requisitos.map((requisito, index) => (
            <div key={index} className="requisito-item">
              <img src={requisito.imagen} alt={requisito.titulo} className="requisito-imagen" />
              <div className="requisito-texto"> 
                <h3>{requisito.titulo}</h3>
                <p>{requisito.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Requisitos;
