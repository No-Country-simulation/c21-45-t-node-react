import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Search from "../../pages/search/search";
import "./HomePage.css";

const HomePage = () => {
  const homeImage = "home_image.png";
  const gato = "/Rectangulo_gato.png";
  const perro = "/rectangulo_perro.png";
  const lupa = "/lupa.png";

  const [paises, setPaises] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPais, setSelectedPais] = useState("");
  const [selectedEspecie, setSelectedEspecie] = useState("");

  const navigate = useNavigate();

  const setFiltroEspecie = (especie) => {
    selectedEspecie == especie ? setSelectedEspecie("") : setSelectedEspecie(especie);
  };

  const handleNavigateWithFilters = () => {
    const filters = {
      pais: selectedPais,
      especie: selectedEspecie,
    };
    navigate("/mascotas", { state: filters });
  };

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/ubicacion/pais");
        setPaises(response.data);
      } catch (error) {
        console.error("Error al obtener los países:", error);
        setError("No se pudo cargar la lista de países.");
      }
    };

    fetchPaises();
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="home-left">
          <h1 className="main-title">Dales una segunda oportunidad, encuentra a tu nuevo mejor amigo</h1>

          <div className="search-section">
            <h2>¡Encuentra a tu compañero!</h2>
            <p>¿Qué mascota estás buscando?</p>
            <div className="container-masc">
              <img className={selectedEspecie === "Gato" ? "selected" : ""} src={gato} alt="Gato" onClick={() => setFiltroEspecie("Gato")} />
              <img className={selectedEspecie === "Perro" ? "selected" : ""} src={perro} alt="Perro" onClick={() => setFiltroEspecie("Perro")} />
            </div>
            <p>¿De dónde eres?</p>

            <div className="buscador">
              <select name="pais" id="pais-select" value={selectedPais} onChange={(e) => setSelectedPais(e.target.value)}>
                <option value="">Selecciona un país</option>
                {paises.length > 0 ? (
                  paises.map((pais) => (
                    <option key={pais.PK_Pais} value={pais.PK_Pais}>
                      {pais.nombre}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    {error || "Cargando..."}
                  </option> // Mensaje de carga o error
                )}
              </select>
              <img src={lupa} alt="Buscar" className="search-icon" style={{ cursor: "pointer" }} onClick={handleNavigateWithFilters} />
            </div>
          </div>
        </div>

        <div className="home-right">
          <img src={homeImage} alt="Mascotas Inicio" className="main-image" />
        </div>
      </div>

      <div className="search-component">
        <Search filters={{ limite: 8 }} />
      </div>
      <div className="btn-container">
        <Link to="/mascotas">
          <button className="btn">Ver más</button>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
