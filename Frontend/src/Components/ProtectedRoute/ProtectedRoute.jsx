import React, { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { UserContext } from '../../context/UserContext';

const ProtectedRoute = ({ children, requiredMessage }) => {
  const { isLoggedIn, isLoading } = useContext(UserContext);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      Swal.fire({
        title: 'Acceso restringido',
        text: requiredMessage,
        icon: 'warning',
        confirmButtonText: 'Ir a Login',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login'; // Redirige solo cuando confirmen
        }
      });
    }
  }, [isLoading, isLoggedIn, requiredMessage]);

  if (isLoading) {
    return <div>Loading...</div>; // Mensaje de carga mientras verifica
  }

  return isLoggedIn ? children : null;
};

export default ProtectedRoute;