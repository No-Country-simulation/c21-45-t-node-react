import React from 'react';
import './Navbar.css';
import logo1 from '../../images/logo.png';
import logo2 from '../../images/adoptme.png';

const Navbar = () => {
  return (
    <header className="header">

        <img src={logo1} alt="logo1" className="logo1" />
        <img src={logo2} alt="logo2" className="logo2" />

        <nav className="navbar">
            <a href="/">FAQ</a>
            <a href="/">Historias</a>
            <a href="/">Quiero adoptar</a>
            <a href="/">Quiero dar en adopción</a>
            <button type="submit" id="Login">Login</button>
            <button type="submit" id="Registro">Registro</button>
        </nav>

    </header>
  )
}

export default Navbar
