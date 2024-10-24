import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import Search from "../search";
import Filtros from "../../../Components/filtros/filtros";
import './mascotas.css'
const Mascotas = () => {
  const navigate = useNavigate(); // Inicializamos el hook de navegación

  const filtros = [
    {
      imagen: "/gato.png",
      titulo: "EDAD",
      atributos: ["Cachorro", "Adulto", "Senior"],
    },
    {
      imagen: "/tamaño.png",
      titulo: "TAMAÑO",
      atributos: ["Grande", "Mediano", "Pequeño"],
    },
    { imagen: "/genero.png", titulo: "GÉNERO", atributos: ["Macho", "Hembra"] },
    {
      imagen: "/localizacion.png",
      titulo: "UBICACIÓN",
      atributos: ["CABA", "Buenos Aires"],
    },
    {
      imagen: "/perro_vector.png",
      titulo: "ESPECIE",
      atributos: ["Perro", "Gato"],
    },
  ];

  return (
    <div className="gato">
      <div className="filtros-container">
        {filtros.map((filtro, index) => (
          <div key={index} onClick={() => handleFilterClick(filtro.titulo)}>
            <Filtros filtro={filtro} />
          </div>
        ))}
      </div>
      <Search />
    </div>
  );
};

export default Mascotas;
