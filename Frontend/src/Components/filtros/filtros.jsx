import "./filtros.css";

export const FiltrosAplicados = ({ filters, onRemoveFilter }) => (
  <div className="filtros-aplicados">
    {Object.entries(filters).map(([key, value]) => (
      <div key={key} className="filtro-aplicado">
        {value}
        <span className="remove-filter" onClick={() => onRemoveFilter(key)}>
          ✕
        </span>
      </div>
    ))}
  </div>
);

const Filtros = ({ filtro, onFilterChange, isActive, onToggle }) => {
  const handleSelectOption = (atributo) => {
    onFilterChange(filtro.filtro.toLowerCase(), atributo);
    onToggle(); // Cierra el filtro después de seleccionar
  };

  return (
    <div className={`filtros ${isActive ? "show-options" : ""}`} onClick={onToggle}>
      <div className="content">
        <img src={filtro.imagen} alt="" />
        <h1>{filtro.titulo}</h1>
        {/* <p>{selectedAttribute ? selectedAttribute : <span className="placeholder">Seleccionar</span>}</p> */}
      </div>

      {isActive && (
        <div className="caracteristicas">
          <ul>
            {filtro.atributos.map((atributo, index) => (
              <li
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectOption(atributo);
                }}
              >
                {atributo.display}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Filtros;
