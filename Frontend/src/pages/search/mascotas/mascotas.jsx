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
  const [filtrosConfig, setFiltrosConfig] = useState(filtrosData);

  const handleFilterClick = (titulo, atributo) => {
    const value = atributo.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [titulo.toLowerCase()]: value,
    }));
  };

  useEffect(() => {
    console.log("antes de fetch ubicaciones");
    const fetchUbicaciones = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/ubicacion/localidadConMascotas");
        console.log("fetch ubicaciones", response.data);
        // Actualizar la configuración de filtros para incluir las ubicaciones
        const updatedFiltrosConfig = filtrosData.map((filtro) => {
          if (filtro.filtro === "ubicacion") {
            return {
              ...filtro,
              atributos: response.data.map((ubicacion) => ({
                display: `${ubicacion.localidad} ${ubicacion.provincia}`,
                value: ubicacion.localidad,
              })),
            };
          }
          return filtro;
        });
        console.log("filtros actualizados", updatedFiltrosConfig);
        setFiltrosConfig(updatedFiltrosConfig);
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
