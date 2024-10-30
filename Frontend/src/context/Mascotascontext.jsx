import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const MascotasContext = createContext();

export const MascotasProvider = ({ children }) => {
    const [mascotas, setMascotas] = useState(null);
 
   // Función para obtener mascotas desde el backend
   const fetchMascotas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/mascota/");
   
      setMascotas(response.data); // Guardar las mascotas en el estado
    } catch (error) {
      console.error("Error al obtener las mascotas:", error);
    }
  };
  
  // Llamar a la función fetchMascotas cuando se monta el componente
  useEffect(() => {
    fetchMascotas();
   
  }, []);
   
    return (
        <MascotasContext.Provider value={{ mascotas }}>
            {children}
        </MascotasContext.Provider>
    );
};
