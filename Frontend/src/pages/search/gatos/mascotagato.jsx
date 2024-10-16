import Search from "../search"
import Filtros from "../../../Components/filtros/filtros"

const mascotagato = () => {
    const filtros = [
        {imagen:'/gato.png', titulo: "edad", atributos: ["Cachorro", "Joven","Adulto Joven","Adulto", "Senior"] },
        {imagen:'/tamaño.png', titulo: "tamaño", atributos: ["grande", "mediano","pequeño"] },
        {imagen:'/genero.png', titulo: "genero", atributos: ["macho", "hembra"] },
        {imagen:'/localizacion.png', titulo: "ubicacion", atributos: ["CABA", "Buenos Aires"] },
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

export default mascotagato