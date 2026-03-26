import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./Accueil.css";

const API = import.meta.env.VITE_API_URL;

export default function Accueil() {
  const [sections, setSections] = useState({});

  useEffect(() => {
    fetch(`${API}/api/sections`)
      .then((r) => r.ok ? r.json() : {})
      .then(setSections)
      .catch(() => {});
  }, []);

  const heroStyle = sections["hero"]
    ? { backgroundImage: `url(${sections["hero"]})` }
    : {};

  return (
    <div className="page-accueil">
      <Navbar />

      {/* HERO */}
      <section className="hero" id="home" style={heroStyle}>
        <div className="hero-overlay" />
        <div className="hero-contenu">
          <p className="hero-tag">Ristorante &amp; Snack</p>
          <h1>Una cucina che ti assomiglia</h1>
          <p className="hero-desc">
            Sapori generosi, prodotti freschi, un&apos;atmosfera accogliente
            nel cuore della città.
          </p>
          <div className="hero-ctas">
            <Link to="/menu" className="btn-primary">Vedi il menu</Link>
            <Link to="/contact" className="btn-outline">Contattaci</Link>
          </div>
        </div>
      </section>

      {/* BANDE INFO */}
      <div className="bande-info" role="complementary" aria-label="Informazioni pratiche">
        <div className="bande-item">
          <i className="fas fa-map-marker-alt" aria-hidden="true" />
          <div>
            <strong>Indirizzo</strong>
            <span>12 rue des Saveurs, Parigi 1°</span>
          </div>
        </div>
        <div className="bande-item">
          <i className="fas fa-clock" aria-hidden="true" />
          <div>
            <strong>Orari</strong>
            <span>Lun–Sab&nbsp;: 11:00–23:00 &nbsp;|&nbsp; Dom&nbsp;: 12:00–22:00</span>
          </div>
        </div>
        <div className="bande-item">
          <i className="fas fa-phone" aria-hidden="true" />
          <div>
            <strong>Telefono</strong>
            <span><a href="tel:+33600000000">06 00 00 00 00</a></span>
          </div>
        </div>
        <div className="bande-item">
          <i className="fab fa-whatsapp" aria-hidden="true" />
          <div>
            <strong>WhatsApp</strong>
            <span><a href="https://wa.me/33600000000">Scrivi un messaggio</a></span>
          </div>
        </div>
      </div>

      <main id="main-content">
        {/* À PROPOS */}
        <section className="apropos" id="apropos">
          <div className="apropos-texte">
            <p className="section-label">La nostra storia</p>
            <h2>Passione, generosità&nbsp;&amp; autenticità</h2>
            <p>
              Il Bel Piatto è nato da una passione semplice&nbsp;: mangiare bene senza complicarsi la vita.
              Dal 2018, accogliamo famiglie, amici e curiosi in uno spazio conviviale
              dove ogni piatto è preparato con amore.
            </p>
            <p>
              La nostra cucina mescola influenze mediterranee e sapori del mondo, con prodotti
              locali selezionati ogni mattina. Pranzo veloce o pasto seduto — siete a casa vostra.
            </p>
            <Link to="/menu" className="btn-primary" style={{ marginTop: "1.5em", display: "inline-block" }}>
              Scopri il menu
            </Link>
          </div>
          <div className="apropos-photo">
            <img
              src={sections["chi-siamo"] || "/chi-siamo.jpg"}
              alt="Il nostro team in cucina"
              loading="lazy"
              width="600"
              height="450"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
