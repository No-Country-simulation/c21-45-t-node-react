import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/pages/home/HomePage';
import Links from './Components/Links'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        
        <Route path="/mascotas" element={<div>Pagina de mascotas</div>} />
        <Route path="/proceso-adopcion" element={<div>Proceso de Adopción Page</div>} />
        <Route path="/preguntas-frecuentes" element={<div>Preguntas Frecuentes Page</div>} />
        <Route path="/requisitos-adoptar" element={<div>Requisitos para Adoptar Page</div>} />
        <Route path="/publicar-mascota" element={<div>Publicar Mascota Page</div>} />
      </Routes>
      <Links />
    </Router>
  );
}

export default App;
