import { useContext, useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const logo1 = "/logo.png";
  const logo2 = "adoptme.png";

  const { user, handleLogout } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <img src={logo1} alt="logo1" className="logo1" />

        <Link to="/">
          <img src={logo2} alt="logo2" className="logo2" />
        </Link>
      </div>
      <nav className="navbar">
        {/* Mostrar enlaces de navegación solo si el usuario tira error o no es administrador */}
        {(!user || user.error || user.payload.FK_Rol !== 1) && (
          <ul className="nav-links">
            <li>
              <Link to="/preguntas-frecuentes">FAQ</Link>
            </li>
            <li>
              <Link to="/mascotas">Quiero adoptar</Link>
            </li>
            <li>
              <Link to="/agregar-mascota">Quiero dar en adopción</Link>
            </li>
          </ul>
        )}

        <div className="user-menu-container" ref={dropdownRef}>
          {user && user.payload ? (
            <div className="user-dropdown">
              <li className="nav-links" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <div to="" className="dropdown-link">
                  Hola, {user.payload.nombre}!
                </div>
              </li>

              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  {user.payload.FK_Rol === 1 ? (
                    // Mostrar solo para administrador
                    <li>
                      <Link to="/" className="dropdown-link" onClick={handleLogout}>
                        Cerrar sesión
                      </Link>
                    </li>
                  ) : (
                    // Menú completo para otros usuarios
                    <>
                      <li>
                        <Link to="/perfil" className="dropdown-link" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                          Perfil
                        </Link>
                      </li>
                      <li>
                        <Link to="/mis-mascotas" className="dropdown-link" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                          Mis mascotas
                        </Link>
                      </li>
                      <li>
                        <Link to="/solicitudes" className="dropdown-link" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                          Mis solicitudes
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="dropdown-link" onClick={handleLogout}>
                          Cerrar sesión
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </div>
          ) : (
            <ul className="nav-links">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/formulario-registro">Registro</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
