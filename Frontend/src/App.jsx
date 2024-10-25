import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Navbar from "./Components/navbar/Navbar";
import Links from "./Components/Links";
import Requisitos from "./pages/requisitos/requisitos";
import Login from "./pages/login/Login";
import FormularioRegistro from "./pages/formularioRegistro/FormularioRegistro";
import FormularioAdopcion from "./pages/formularioAdopcion/FormularioAdopcion";
import Search from "./pages/search/search";
import Mascotas from "./pages/search/mascotas/mascotas";
import Preguntas from "./pages/preguntas/preguntas";
import Filtro_mascota from "./Components/filtro_mascota/filtro_mascota";

import AgregarMascota from "./pages/agregar_mascota/AgregarMascota";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/mascotas" element={<Mascotas />} />
        <Route path="/preguntas-frecuentes" element={<Preguntas />} />
        <Route path="/requisitos-adoptar" element={<Requisitos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/publicar-mascota" element={<div>Publicar Mascota Page</div>} />
        <Route path="/formulario-registro" element={<FormularioRegistro />} />
        <Route path="/formulario-adopcion" element={<FormularioAdopcion />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detalle-mascota" element={<Filtro_mascota />} />
        <Route path="/agregar-mascota" element={< AgregarMascota/>} />
      </Routes>
      <Links />
    </Router>
  );
}

export default App;
