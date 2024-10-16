import Search from "../search"
import Filtros from "../../../Components/filtros/filtros"

const mascotaperro = () => {
    const filtros = [
        {imagen:'/perro_vector.png', titulo: "edad", atributos: ["Cachorro", "Joven","Adulto Joven","Adulto", "Senior"] },
        {imagen:'/tamaño.png', titulo: "tamaño", atributos: ["grande", "mediano","pequeño"] },
        {imagen:'/genero.png', titulo: "genero", atributos: ["macho", "hembra"] },
        {imagen:'/localizacion.png', titulo: "ubicación", atributos: ["CABA", "Buenos Aires"] },
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