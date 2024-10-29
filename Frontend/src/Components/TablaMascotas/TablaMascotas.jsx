import { useContext, useState } from "react";
import { formatDate } from "../../service/formatoFecha";
import './TablaMascotas.css'; // Asegúrate de importar el archivo CSS
import { UserContext } from "../../context/UserContext";

function TablaMascotas({ mascotas }) {
    const { user } = useContext(UserContext);
    console.log("usuario tabla", user);

    const [showModal, setShowModal] = useState(false);
    const [selectedMascotaId, setSelectedMascotaId] = useState(null);

    const handleOpenModal = (id) => {
        setSelectedMascotaId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMascotaId(null);
    };

    const handleConfirmDelete = async () => {
        if (selectedMascotaId) {
            await handleEliminarMascota(selectedMascotaId);
        }
        handleCloseModal();
    };

    const handleEliminarMascota = async (id) => {
        try {
            const response = await fetch(`/api/mascotas/${id}`, { method: 'DELETE' });
            if (response.ok) {
                // Filtra la lista para remover la mascota eliminada
                setMascotas((prevMascotas) => prevMascotas.filter(mascota => mascota.id !== id));
                console.log(`Mascota con ID ${id} eliminada exitosamente.`);
            } else {
                console.error("Error al eliminar la mascota.");
            }
        } catch (error) {
            console.error("Error en la solicitud de eliminación:", error);
        }
    };

    const isAdmin = user && user.payload && user.payload.FK_Rol === 1;

    return (
        <>
            <div style={{ overflowX: "auto" }}>
                <table className="tabla-mascotas">
                    <thead>
                        <tr>
                            <th>Especie</th>
                            <th>Raza</th>
                            <th>Género</th>
                            <th>Tamaño</th>
                            <th>Fecha de nacimiento</th>
                            <th>Edad</th>
                            {/* Mostrar columnas condicionalmente */}
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
                            <th>Localidad</th>
                            <th>Provincia</th>
                            <th>País</th>
                            {isAdmin && <th>Publicada por</th>}

                            <th>Adoptada</th>
                            {!isAdmin && <th>Editar</th>}
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mascotas && mascotas.length > 0 ? (
                            mascotas.map((mascota, index) => (
                                <tr key={index}>
                                    <td>{mascota.especie}</td>
                                    <td>{mascota.raza}</td>
                                    <td>{mascota.sexo}</td>
                                    <td>{mascota.tamanio}</td>
                                    <td>{formatDate(mascota.fecha_nacimiento)}</td>
                                    <td>{mascota.edad}</td>
                                    {/* Mostrar columnas condicionalmente */}
                                    {!isAdmin && (
                                        <>
                                            <td>{mascota.castrado ? "Sí" : "No"}</td>
                                            <td>{mascota.vacunado ? "Sí" : "No"}</td>
                                            <td>{mascota.amigable_ninos ? "Sí" : "No"}</td>
                                            <td>{mascota.amigable_perros ? "Sí" : "No"}</td>
                                            <td>{mascota.amigable_gatos ? "Sí" : "No"}</td>
                                            <td>{mascota.enfermedades ? "Sí" : "No"}</td>
                                        </>
                                    )}
                                    <td>{mascota.detalle}</td>
                                    <td>{mascota.localidad}</td>
                                    <td>{mascota.provincia}</td>
                                    <td>{mascota.pais}</td>
                                    {isAdmin && (
                                        <td>{mascota.usuario_nombre} {mascota.usuario_apellido}</td>

                                    )}
                                    <td>{mascota.adoptada ? "Sí" : "No"}</td>
                                    {!isAdmin && (
                                        <td>
                                            <button onClick={() => handleEdit(mascota.id)}>Editar</button>
                                        </td>
                                    )}
                                    <td>
                                        <button onClick={() => handleOpenModal(mascota.id)}>Eliminar</button>
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

            {/* Modal de confirmación */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmar Eliminación</h2>
                        <p>¿Estás seguro de que deseas eliminar esta mascota?</p>
                        <button onClick={handleConfirmDelete}>Eliminar</button>
                        <button onClick={handleCloseModal}>Cancelar</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default TablaMascotas;
