import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UserProvider } from "./context/UserContext.jsx";
import { MascotasProvider } from './context/Mascotascontext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
<MascotasProvider>
    <UserProvider>
      <App /> {/* Solo renderiza App aquí */}
    </UserProvider>
    </MascotasProvider>
  </StrictMode>
);
