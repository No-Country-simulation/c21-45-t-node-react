import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const logo1= "/logo.png"
  const logo2="adoptme.png"
  return (
    <header className="header">

        <img src={logo1} alt="logo1" className="logo1" />
        <img src={logo2} alt="logo2" className="logo2" />

        <nav className="navbar">
            <a href="/">FAQ</a>
            <a href="/">Quiero adoptar</a>
            <a href="/formulario-registro">Quiero dar en adopción</a>
            <button type="submit" id="Login">  <Link to={"/login"}>Login</Link></button>                            
            <button type="submit" id="Registro"><Link to={"/formulario-registro"}>Registro</Link></button> 
        </nav>

    </header>
  )
}

export default Navbar
