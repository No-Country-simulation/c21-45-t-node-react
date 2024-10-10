import React from 'react';
import Footer from './footer/footer'; // Asegúrate de que la ruta sea correcta
import HomePage from '../Components/pages/home/HomePage'; // Descomenta e importa correctamente

function Links() {
  const footerLinks = [
    { href: '/mascotas', text: 'Mascotas' },
    { href: '/proceso-adopcion', text: 'Proceso de adopción' },
    { href: '/preguntas-frecuentes', text: 'Preguntas frecuentes' },
    { href: '/requisitos-adoptar', text: 'Requisitos para adoptar' },
    { href: '/publicar-mascota', text: 'Publicar mascota' }
  ];

  return (
    <>
      <HomePage /> 
      <Footer logoText="AdoptMe" links={footerLinks} />
    </>
  );
}

export default Links;
