import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./Accueil.css";

export default function Accueil() {
  return (
    <div className="page-accueil">
      <Navbar />

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-overlay" />
        <div className="hero-contenu">
          <p className="hero-tag">Restaurant &amp; Snack</p>
          <h1>Une cuisine qui vous ressemble</h1>
          <p className="hero-desc">
            Des saveurs généreuses, des produits frais, une ambiance chaleureuse
            au cœur de la ville.
          </p>
          <div className="hero-ctas">
            <Link to="/menu" className="btn-primary">Voir notre menu</Link>
            <Link to="/contact" className="btn-outline">Nous contacter</Link>
          </div>
        </div>
      </section>

      {/* BANDE INFO */}
      <div className="bande-info">
        <div className="bande-item">
          <i className="fas fa-map-marker-alt" />
          <div>
            <strong>Adresse</strong>
            <span>12 rue des Saveurs, Paris 1er</span>
          </div>
        </div>
        <div className="bande-item">
          <i className="fas fa-clock" />
          <div>
            <strong>Horaires</strong>
            <span>Lun–Sam&nbsp;: 11h–23h &nbsp;|&nbsp; Dim&nbsp;: 12h–22h</span>
          </div>
        </div>
        <div className="bande-item">
          <i className="fas fa-phone" />
          <div>
            <strong>Téléphone</strong>
            <span><a href="tel:+33600000000">06 00 00 00 00</a></span>
          </div>
        </div>
        <div className="bande-item">
          <i className="fab fa-whatsapp" />
          <div>
            <strong>WhatsApp</strong>
            <span><a href="https://wa.me/33600000000">Écrire un message</a></span>
          </div>
        </div>
      </div>

      {/* À PROPOS */}
      <section className="apropos" id="apropos">
        <div className="apropos-texte">
          <p className="section-label">Notre histoire</p>
          <h2>Passion, générosité&nbsp;&amp; authenticité</h2>
          <p>
            La Belle Assiette est née d'une passion simple&nbsp;: bien manger sans se prendre la tête.
            Depuis 2018, nous accueillons les familles, les amis et les curieux dans un espace
            convivial où chaque plat est préparé avec amour.
          </p>
          <p>
            Notre cuisine mêle influences méditerranéennes et saveurs du monde, avec des produits
            locaux sélectionnés chaque matin. Restauration rapide ou repas assis — vous êtes chez vous.
          </p>
          <Link to="/menu" className="btn-primary" style={{ marginTop: "1.5em", display: "inline-block" }}>
            Découvrir le menu
          </Link>
        </div>
        <div className="apropos-photo">
          <img src="/chi-siamo.jpg" alt="Notre équipe en cuisine" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
