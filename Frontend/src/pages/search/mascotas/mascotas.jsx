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
      atributos: ["Cachorro", "Joven", "Adulto Joven", "Adulto", "Senior"],
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
      titulo: "PERRO",
      // No requiere atributos para redirigir
    },
    {
      imagen: "/gato.png",
      titulo: "GATO",
      // No requiere atributos para redirigir
    },
  ];

  // Función para manejar clics en las imágenes de perro y gato
  const handleFilterClick = (titulo) => {
    if (titulo === "PERRO") {
      navigate("/mascotas-perro"); // Redirige a la página de perros
    } else if (titulo === "GATO") {
      navigate("/mascotas-gato"); // Redirige a la página de gatos
    }
  };

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
