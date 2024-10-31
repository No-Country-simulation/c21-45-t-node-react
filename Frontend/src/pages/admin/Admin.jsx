import { useContext } from "react";
import TablaMascotas from "../../Components/TablaMascotas/tablaMascotas";
import { MascotasContext } from "../../context/Mascotascontext";
import TablaUser from "../../Components/tablaUsuarios/TablaUsuarios";
import { UserContext } from "../../context/UserContext";
import "./Admin.css";

function Admin() {
  const { mascotas } = useContext(MascotasContext);
  const { users } = useContext(UserContext);

  console.log("usuarios en admin", users);

  return (
    <>
      <div className="admin-container">
        <div className="tabla-mascotas">
          <h2>Lista de mascotas</h2>
          <TablaMascotas mascotas={mascotas} />
        </div>

        <div className="tabla-mascotas">
          <h1>Lista de usuarios</h1>
          <TablaUser users={users} />
        </div>
      </div>
    </>
  );
}

export default Admin;
