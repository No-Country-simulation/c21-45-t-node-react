import { useState } from "react";
import "./filtros.css";

const Filtros = ({ filtro }) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className={`filtros ${showOptions ? 'show-options' : ''}`} onClick={toggleOptions}>
      <div className="content">
        <img src={filtro.imagen} alt="" />
        <h1>{filtro.titulo}</h1>
      </div>

      {showOptions && (
        <div className="caracteristicas">
          <ul>
            {filtro.atributos.map((atributo, index) => (
              <li key={index}>{atributo}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Filtros;
