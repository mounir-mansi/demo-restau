import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/useConnecte.jsx";
import "./Navbar.css";

const LIENS = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "Galleria", to: "/galerie" },
  { label: "Eventi", to: "/events" },
  { label: "Contatto", to: "/contact" },
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
          <span className="navbar-nom">La Pergola</span>
          <span className="navbar-sous">Ristorante &amp; Snack</span>
        </Link>
      </div>

      <button
        className="navbar-burger"
        onClick={() => setOuvert((v) => !v)}
        aria-label="Apri menu"
        aria-expanded={ouvert}
      >
        <i className={ouvert ? "fas fa-times" : "fas fa-bars"} />
      </button>

      <ul className={`navbar-liens${ouvert ? " ouvert" : ""}`} aria-label="Navigazione principale">
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
                Disconnetti
              </button>
            </li>
          </>
        )}
        <li>
          <a href="tel:+390112345678" className="navbar-tel" onClick={fermer}>
            <i className="fas fa-phone" /> 011 23 45 678
          </a>
        </li>
      </ul>
    </nav>
  );
}
