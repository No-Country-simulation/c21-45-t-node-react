import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/pages/home/HomePage";
import Links from "./Components/Links";
import Requisitos from "./Components/pages/requisitos/requisitos";
import Login from "./Components/pages/login/Login";
import FormularioRegistro from "./Components/formularioRegistro/FormularioRegistro";
import FormularioAdopcion from "./Components/formularioAdopcion/FormularioAdopcion";
import Search from "./pages/search/search";
import Mascotagato from "./pages/search/gatos/mascotagato";
import Mascotaperro from "./pages/search/perro/mascotaperro";
import Mascotas from "./pages/search/mascotas/mascotas";
import Preguntas from "./pages/preguntas/preguntas";
import Filtro_mascota from "./Components/filtro_mascota/filtro_mascota";
import Proceso from "./pages/Proceso_inscripcion/ProcesoInscripcion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/mascotas" element={<Mascotas />} />
        <Route path="/proceso-adopcion" element={<Proceso />} />
        <Route path="/preguntas-frecuentes" element={<Preguntas />} />
        <Route path="/requisitos-adoptar" element={<Requisitos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/publicar-mascota" element={<div>Publicar Mascota Page</div>} />
        <Route path="/formulario-registro" element={<FormularioRegistro />} />
        <Route path="/formulario-adopcion" element={<FormularioAdopcion />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mascotas-gato" element={<Mascotagato />} />
        <Route path="/mascotas-perro" element={<Mascotaperro />} />
        <Route path="/detalle-mascota" element={<Filtro_mascota />} />
      </Routes>
      <Links />
    </Router>
  );
}

export default App;
