import { useState } from "react";
import { useLocation } from "react-router-dom";
import Search from "../search";
import Filtros from "../../../Components/filtros/filtros";
import filtros from "../../../Components/filtros/filtrosConfig.js";
import "./mascotas.css";

const Mascotas = () => {
  const location = useLocation();
  const [filters, setFilters] = useState(location.state || {});
  // const [filters, setFilters] = useState({});

  const handleFilterClick = (titulo, atributo) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [titulo.toLowerCase()]: atributo,
    }));
    console.log("filters", filters);
  };

  return (
    <div className="gato">
      <div className="filtros-container">
        {filtros.map((filtro, index) => (
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
