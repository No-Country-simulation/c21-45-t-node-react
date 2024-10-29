import { useContext, useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Navbar = () => {
  const logo1 = "/logo.png";
  const logo2 = "adoptme.png";

  const { user, handleLogout } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Crear referencia para el dropdown

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); // Cerrar dropdown si se hace clic fuera
    }
  };

  useEffect(() => {
    // Añadir el evento de clic cuando el componente se monta
    document.addEventListener('mousedown', handleClickOutside);

    // Limpiar el evento al desmontar el componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <img src={logo1} alt="logo1" className="logo1" />
        <Link to={"/"}>
          <img src={logo2} alt="logo2" className="logo2" />
        </Link>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/preguntas-frecuentes">FAQ</Link></li>
          <li><Link to="/mascotas">Quiero adoptar</Link></li>
          <li><Link to="/agregar-mascota">Quiero dar en adopción</Link></li>
        </ul>

        <div className="user-menu-container" ref={dropdownRef}>
          {user && user.payload ? (
            <div className="user-dropdown">
              <li 
                className="nav-links" 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Link to="#" className="dropdown-link">
                  Hola, {user.payload.nombre}!!
                </Link>
              </li>

              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li><Link to="/perfil">Perfil</Link></li>
                  <li><Link to="/mis-mascotas">Mis mascotas</Link></li>
                  <li><Link to="/mis-solicitudes">Mis solicitudes</Link></li>
                  <li><Link to="/" onClick={handleLogout}>Cerrar sesión</Link></li>
                </ul>
              )}
            </div>
          ) : (
            <ul className="nav-links">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/formulario-registro">Registro</Link></li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
