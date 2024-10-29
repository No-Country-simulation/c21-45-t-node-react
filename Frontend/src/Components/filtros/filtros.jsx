import { useState } from "react";
import "./filtros.css";

const Filtros = ({ filtro, onFilterChange }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState("");

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleSelectOption = (atributo) => {
    setSelectedAttribute(atributo);
    onFilterChange(filtro.filtro.toLowerCase(), atributo);
    setShowOptions(false);
  };

  return (
    <div className={`filtros ${showOptions ? "show-options" : ""}`} onClick={toggleOptions}>
      <div className="content">
        <img src={filtro.imagen} alt="" />
        <h1>{filtro.titulo}</h1>
        <p>{selectedAttribute ? selectedAttribute : <span className="placeholder"></span>}</p>
      </div>

      {showOptions && (
        <div className="caracteristicas">
          <ul>
            {filtro.atributos.map((atributo, index) => (
              <li key={index} onClick={() => handleSelectOption(atributo)}>
                {atributo}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Filtros;
