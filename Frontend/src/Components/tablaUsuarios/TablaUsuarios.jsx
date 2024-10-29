import './TablaUsuario.css'


function TablaUser({users}) {
    console.log("Hay usuarios en la tabla:", users);

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
                      <button onClick={() => handleEliminar(user.PK_Usuario)}>Eliminar</button>
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
        </div>
      );
}

// Función para manejar la eliminación de una mascota
function handleEliminar(id) {
    console.log("Eliminar mascota con ID:", id);
}

export default TablaUser;
