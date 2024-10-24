import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Para manejar el estado de carga
  
    // Manejo de inicio de sesión
    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        setIsLoggedIn(true); 
    };

    // Cargar usuario desde localStorage 
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsLoggedIn(true);
        }
        setIsLoading(false); // Marcar como cargado
    }, []);

    // Manejo de cierre de sesión
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        setIsLoggedIn(false); 
    };

    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout, isLoggedIn, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};
