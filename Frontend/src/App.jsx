import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/pages/home/HomePage';
import Links from './Components/Links'; 
import Requisitos from './Components/pages/requisitos/requisitos';
import Login from './Components/pages/login/Login';
import FormularioRegistro from './Components/formularioRegistro/FormularioRegistro';
import FormularioAdopcion from './Components/formularioAdopcion/FormularioAdopcion';
import Search from './pages/search/search';
import RegistroRefugio from './Components/RegistroRefugio/RegistroRefugio';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        
        <Route path="/mascotas" element={<Search />} />
        <Route path="/proceso-adopcion" element={<div>Proceso de Adopción Page</div>} />
        <Route path="/preguntas-frecuentes" element={<div>Preguntas Frecuentes Page</div>} />
        <Route path="/requisitos-adoptar" element={<Requisitos />} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/publicar-mascota" element={<div>Publicar Mascota Page</div>} />
        <Route path="/formulario-registro" element={<FormularioRegistro/>} />
        <Route path="/formulario-adopcion" element={<FormularioAdopcion/>} />
        <Route path='/registro-refugio' element={<RegistroRefugio/>} />
        <Route path='/search' element= {<Search />} />

      </Routes>
      <Links />
    </Router>
  );
}

export default App;
