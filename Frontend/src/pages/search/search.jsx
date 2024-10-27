import { useNavigate } from "react-router-dom";
import CardMascota from "../../Components/card/CardMascota";
import useFetchMascotas from "../../hooks/useFetchMascotas";

function Search({ filters }) {
  const navigate = useNavigate();
  console.log("paso a fetch mascotas: ", filters);
  const { mascotas, loading } = useFetchMascotas(filters);

  if (loading) return <p>Cargando...</p>;

  const handleSelectMascota = (mascota) => {
    navigate(`/detalle-mascota`, { state: { mascota } });
  };

  return (
    <div className="mascota-container">
      <h1 className="busqueda-title">Encuentra a tu mascota</h1>
      <div className="mascota-grid">
        {Array.isArray(mascotas) && mascotas.length > 0 ? (
          mascotas.map((mascota, index) => (
            <div key={index} onClick={() => handleSelectMascota(mascota)}>
              <CardMascota mascota={mascota} />
            </div>
          ))
        ) : (
          <p>No hay mascotas disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default Search;
