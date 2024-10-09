import React from "react";
import "../footer/footer.css";
import logo from "../../images/huella.png";
import facebookLogo from "../../images/ph_facebook-logo.png";
import twitterLogo from "../../images/ph_twitter-logo.png";
import instagramLogo from "../../images/ph_instagram-logo.png"; 

const Footer = ({ logoText }) => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-left">
          <img src={logo} alt="Adopme Logo" className="footer-logo" />
          <span className="footer-logo-text">{logoText}</span>
        </div>
        <div className="footer-column">
          <ul className="footer-links">
            <li>
              <a href="/mascotas">Mascotas</a>
            </li>
            <li>
              <a href="/proceso-adopcion">Proceso de adopción</a>
            </li>
            <li>
              <a href="/preguntas-frecuentes">Preguntas frecuentes</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <ul className="footer-links">
            <li>
              <a href="/requisitos-adoptar">Requisitos para adoptar</a>
            </li>
            <li>
              <a href="/publicar-mascota">Publicar mascota</a>
            </li>
          </ul>
        </div>
        <div className="footer-column redes-sociales">
  <ul className="footer-links">
    <li>
      <a href="https://facebook.com">
        <img src={facebookLogo} alt="Facebook" className="social-logo" />
      </a>
    </li>
    <li>
      <a href="https://twitter.com">
        <img src={twitterLogo} alt="Twitter" className="social-logo" />
      </a>
    </li>
    <li>
      <a href="https://instagram.com">
        <img src={instagramLogo} alt="Instagram" className="social-logo" />
      </a>
    </li>
  </ul>
</div>

      </div>
    </footer>
  );
};

export default Footer;
