import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './footer/footer';
import Lema from './lema/lema';

function Links() {
  const footerLinks = [
    { href: '/mascotas', text: 'Mascotas' },
    { href: '/proceso-adopcion', text: 'Proceso de adopción' },
    { href: '/preguntas-frecuentes', text: 'Preguntas frecuentes' },
    { href: '/requisitos-adoptar', text: 'Requisitos para adoptar' },
    { href: '/agregar-mascota', text: 'Publicar mascota' }
  ];

  return (
    <>

      <Lema />
      <Footer
        logoText="AdoptMe"
        links={footerLinks.map((link, index) => (
          <Link key={index} to={link.href}>
            {link.text}
          </Link>
        ))}
      />
    </>
  );
}

export default Links;
