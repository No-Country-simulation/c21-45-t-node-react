import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import HomePage from "./pages/home/HomePage";
import Navbar from "./Components/navbar/Navbar";
import Links from "./Components/Links";
import Requisitos from "./pages/requisitos/requisitos";
import Login from "./pages/login/Login";
import FormularioRegistro from "./pages/formularioRegistro/FormularioRegistro";
import FormularioAdopcion from "./pages/formularioAdopcion/FormularioAdopcion";
import Proceso from "./pages/Proceso_adopcion/ProcesoAdopcion";
import Search from "./pages/search/search";
import Mascotas from "./pages/search/mascotas/mascotas";
import Preguntas from "./pages/preguntas/preguntas";
import Filtro_mascota from "./Components/filtro_mascota/filtro_mascota";
import Admin from "./pages/admin/admin";
import AgregarMascota from "./pages/agregar_mascota/AgregarMascota";
import RequireAdmin from "./RequireAdmin"; // Importa el componente de redirección
import Perfil from "./pages/perfil/perfil";
import ProcesoAdopcion from "./pages/Proceso_adopcion/ProcesoAdopcion";
import MisMascotas from "./pages/misMascotas/misMascotas";
import Solicitudes from "./pages/solicitudes/solicitudes";

function App() {
  return (
    <Router>
      <Navbar />

      <RequireAdmin>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mascotas" element={<Mascotas />} />
          <Route path="/preguntas-frecuentes" element={<Preguntas />} />
          <Route path="/requisitos-adoptar" element={<Requisitos />} />
          <Route path="/proceso-adopcion" element={<Proceso />} />
          <Route path="/login" element={<Login />} />
          <Route path="/formulario-registro" element={<FormularioRegistro />} />
          <Route
            path="/formulario-adopcion"
            element={
              <ProtectedRoute requiredMessage="Para solicitar una adopción debe estar logueado.">
                <FormularioAdopcion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agregar-mascota"
            element={
              <ProtectedRoute requiredMessage="Para agregar una mascota debe estar logueado.">
                <AgregarMascota />
              </ProtectedRoute>
            }
          />
          <Route path="/search" element={<Search />} />
          <Route path="/detalle-mascota" element={<Filtro_mascota />} />
          <Route path="/perfil" element={< Perfil/>} />
          <Route path="/mis-mascotas" element={<MisMascotas/>}/>
          <Route path="/admin" element={<Admin />} />
          <Route path="/solicitudes" element={<Solicitudes/>}/>
        </Routes>
      </RequireAdmin>

      <Links />
    </Router>
  );
}

export default App;
