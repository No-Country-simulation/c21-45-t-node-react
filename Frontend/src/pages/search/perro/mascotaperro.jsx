import Search from "../search"
import Filtros from "../../../Components/filtros/filtros"

const mascotaperro = () => {
    const filtros = [
        {imagen:'/perro_vector.png', titulo: "EDAD", atributos: ["Cachorro", "Joven","Adulto Joven","Adulto", "Senior"] },
        {imagen:'/tamaño.png', titulo: "TAMAÑO", atributos: ["Grande", "Mediano","Pequeño"] },
        {imagen:'/genero.png', titulo: "GÉNERO", atributos: ["Macho", "Hembra"] },
        {imagen:'/localizacion.png', titulo: "UBICACIÓN", atributos: ["CABA", "Buenos Aires"] },
      ];
    return(
        <div className="gato">
                  <div className="filtros-container">
        {filtros.map((filtro, index) => (
          <Filtros key={index} filtro={filtro} />
        ))}
      </div>
            <Search />
        </div>
    )
}

export default mascotaperro