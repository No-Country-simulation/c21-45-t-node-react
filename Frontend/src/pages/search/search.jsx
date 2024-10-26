import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardMascota from "../../Components/card/CardMascota";

function Search() {
  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);

  // Función para obtener mascotas desde el backend
  const fetchMascotas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/mascota/");
      console.log(response.data);
      setMascotas(response.data); // Guardar las mascotas en el estado
    } catch (error) {
      console.error("Error al obtener las mascotas:", error);
    }
  };

  // Llamar a la función fetchMascotas cuando se monta el componente
  useEffect(() => {
    fetchMascotas();
    console.log("hay mascotas", mascotas);
  }, []);

  // Función para manejar la selección de una mascota
  const handleSelectMascota = (mascota) => {
    navigate(`/detalle-mascota`, { state: { mascota } });
  };

  return (
    <div className="inicio">
      <h1 className="busqueda-title">Encuentra a tu mascota</h1>
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
