import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/pages/home/HomePage';
import Links from './Components/Links'; 
import Requisitos from './Components/pages/requisitos/requisitos';
import Login from './Components/pages/login/Login';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        
        <Route path="/mascotas" element={<div>Pagina de mascotas</div>} />
        <Route path="/proceso-adopcion" element={<div>Proceso de Adopción Page</div>} />
        <Route path="/preguntas-frecuentes" element={<div>Preguntas Frecuentes Page</div>} />
        <Route path="/requisitos-adoptar" element={<Requisitos />} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/publicar-mascota" element={<div>Publicar Mascota Page</div>} />
      </Routes>
      <Links />
    </Router>
  );
}

export default App;
