import { useContext, useState, useEffect } from "react";
import TablaMascotas from "../../Components/TablaMascotas/TablaMascotas";

import { UserContext } from "../../context/UserContext";
import "./misMascotas.css";

function MisMascotas() {
  const { user } = useContext(UserContext);
  const [mascotas, setMascotas] = useState([]);
  const PK_Usuario = user ? user.payload.PK_Usuario : null;

  // Función para obtener las mascotas de un usuario
  const fetchMascotasUsuario = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/mascota/usuario/${PK_Usuario}`);
      if (!response.ok) {
        throw new Error("Error al obtener las mascotas");
      }
      const data = await response.json();
      setMascotas(data); // Asigna la lista de mascotas al estado
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (PK_Usuario) {
      fetchMascotasUsuario();
    }
  }, [PK_Usuario]);

  return (
    <>
      <div className="container-mis-mascotas">
        <h2>Mis Mascotas</h2>
        <TablaMascotas mascotas={mascotas} />
      </div>
    </>
  );
}

export default MisMascotas;
