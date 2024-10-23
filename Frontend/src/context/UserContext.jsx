// UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado inicial

  const login = (userData) => {
    setUser(userData); // Guarda los datos del usuario en el contexto
  };

  const logout = () => {
    setUser(null); // Limpia el estado al cerrar sesión
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};