import './Login.css'
import homeImage from '../../../images/home_image.png'; 

function Login() {
    return (
      <>
        <div className='container-general-login'>
          <div className='nav'>
            <p>componente NAV</p>
          </div>
  
          <div className="main-content">
            <div className="container-form-login">
              <h2>Login</h2>
  
              <form className="form-login">
                <label htmlFor="email" className='label-login'>Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Usuario/Correo"
                  className="input-login"
                />
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  className="input-login"
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

            <div className='container-img-login'>
                <img src={homeImage} alt="" />
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Login;
  