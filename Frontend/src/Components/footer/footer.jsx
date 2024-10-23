import React from "react";
import "../footer/footer.css";



const Footer = ({ logoText }) => {
  const facebookLogo ="/ph_facebook-logo.png";
const twitterLogo ="/ph_twitter-logo.png";
const instagramLogo ="/ph_instagram-logo.png";
  const logo= "/huella.png"
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-left">
          <a href="/">
            <img src={logo} alt="Adopme Logo" className="footer-logo" />
            <span className="footer-logo-text">{logoText}</span>
          </a>
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
              <a href="/agregar-mascota">Publicar mascota</a>
            </li>
          </ul>
        </div>
        <div className="footer-column redes-sociales">
          <ul className="footer-links">
            <li>
              <a href="https://facebook.com">
                <img
                  src={facebookLogo}
                  alt="Facebook"
                  className="social-logo"
                />
              </a>
            </li>
            <li>
              <a href="https://twitter.com">
                <img src={twitterLogo} alt="Twitter" className="social-logo" />
              </a>
            </li>
            <li>
              <a href="https://instagram.com">
                <img
                  src={instagramLogo}
                  alt="Instagram"
                  className="social-logo"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
