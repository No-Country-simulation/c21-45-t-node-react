import "./Login.css";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const homeImage = "home_image.png";
  const { handleLogin} = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const notificacionRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("data login", data);
      
      handleLogin(data); // Llamar a handleLogin antes de verificar el rol

      // Verificar rol y redirigir en consecuencia
      if (data.payload.FK_Rol === 1) { // Verifica si es administrador
        navigate("/admin");
      } else {
        navigate("/"); // Redirige a la página principal si no es administrador
      }
      
    } catch (error) {
      notificacionRef.current.style.color = "red";
      notificacionRef.current.innerHTML = error.message;
    }
  };

  return (
    <>
      <div className="container-general-login">
        <div className="main-content">
          <div className="container-form-login_right">
            <h2>Login</h2>

            <form
              className="form-login"
              id="login-form"
              onSubmit={handleSubmit}
            >
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
              <label htmlFor="password" className="label-login">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                className="input-login"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <p id="notificacion" ref={notificacionRef}></p>

              <div className="forgot-password">
                <p>¿Olvidaste tu contraseña?</p>
              </div>

              <button className="button-iniciar" type="submit">
                Continuar
              </button>
            </form>

            <div className="separator">
              <span>o ingresar con</span>
            </div>

            <div className="social-login">
              <button className="btn-google">
                <img src="/google.png" alt="Google" />
                Continuar con Google
              </button>
              <button className="btn-facebook">
                <img src="/facebook.png" alt="Facebook" />
                Continuar con Facebook
              </button>
              <button className="btn-x">
                <img src="/x.png" alt="X" />
                Continuar con X
              </button>
            </div>
          </div>

          <div className="container-img-login_left">
            <img src={homeImage} alt="home" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
