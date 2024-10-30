import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import "./perfil.css";
import Swal from "sweetalert2";
import editarImg from "/editar.png";

const Perfil = () => {
  const { user, isLoading } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paises, setPaises] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);

  const defaultProfileImage = "/default_user.png";

  // Asegúrate de tener userId definido
  const userId = user?.payload?.PK_Usuario; // Cambia esto si el ID está en otro lugar

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.payload.nombre || "",
        apellido: user.payload.apellido || "",
        email: user.payload.email || "",
        telefono: user.payload.telefono || "",
        tipo_doc: user.payload.tipo_doc || "",
        nro_doc: user.payload.nro_doc || "",
        calle: user.payload.calle || "",
        numero: user.payload.numero || "",
        localidad: user.payload.localidad || "",
        provincia: user.payload.provincia || "",
        pais: user.payload.pais || "",
        foto_perfil: user.payload.foto_perfil || defaultProfileImage,
      });
    }
  }, [user]);

  // Obtener países
  useEffect(() => {
    const fetchPaises = async () => {
      const response = await axios.get("http://localhost:3000/api/ubicacion/pais");
      setPaises(response.data);
    };
    fetchPaises();
  }, []);

  // Obtener provincias cuando se selecciona un país
  useEffect(() => {
    const fetchProvincias = async () => {
      if (formData.pais) {
        const response = await axios.get(`http://localhost:3000/api/ubicacion/provincia/${formData.pais}`);
        setProvincias(response.data);
      }
    };
    fetchProvincias();
  }, [formData.pais]);

  // Obtener localidades cuando se selecciona una provincia
  useEffect(() => {
    const fetchLocalidades = async () => {
      if (formData.provincia) {
        const response = await axios.get(`http://localhost:3000/api/ubicacion/localidad/${formData.provincia}`);
        setLocalidades(response.data);
      }
    };
    fetchLocalidades();
  }, [formData.provincia]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setLoading(false);
    setIsEditing(false);
  };
  const handleSave = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.put(`http://localhost:3000/api/usuarios/${userId}`, formData); // Usa formData en lugar de userData

      console.log("Datos actualizados:", response.data);
      Swal.fire({
        icon: "success",
        title: "Perfil actualizado exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error al actualizar el perfil",
        text: error.response?.data?.message || "Intenta de nuevo más tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!user) {
    return <div className="error">No hay usuario conectado.</div>;
  }

  return (
    <div className="container-perfil">
      <div className="perfil-header">
        <img src={formData.foto_perfil} alt="Perfil" className="perfil-image" />
        <h1>Perfil de Usuario</h1>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <p>
        <strong>Nombre:</strong>
        {isEditing ? (
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        ) : (
          <>
            {formData.nombre || "No disponible"}
            <img
              src={editarImg}
              alt="Editar"
              onClick={handleEditClick}
              style={{ cursor: "pointer", marginLeft: "10px", width: "20px", height: "20px" }}
            />
          </>
        )}
      </p>
      {/* Repite el mismo patrón para los demás campos */}
      <p>
        <strong>Apellido:</strong>
        {isEditing ? (
          <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
        ) : (
          <>
            {formData.apellido || "No disponible"}
            <img
              src={editarImg}
              alt="Editar"
              onClick={handleEditClick}
              style={{ cursor: "pointer", marginLeft: "10px", width: "20px", height: "20px" }}
            />
          </>
        )}
      </p>
      <p>
        <strong>Email:</strong>
        {isEditing ? (
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        ) : (
          <>
            {formData.email || "No disponible"}
            <img
              src={editarImg}
              alt="Editar"
              onClick={handleEditClick}
              style={{ cursor: "pointer", marginLeft: "10px", width: "20px", height: "20px" }}
            />
          </>
        )}
      </p>
      <p>
        <strong>Teléfono:</strong>
        {isEditing ? (
          <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} />
        ) : (
          <>
            {formData.telefono || "No disponible"}
            <img
              src={editarImg}
              alt="Editar"
              onClick={handleEditClick}
              style={{ cursor: "pointer", marginLeft: "10px", width: "20px", height: "20px" }}
            />
          </>
        )}
      </p>
      <p>
        <strong>Tipo de Documento:</strong>
        {isEditing ? (
          <input type="text" name="tipo_doc" value={formData.tipo_doc} onChange={handleChange} />
        ) : (
          <>
            {formData.tipo_doc || "No disponible"}
            <img
              src={editarImg}
              alt="Editar"
              onClick={handleEditClick}
              style={{ cursor: "pointer", marginLeft: "10px", width: "20px", height: "20px" }}
            />
          </>
        )}
      </p>
      <p>
        <strong>Número de Documento:</strong>
        {isEditing ? (
          <input type="text" name="nro_doc" value={formData.nro_doc} onChange={handleChange} />
        ) : (
          <>
            {formData.nro_doc || "No disponible"}
            <img
              src={editarImg}
              alt="Editar"
              onClick={handleEditClick}
              style={{ cursor: "pointer", marginLeft: "10px", width: "20px", height: "20px" }}
            />
          </>
        )}
      </p>
      <p>
        <strong>Calle:</strong>
        {isEditing ? (
          <input type="text" name="calle" value={formData.calle} onChange={handleChange} />
        ) : (
          <>
            {formData.calle || "No disponible"}
            <img
              src={editarImg}
              alt="Editar"
              onClick={handleEditClick}
              style={{ cursor: "pointer", marginLeft: "10px", width: "20px", height: "20px" }}
            />
          </>
        )}
        <strong>Nº:</strong>
        {isEditing ? (
          <input type="text" name="numero" value={formData.numero} onChange={handleChange} placeholder="Número" />
        ) : (
          <>
            {formData.numero || "No disponible"}
            <img
              src={editarImg}
              alt="Editar"
              onClick={handleEditClick}
              style={{ cursor: "pointer", marginLeft: "10px", width: "20px", height: "20px" }}
            />
          </>
        )}
      </p>
      <p>
        <strong>País:</strong>
        {isEditing ? (
          <select name="pais" value={formData.PK_Pais} onChange={handleChange}>
            <option value="">Seleccione un país</option>
            {paises.map((pais) => (
              <option key={pais.PK_Pais} value={pais.PK_Pais}>
                {pais.nombre}
              </option>
            ))}
          </select>
        ) : (
          <>
            {formData.pais || "No disponible"}
            <img
              src={editarImg}
              alt="Editar"
              onClick={handleEditClick}
              style={{ cursor: "pointer", marginLeft: "10px", width: "20px", height: "20px" }}
            />
          </>
        )}
        <strong>Provincia:</strong>
        {isEditing ? (
          <select name="provincia" value={formData.PK_Provincia} onChange={handleChange} disabled={!formData.pais}>
            <option value="">Seleccione una provincia</option>
            {provincias.map((provincia) => (
              <option key={provincia.PK_Provincia} value={provincia.PK_Provincia}>
                {provincia.nombre}
              </option>
            ))}
          </select>
        ) : (
          <>
            {formData.provincia || "No disponible"}
            <img
              src={editarImg}
              alt="Editar"
              onClick={handleEditClick}
              style={{ cursor: "pointer", marginLeft: "10px", width: "20px", height: "20px" }}
            />
          </>
        )}
      </p>
      <p>
        <strong>Localidad:</strong>
        {isEditing ? (
          <select name="localidad" value={formData.PK_Localidad} onChange={handleChange} disabled={!formData.provincia}>
            <option value="">Seleccione una localidad</option>
            {localidades.map((localidad) => (
              <option key={localidad.PK_Localidad} value={localidad.PK_Localidad}>
                {localidad.nombre}
              </option>
            ))}
          </select>
        ) : (
          <>
            {formData.localidad || "No disponible"}
            <img
              src={editarImg}
              alt="Editar"
              onClick={handleEditClick}
              style={{ cursor: "pointer", marginLeft: "10px", width: "20px", height: "20px" }}
            />
          </>
        )}
      </p>

      {isEditing && (
        <div className="button-container">
          <button className="button-disabled" onClick={handleCancel} disabled={loading}>
            Cancelar
          </button>
          <button onClick={handleSave} disabled={loading}>
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Perfil;
