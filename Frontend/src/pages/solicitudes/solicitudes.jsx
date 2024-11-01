import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2";
import "./solicitudes.css";

function Solicitudes() {
  const { user } = useContext(UserContext);
  const PK_Usuario = user ? user.payload.PK_Usuario : null;
  const FK_Rol = user ? user.payload.FK_Rol : null;

  const [solicitudesEnviadas, setSolicitudesEnviadas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalAprobar, setShowModalAprobar] = useState(false); // Nuevo estado para el modal de aprobación
  const [showModalRechazar, setShowModalRechazar] = useState(false);
  const [selectedSolicitudId, setSelectedSolicitudId] = useState(null);

  useEffect(() => {
    const fetchSolicitudesEnviadas = async () => {
      if (PK_Usuario && FK_Rol !== 3) {
        try {
          const response = await fetch(`http://localhost:3000/api/adopcion/enviadas/${PK_Usuario}`);
          if (response.ok) {
            const data = await response.json();
            console.log("Datos de solicitudes:", data);
            setSolicitudesEnviadas(data);
          } else {
            console.error("Error al obtener las solicitudes de adopción");
          }
        } catch (error) {
          console.error("Error en la solicitud de adopciones:", error);
        }
      }
    };

    fetchSolicitudesEnviadas();
  }, [PK_Usuario]);

  const handleOpenModal = (id) => {
    setSelectedSolicitudId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSolicitudId(null);
    setShowModalAprobar(false); // Cerrar modal de aprobación
    setShowModalRechazar(false);
  };

  const handleCancelarSolicitud = async () => {
    if (selectedSolicitudId) {
      try {
        const response = await fetch(`http://localhost:3000/api/adopcion/${selectedSolicitudId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          setSolicitudesEnviadas(solicitudesEnviadas.filter((solicitud) => solicitud.PK_Adopcion !== selectedSolicitudId));
          Swal.fire({
            icon: "success",
            title: "Solicitud cancelada exitosamente",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al cancelar la solicitud",
            text: "Intenta nuevamente más tarde.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error en la solicitud de cancelación",
          text: error.message,
        });
      }
    }
    handleCloseModal();
  };

  const [solicitudesRecibidas, setSolicitudesRecibidas] = useState([]);

  useEffect(() => {
    const fetchSolicitudesRecibidas = async () => {
      if (PK_Usuario) {
        try {
          const response = await fetch(`http://localhost:3000/api/adopcion/recibidas/${PK_Usuario}`);
          if (response.ok) {
            const data = await response.json();
            console.log("Datos de solicitudes recibidas:", data);
            setSolicitudesRecibidas(data);
          } else {
            console.error("Error al obtener las solicitudes de adopción recibidas");
          }
        } catch (error) {
          console.error("Error en la solicitud de adopciones:", error);
        }
      }
    };

    fetchSolicitudesRecibidas();
  }, [PK_Usuario]);

  const handleAprobarSolicitud = (id) => {
    setSelectedSolicitudId(id);
    setShowModalAprobar(true); // Abrir modal de aprobación
  };

  const handleConfirmarAprobacion = async () => {
    if (selectedSolicitudId) {
      try {
        const response = await fetch(`http://localhost:3000/api/adopcion/aceptar/${selectedSolicitudId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Solicitud aprobada exitosamente",
            showConfirmButton: false,
            timer: 1500,
          });
          setSolicitudesRecibidas(solicitudesRecibidas.filter((solicitud) => solicitud.PK_Adopcion !== selectedSolicitudId));
        } else {
          const errorData = await response.json();
          Swal.fire({
            icon: "error",
            title: "Error al aprobar la solicitud",
            text: errorData.error || "Intenta nuevamente más tarde.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error en la solicitud de aprobación",
          text: error.message || "Ocurrió un error inesperado.",
        });
      }
    }
    handleCloseModal();
  };

  // Nueva función para rechazar solicitud
  const handleRechazarSolicitud = (id) => {
    setSelectedSolicitudId(id);
    setShowModalRechazar(true); // Abrir modal de rechazo
  };

  const handleConfirmarRechazo = async () => {
    if (selectedSolicitudId) {
      try {
        const response = await fetch(`http://localhost:3000/api/adopcion/rechazar/${selectedSolicitudId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Solicitud rechazada exitosamente",
            showConfirmButton: false,
            timer: 1500,
          });
          setSolicitudesRecibidas(solicitudesRecibidas.filter((solicitud) => solicitud.PK_Adopcion !== selectedSolicitudId));
        } else {
          const errorData = await response.json();
          Swal.fire({
            icon: "error",
            title: "Error al rechazar la solicitud",
            text: errorData.error || "Intenta nuevamente más tarde.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error en la solicitud de rechazo",
          text: error.message || "Ocurrió un error inesperado.",
        });
      }
    }
    handleCloseModal();
  };

  return (
    <>
      <div style={{ overflowX: "auto" }} className="container-tablas">
        {FK_Rol !== 3 && ( // Ocultar esta sección si el rol es 3
          <div>
            <h2>Solicitudes enviadas</h2>
            <table className="tabla-mascotas">
              <thead>
                <tr>
                  <th>Nombre Mascota</th>
                  <th>Fecha de Solicitud</th>
                  <th>Fecha de Aprobación</th>
                  <th>Estado</th>
                  <th>Cancelar</th>
                </tr>
              </thead>
              <tbody>
                {solicitudesEnviadas.length > 0 ? (
                  solicitudesEnviadas.map((solicitud) => (
                    <tr key={solicitud.PK_Adopcion}>
                      <td>{solicitud.nombre}</td>
                      <td>{new Date(solicitud.fecha_solicitud).toLocaleDateString()}</td>
                      <td>{solicitud.fecha_aprobacion ? new Date(solicitud.fecha_aprobacion).toLocaleDateString() : "Pendiente"}</td>
                      <td>
                        {solicitud.FK_Estado === 1
                          ? "Iniciada"
                          : solicitud.FK_Estado === 2
                          ? "Aprobada"
                          : solicitud.FK_Estado === 3
                          ? "Denegada"
                          : "Desconocido"}
                      </td>
                      <td>
                        <button onClick={() => handleOpenModal(solicitud.PK_Adopcion)} disabled={solicitud.FK_Estado === 2}>Cancelar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No se encontraron solicitudes de adopción enviadas.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div>
          <h2>Solicitudes recibidas</h2>
          <table className="tabla-mascotas">
            <thead>
              <tr>
                <th>Fecha Solicitud</th>
                <th>Fecha Aprobación</th>
                <th>Tipo Vivienda</th>
                <th>Otras Mascotas</th>
                <th>Patio</th>
                <th>Cerramiento</th>
                <th>Compromiso</th>
                <th>Nombre Mascota</th>
                <th>Nombre Adoptante</th>
                <th>Email Adoptante</th>
                <th>Teléfono Adoptante</th>
                <th>Estado</th>
                <th>Aprobar</th>
                <th>Rechazar</th>
              </tr>
            </thead>
            <tbody>
              {solicitudesRecibidas.length > 0 ? (
                solicitudesRecibidas.map((solicitud) => (
                  <tr key={solicitud.PK_Adopcion}>
                    <td>{new Date(solicitud.fecha_solicitud).toLocaleDateString()}</td>
                    <td>{solicitud.fecha_aprobacion ? new Date(solicitud.fecha_aprobacion).toLocaleDateString() : "Pendiente"}</td>
                    <td>{solicitud.tipo_vivienda}</td>
                    <td>{solicitud.otras_mascotas}</td>
                    <td>{solicitud.patio}</td>
                    <td>{solicitud.cerramiento}</td>
                    <td>{solicitud.compromiso}</td>
                    <td>{solicitud.nombre}</td>
                    <td>
                      {solicitud.nombre_usuario} {solicitud.apellido_usuario}
                    </td>
                    <td>{solicitud.email_usuario}</td>
                    <td>{solicitud.telefono_usuario}</td>
                    <td>
                      {solicitud.FK_Estado === 1
                        ? "Iniciada"
                        : solicitud.FK_Estado === 2
                        ? "Aprobada"
                        : solicitud.FK_Estado === 3
                        ? "Denegada"
                        : "Desconocido"}
                    </td>
                    <td>
                      <button onClick={() => handleAprobarSolicitud(solicitud.PK_Adopcion)}>Aprobar</button>
                    </td>
                    <td>
                      <button onClick={() => handleRechazarSolicitud(solicitud.PK_Adopcion)}>Rechazar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No se encontraron solicitudes de adopción recibidas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal para cancelar solicitud */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirmación</h3>
            <p>¿Estás seguro de que deseas cancelar esta solicitud?</p>

            <div className="button-container">
              <button onClick={handleCloseModal} className="button-disabled">
                No
              </button>
              <button onClick={handleCancelarSolicitud}>Si</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para aprobar solicitud */}
      {showModalAprobar && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirmación</h3>
            <p>¿Estás seguro de que deseas aprobar esta solicitud?</p>

            <div className="button-container">
              <button onClick={handleCloseModal} className="button-disabled">
                No
              </button>
              <button onClick={handleConfirmarAprobacion}>Si</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para rechazar solicitud */}
      {showModalRechazar && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirmación</h3>
            <p>¿Estás seguro de que deseas rechazar esta solicitud?</p>
            <div className="button-container">
              <button onClick={handleCloseModal} className="button-disabled">
                No
              </button>
              <button onClick={handleConfirmarRechazo}>Si</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Solicitudes;
