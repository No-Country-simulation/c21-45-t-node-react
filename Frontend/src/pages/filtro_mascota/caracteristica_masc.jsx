import Filtro_mascota from "../../Components/filtro_mascota/filtro_mascota";

const mascotaEjemplo = {
  nombre: "Rex",
  edad: "Joven",
  sexo: "Macho",
  raza: "Labrador",
  vacunas: "Completas",
  tratamientos: "Desparasitado",
  niños: "Amigable",
  animales: "Socializa bien",
};

const CaracteristicaMascota = () => {
  return (
    <div>
      <Filtro_mascota mascota={mascotaEjemplo} />
    </div>
  );
};

export default CaracteristicaMascota;
