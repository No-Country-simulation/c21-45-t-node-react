import Filtromascota from "../../Components/filtro_mascota/filtro_mascota";

const mascotaEjemplo = {
  nombre: "Rex",
  edad: "Joven",
  genero: "Macho",
  raza: "Labrador",
  vacunas: "Completas",
  tratamientos: "Desparasitado",
  niños: "Amigable",
  animales: "Socializa bien",
};

const CaracteristicaMascota = () => {
  return (
    <div>
      <Filtromascota mascota={mascotaEjemplo} />
    </div>
  );
};

export default CaracteristicaMascota;
