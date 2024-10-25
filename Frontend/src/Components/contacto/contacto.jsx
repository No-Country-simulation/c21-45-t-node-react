import { Link } from "react-router-dom";
import './contacto.css'
const Contacto = () => {
  return (
    <div className="contact">
      <div className="left_contact">
        <div className="contact_btn">
        <h1>Contactame</h1>
        <div className="btn-contact">
          <Link to="/formulario-adopcion">
            <button> Solicitar adopcion</button>
          </Link>
          </div>
          <div className="perteneciente">
            <img src="/email-refugio.png" alt="" srcset="" />
            <p>refugiopatitas@gmail.com</p>
          </div>
            <div className="name-refugio">
            <img src="/nombre-refugio.png" alt="" />
            <p>Refugio patitas</p>
          </div>
        </div>
      </div>
      <div className="right_contact">
        <img src="perro_contacto.png" alt="" />
      </div>
    </div>
  );
};

export default Contacto;
