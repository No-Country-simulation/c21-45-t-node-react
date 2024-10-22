import './Login.css'

import "./Login.css";
import { useState } from "react";
import homeImage from "../../images/home_image.png";

function Login() {
  const homeImage= "home_image.png"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const requestBody = {
      email: email,
      password: password,
    };

    console.log("Datos enviados:", requestBody);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login exitoso:", data);
        // Aquí redirigir a donde corresponda o guardar el usuario en el estado global
      } else {
        console.error("Error en el login:", response.statusText);
        alert("Usuario o contraseña incorrectos"); // sacar y poner un mensaje en pantalla
      }
    } catch (error) {
      console.error("Error en la petición:", error); // mostrar mensaje de error
    }
  };

  return (
    <>
      <div className="container-general-login">
        <div className="nav">
          <p>componente NAV</p>
        </div>

        <div className="main-content">
          <div className="container-form-login">
            <h2>Login</h2>

            <form className="form-login" id="login-form" onSubmit={handleLogin}>
              <label htmlFor="email" className="label-login">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Usuario/Correo"
                className="input-login"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                className="input-login"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
              />

              <div className="forgot-password">
                <p>¿olvidaste tu contraseña?</p>
              </div>

              <button className="button-iniciar" type="submit">
                Continue
              </button>
            </form>

            <div className="separator">
              <span>o ingresar con</span>
            </div>

            <div className="social-login">
              <button className="btn-google">Continuar con Google</button>
              <button className="btn-facebook">Continuar con Facebook</button>
              <button className="btn-x">Continuar con X</button>
            </div>
          </div>

          <div className="container-img-login">
            <img src={homeImage} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
