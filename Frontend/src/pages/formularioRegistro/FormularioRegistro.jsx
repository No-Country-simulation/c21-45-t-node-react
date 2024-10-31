import React, { useState } from "react";
import axios from "axios";
import "./FormularioRegistro.css";

const FormularioRegistro = () => {
  const homeImage = "/home_image.png";
  const [formData, setFormData] = useState({
    rol: "persona",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmarPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Resetea el mensaje de error al enviar el formulario

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmarPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Crear objeto para enviar al backend
    const dataToSend = {
      email: formData.email,
      password: formData.password,
      tipoUsuario: formData.rol === "persona" ? "particular" : "organizacion",
      nombre: formData.nombre,
      apellido: formData.rol === "persona" ? formData.apellido : undefined,
    };

    console.log("usuario nuevo", dataToSend);

    setLoading(true); // Muestra indicador de carga

    // Enviar los datos al backend
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", dataToSend);
      console.log(response.data);
      alert("Registro exitoso");
      setFormData({
        // Resetea el formulario después del registro exitoso
        rol: "persona",
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        confirmarPassword: "",
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Hubo un error en el registro. " + (error.response?.data?.message || "Intenta de nuevo más tarde."));
    } finally {
      setLoading(false); // Oculta el indicador de carga
    }
  };

  return (
    <div className="container-formulario-registro">
      <div className="rigth">
        <img src={homeImage} alt="home_image" className="imagenFormulario" />
      </div>
      <div className="container--formulario-left">
        <h2>Formulario de Registro</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Mensaje de error */}
        <div className="container--datos">
          <form onSubmit={handleSubmit}>
            <label htmlFor="rol">Rol:</label>
            <select id="rol" name="rol" value={formData.rol} onChange={handleChange}>
              <option value="persona">Persona</option>
              <option value="organizacion">Organización</option>
            </select>

            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />

            {formData.rol === "persona" && (
              <>
                <label htmlFor="apellido">Apellido:</label>
                <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
              </>
            )}

            <label htmlFor="email">Correo Electrónico:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

            <label htmlFor="confirmarPassword">Repetir Contraseña:</label>
            <input
              type="password"
              id="confirmarPassword"
              name="confirmarPassword"
              value={formData.confirmarPassword}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Registrarse"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioRegistro;
