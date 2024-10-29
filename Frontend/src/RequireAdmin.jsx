import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./context/UserContext";

function RequireAdmin({ children }) {
  const { user } = useContext(UserContext);
  const location = useLocation();

  // Si el usuario es administrador y no está en la página de administración, redirige a /admin
  if (user?.payload?.FK_Rol === 1 && location.pathname !== "/admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default RequireAdmin;
