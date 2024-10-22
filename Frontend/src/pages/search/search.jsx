import { useNavigate } from "react-router-dom";
import CardMascota from "../../Components/card/CardMascota";

function Search() {
  const navigate = useNavigate(); 

  const mascotas = [
    {
      nombre: 'Fido',
      especie: "Perro",
      raza: "Labrador",
      genero: "Macho",
      tamanio: "Grande",
      nacimiento: "2020-06-15",
      castrado: "Sí",
      ninos: "Sí",
      perro: "Sí",
      gatos: "No",
      ubicacion:"CABA",
      tipo:'cachorro'
  
    },
    { nombre: "Rex", tipo: "Cachorro", ubicacion: "CABA", genero: "Macho" },
    { nombre: "Max", tipo: "Cachorro", ubicacion: "CABA", genero: "Macho" },
    { nombre: "Bella", tipo: "Grande", ubicacion: "CABA", genero: "Hembra" },
    { nombre: "Luna", ubicacion: "CABA", genero: "Hembra", tipo: "mediano" },
  ];

  const handleSelectMascota = (mascota) => {
    navigate(`/detalle-mascota`, { state: { mascota } });
  };

  return (
    <div className="inicio">
      <div className="mascota-grid">
        {mascotas.map((mascota, index) => (
          <div key={index} onClick={() => handleSelectMascota(mascota)}>
            <CardMascota mascota={mascota} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
