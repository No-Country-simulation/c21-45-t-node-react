import { useContext, useState } from "react";
import { formatDate } from "../../service/formatoFecha";
import "./TablaMascotas.css";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2";

function TablaMascotas({ mascotas }) {
  const { user } = useContext(UserContext);

  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [selectedMascotaId, setSelectedMascotaId] = useState(null);
  const [selectedMascotaNombre, setSelectedMascotaNombre] = useState("");
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [selectedMascota, setSelectedMascota] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleOpenModalEliminar = (id, nombre) => {
    setSelectedMascotaId(id);
    setSelectedMascotaNombre(nombre);
    setShowModalEliminar(true);
  };

  const handleCloseModalEliminar = () => {
    setShowModalEliminar(false);
    setSelectedMascotaId(null);
    setSelectedMascotaNombre("");
  };

  const handleConfirmDelete = async () => {
    handleCloseModalEliminar(); // Cierra el modal antes de mostrar el SweetAlert

    if (selectedMascotaId) {
      await handleEliminarMascota(selectedMascotaId);
    }
  };

  const handleEliminarMascota = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/mascota/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "¡Eliminado!",
          text: `Mascota ${selectedMascotaNombre} eliminada exitosamente.`,
          confirmButtonText: "Aceptar",
        });
        window.location.reload();
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar la mascota. Inténtalo de nuevo.",
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

  const handleOpenModalEditar = (mascota) => {
    setSelectedMascota(mascota);
    setEditFormData({ ...mascota, fecha_nacimiento: new Date(mascota.fecha_nacimiento).toISOString().split("T")[0] }); // Establece los datos iniciales en el formulario
    setShowModalEditar(true);
  };

  const handleCloseModalEditar = () => {
    setShowModalEditar(false);
    setSelectedMascota(null);
    setEditFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/mascota/${selectedMascota.PK_Mascota}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        handleCloseModalEditar();
        await Swal.fire({
          icon: "success",
          title: "¡Actualizado!",
          text: `Mascota ${editFormData.nombre} actualizada exitosamente.`,
          confirmButtonText: "Aceptar",
        });
        window.location.reload();
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo actualizar la mascota. Inténtalo de nuevo.",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error en la solicitud de actualización: " + error.message,
        confirmButtonText: "Aceptar",
      });
      console.error("Error en la solicitud de actualización:", error);
    }
  };

  const isAdmin = user && user.payload && user.payload.FK_Rol === 1;

  return (
    <>
      <div style={{ overflowX: "auto" }}>
        <table className="tabla-mascotas">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Especie</th>
              <th>Raza</th>
              <th>Género</th>
              <th>Tamaño</th>
              <th>Fecha de nacimiento</th>
              <th>Edad</th>
              {!isAdmin && (
                <>
                  <th>Castrado</th>
                  <th>Vacunado</th>
                  <th>Amigable con los niños</th>
                  <th>Amigable con los perros</th>
                  <th>Amigable con los gatos</th>
                  <th>¿Enfermedades?</th>
                </>
              )}
              <th>Detalles</th>
              {isAdmin && (
                <>
                  <th>Localidad</th>
                  <th>Provincia</th>
                  <th>País</th>
                  <th>Publicada por</th>
                </>
              )}
              <th>Adoptada</th>
              {!isAdmin && <th>Editar</th>}
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {mascotas && mascotas.length > 0 ? (
              mascotas.map((mascota) => (
                <tr key={mascota.PK_Mascota}>
                  <td>{mascota.nombre}</td>
                  <td>{mascota.especie}</td>
                  <td>{mascota.raza}</td>
                  <td>{mascota.sexo}</td>
                  <td>{mascota.tamanio}</td>
                  <td>{formatDate(mascota.fecha_nacimiento)}</td>
                  <td>{mascota.edad}</td>
                  {!isAdmin && (
                    <>
                      <td>{mascota.castrado === 1 ? "Si" : "No"}</td>
                      <td>{mascota.vacunado === 1 ? "Si" : "No"}</td>
                      <td>{mascota.amigable_ninos === 1 ? "Si" : "No"}</td>
                      <td>{mascota.amigable_perros === 1 ? "Si" : "No"}</td>
                      <td>{mascota.amigable_gatos === 1 ? "Si" : "No"}</td>
                      <td>{mascota.enfermedades}</td>
                    </>
                  )}
                  <td>{mascota.detalle}</td>
                  {isAdmin && (
                    <>
                      <td>{mascota.localidad}</td>
                      <td>{mascota.provincia}</td>
                      <td>{mascota.pais}</td>
                      <td>
                        {mascota.usuario_nombre} {mascota.usuario_apellido}
                      </td>
                    </>
                  )}
                  <td>{mascota.adoptada ? "Sí" : "No"}</td>
                  {!isAdmin && (
                    <td>
                      <button onClick={() => handleOpenModalEditar(mascota)}>Editar</button>
                    </td>
                  )}
                  <td>
                    <button onClick={() => handleOpenModalEliminar(mascota.PK_Mascota, mascota.nombre)}>Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="19">No hay mascotas disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModalEliminar && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmar Eliminación</h2>
            <p>
              ¿Estás seguro de que deseas eliminar la mascota <strong>{selectedMascotaNombre}</strong>?
            </p>

            <div className="button-container">
              <button onClick={handleCloseModalEliminar} className="button-disabled">
                Cancelar
              </button>
              <button onClick={handleConfirmDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {showModalEditar && selectedMascota && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Mascota</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>
                  Nombre:
                  <input type="text" name="nombre" value={editFormData.nombre || ""} onChange={handleChange} required />
                </label>
              </div>
              <div>
                <label>
                  Especie:
                  <select name="especie" value={editFormData.especie || ""} onChange={handleChange} required>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Raza:
                  <input type="text" name="raza" value={editFormData.raza || ""} onChange={handleChange} required />
                </label>
              </div>
              <div>
                <label>
                  Género:
                  <select name="sexo" value={editFormData.sexo || ""} onChange={handleChange} required>
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Tamaño:
                  <select name="tamanio" value={editFormData.tamanio || ""} onChange={handleChange} required>
                    <option value="Pequeño">Pequeño</option>
                    <option value="Mediano">Mediano</option>
                    <option value="Grande">Grande</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Fecha de Nacimiento:
                  <input type="date" name="fecha_nacimiento" value={editFormData.fecha_nacimiento || ""} onChange={handleChange} required />
                </label>
              </div>
              <div>
                <label>
                  Detalles:
                  <textarea name="detalle" value={editFormData.detalle || ""} onChange={handleChange} />
                </label>
              </div>

              <div className="button-container">
                <button type="button" className="button-disabled" onClick={handleCloseModalEditar}>
                  Cancelar
                </button>
                <button type="submit">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default TablaMascotas;
