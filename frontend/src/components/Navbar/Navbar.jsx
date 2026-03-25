import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/useConnecte.jsx";
import "./Navbar.css";

const LIENS = [
  { label: "Accueil", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "Galerie", to: "/galerie" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [ouvert, setOuvert] = useState(false);
  const { connecte, logout } = useAuth();
  const location = useLocation();

  function fermer() {
    setOuvert(false);
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={fermer}>
          <span className="navbar-nom">La Belle Assiette</span>
          <span className="navbar-sous">Restaurant &amp; Snack</span>
        </Link>
      </div>

      <button
        className="navbar-burger"
        onClick={() => setOuvert((v) => !v)}
        aria-label="Menu"
        aria-expanded={ouvert}
      >
        <i className={ouvert ? "fas fa-times" : "fas fa-bars"} />
      </button>

      <ul className={`navbar-liens${ouvert ? " ouvert" : ""}`} aria-label="Navigation principale">
        {LIENS.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className={location.pathname === l.to ? "actif" : ""}
              onClick={fermer}
            >
              {l.label}
            </Link>
          </li>
        ))}
        {connecte && (
          <>
            <li>
              <Link to="/admin" onClick={fermer}>
                Admin
              </Link>
            </li>
            <li>
              <button className="navbar-logout" onClick={() => { logout(); fermer(); }}>
                Déconnexion
              </button>
            </li>
          </>
        )}
        <li>
          <a href="tel:+33600000000" className="navbar-tel" onClick={fermer}>
            <i className="fas fa-phone" /> 06 00 00 00 00
          </a>
        </li>
      </ul>
    </nav>
  );
}
