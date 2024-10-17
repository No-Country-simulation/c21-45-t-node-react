import CardMascota from "../../Components/card/CardMascota";
import "./search.css";
function Search() {
  const mascotas = [
    { nombre: "Fido", tipo: "Cachorro", ubicacion: "CABA", genero: "Macho" },
    { nombre: "Rex", tipo: "Cachorro", ubicacion: "CABA", genero: "Macho" },
    { nombre: "Max", tipo: "Cachorro", ubicacion: "CABA", genero: "Macho" },
    { nombre: "Bella", tipo: "Grande", ubicacion: "CABA", genero: "Hembra" },
    { nombre: "Luna", ubicacion: "CABA", genero: "Hembra", tipo: "mediano" },
  ];
  

  return (
    <div className="inicio">
     
      <div className="mascota-grid">
        {mascotas.map((mascota, index) => (
          <CardMascota key={index} mascota={mascota} />
        ))}
      </div>
    </div>
  );
}

export default Search;
