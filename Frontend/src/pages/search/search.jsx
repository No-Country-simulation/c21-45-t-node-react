import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardMascota from "../../Components/card/CardMascota";
import { MascotasContext } from "../../context/Mascotascontext";

function Search() {
  const navigate = useNavigate();

  const { mascotas } = useContext(MascotasContext);

  

  // Función para manejar la selección de una mascota
  const handleSelectMascota = (mascota) => {
    navigate(`/detalle-mascota`, { state: { mascota } });
  };
  
  return (
    <div className="inicio">
    <div className="mascota-grid">
      {Array.isArray(mascotas) && mascotas.length > 0 ? (
        mascotas.map((mascota, index) => (
          <div key={index} onClick={() => handleSelectMascota(mascota)}>
            <CardMascota mascota={mascota} />
          </div>
        ))
      ) : (
        <p>No hay mascotas disponibles.</p>
      )}
    </div>
  </div>
);
}

export default Search;
