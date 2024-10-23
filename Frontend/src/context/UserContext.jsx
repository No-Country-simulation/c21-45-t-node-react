import React, { createContext, useState, useEffect, useContext } from 'react';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);    
    const [isLoggedIn, setIsloggenIn]= useState(false)
  
    // Manejo de inicio de sesión
    const handleLogin = (loggedInUser) => {
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      
  };

    // Cargar usuario desde localStorage 
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            // Verifica que no se esté repitiendo la asignación de `user` para evitar el bucle
            if (!user || user.id !== parsedUser.id) {
                setUser(parsedUser);
                setIsloggenIn(true);
             
            }
        }
    }, [user]);  

    // Manejo de cierre de sesión
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');      
    };

    return (
        <UserContext.Provider value={{ user,  handleLogin, handleLogout,isLoggedIn, setIsloggenIn}}>
            {children}
        </UserContext.Provider>
    );
};
