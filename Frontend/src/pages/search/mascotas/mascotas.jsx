import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Search from "../search";
import Filtros, { FiltrosAplicados } from "../../../Components/filtros/filtros";
import filtrosData from "../../../Components/filtros/filtrosConfig.js";
import "./mascotas.css";
import axios from "axios";

const Mascotas = () => {
  const location = useLocation();
  const [filters, setFilters] = useState(location.state || {});
  const [filtrosConfig, setFiltrosConfig] = useState(filtrosData);
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
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
                display: `${ubicacion.localidad}, ${ubicacion.provincia}`,
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

  const handleFilterClick = (titulo, atributo) => {
    const value = atributo.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [titulo.toLowerCase()]: value,
    }));
  };

  const toggleFilter = (index) => {
    setActiveFilter((prevActiveFilter) => (prevActiveFilter === index ? null : index));
  };

  return (
    <div className="gato">
      <div className="filtros-container">
        {filtrosConfig.map((filtro, index) => (
          <div key={index}>
            <Filtros filtro={filtro} onFilterChange={handleFilterClick} isActive={activeFilter === index} onToggle={() => toggleFilter(index)} />
          </div>
        ))}
      </div>
      <div className="filtros-aplicados-container">
        <FiltrosAplicados
          filters={filters}
          onRemoveFilter={(key) =>
            setFilters((prev) => {
              const updatedFilters = { ...prev };
              delete updatedFilters[key];
              return updatedFilters;
            })
          }
        />
      </div>
      <Search filters={filters} />
    </div>
  );
};

export default Mascotas;
