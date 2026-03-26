import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/useConnecte.jsx";
import Accueil from "./pages/Accueil/Accueil.jsx";
import Menu from "./pages/Menu/Menu.jsx";
import Galerie from "./pages/Galerie/Galerie.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import ConnexionScreen from "./pages/ConnexionScreen/ConnexionScreen.jsx";
import AdminScreen from "./pages/AdminScreen/AdminScreen.jsx";
import Events from "./pages/Events/Events.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <a href="#main-content" className="skip-link">Vai al contenuto principale</a>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connexion" element={<ConnexionScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
