import { useContext, React, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';


const Navbar = () => {
  const logo1= "/logo.png"
  const logo2="adoptme.png"

  const { user, logout } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout(); // Llamamos a la función de logout desde el contexto
  };

  return (
    <header className="header">

        <img src={logo1} alt="logo1" className="logo1" />
        {/* Se linkea al home la imagen del logo2 */}
        <Link to={"/"}><img src={logo2} alt="logo2" className="logo2" /></Link>

        <nav className="navbar">
            <a href="/preguntas-frecuentes">FAQ</a>
            <a href="/mascotas">Quiero adoptar</a>
            <a href="/agregar-mascota">Quiero dar en adopción</a>

            {/* Esta comentado porque mueve la estructura del nav, pero la funcionalidad de cerrar sesión funciona */}
            {/* Mostrar Login/Registro o Dropdown según el estado del usuario */}
            {/* <div className="user-menu-container">
              {user ? (
                <div className="user-dropdown">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="dropdown-button"
                  >
                    Hola, {user.nombre}!!
                  </button>

                  {isDropdownOpen && (
                    <ul className="dropdown-menu">
                      <li><Link to="/perfil">Perfil</Link></li>
                      <li><Link to="/mis-mascotas">Mis mascotas</Link></li>
                      <li><Link to="/mis-solicitudes">Mis solicitudes</Link></li>
                      <li><a href="/" onClick={handleLogout}>Cerrar sesión</a></li>
                    </ul>
                  )}
                </div>
              ) : ( */}
                <>
                  <button type="submit" id="Login"><Link to={"/login"}>Login</Link></button>
                  <button type="submit" id="Registro"><Link to={"/formulario-registro"}>Registro</Link></button>
                </>
              {/* )}
            </div> */}
        </nav>

    </header>
  )
}

export default Navbar
