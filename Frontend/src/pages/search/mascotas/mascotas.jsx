import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Search from "../search";
import Filtros from "../../../Components/filtros/filtros";
import filtrosData from "../../../Components/filtros/filtrosConfig.js";
import "./mascotas.css";
import axios from "axios";

const Mascotas = () => {
  const location = useLocation();
  const [filters, setFilters] = useState(location.state || {});
  const [filtrosConfig, setFiltrosConfig] = useState(filtrosData); // Crear estado para filtros dinámicos

  const handleFilterClick = (titulo, atributo) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [titulo.toLowerCase()]: atributo,
    }));
    console.log("filters", filters);
  };

  useEffect(() => {
    // Llamada al endpoint para obtener las localidades con mascotas
    const fetchUbicaciones = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/ubicacion/localidadConMascotas");
        console.log("response.data", response.data);
        const localidades = response.data.map((localidad) => `${localidad.localidad}`);
        console.log(localidades);
        // Actualizar el filtro de "UBICACIÓN" con las localidades obtenidas
        const updatedFiltros = filtrosConfig.map((filtro) => (filtro.filtro === "ubicacion" ? { ...filtro, atributos: localidades } : filtro));
        setFiltrosConfig(updatedFiltros);
      } catch (error) {
        console.error("Error al obtener las ubicaciones:", error);
      }
    };

    fetchUbicaciones();
  }, []);

  return (
    <div className="gato">
      <div className="filtros-container">
        {filtrosConfig.map((filtro, index) => (
          <div key={index}>
            <Filtros filtro={filtro} onFilterChange={handleFilterClick} />
          </div>
        ))}
      </div>
      <Search filters={filters} />
    </div>
  );
};

export default Mascotas;
