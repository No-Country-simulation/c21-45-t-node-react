import { useState } from "react";
import Swal from "sweetalert2";
import "./TablaUsuario.css";

function TablaUser({ users }) {
  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");

  const handleOpenModalEliminar = (id, nombre) => {
    setSelectedUserId(id);
    setSelectedUserName(nombre);
    setShowModalEliminar(true);
  };

  const handleCloseModalEliminar = () => {
    setShowModalEliminar(false);
    setSelectedUserId(null);
    setSelectedUserName("");
  };

  const handleConfirDeleteUsuario = async () => {
    handleCloseModalEliminar();
    if (selectedUserId) {
      await handleEliminar(selectedUserId);
    }
  };

  const handleEliminar = async () => {
    console.log("Iniciando eliminación del usuario con ID:", selectedUserId);
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${selectedUserId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "¡Eliminado!",
          text: `Usuario ${selectedUserName} eliminado exitosamente.`,
          confirmButtonText: "Aceptar",
        });
        // Actualizar la lista de usuarios sin recargar la página
        // setUsers(users.filter((user) => user.PK_Usuario !== selectedUserId));
        handleCloseModalEliminar();
        window.location.reload();
      } else {
        const errorText = await response.text();
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: `No se pudo eliminar el usuario. Detalle: ${errorText}`,
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error en la solicitud de eliminación: " + error.message,
        confirmButtonText: "Aceptar",
      });
      console.error("Error en la solicitud de eliminación:", error);
    }
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Calle</th>
            <th>Número</th>
            <th>Localidad</th>
            <th>Provincia</th>
            <th>País</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.nombre}</td>
                <td>{user.apellido}</td>
                <td>{user.email}</td>
                <td>{user.calle}</td>
                <td>{user.numero}</td>
                <td>{user.localidad}</td>
                <td>{user.provincia}</td>
                <td>{user.pais}</td>
                <td>
                  <button onClick={() => handleOpenModalEliminar(user.PK_Usuario, user.nombre)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No hay usuarios disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModalEliminar && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmar Eliminación</h2>
            <p>
              ¿Estás seguro de que deseas eliminar el usuario <strong>{selectedUserName}</strong>?
            </p>

            <div className="button-container">
              <button onClick={handleCloseModalEliminar} className="button-disabled">
                Cancelar
              </button>
              <button onClick={handleConfirDeleteUsuario}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TablaUser;
