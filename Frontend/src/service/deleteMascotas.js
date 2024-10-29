export async function handleEliminarMascota(id) {
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
}
