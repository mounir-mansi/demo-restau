import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./Galerie.css";

const PHOTOS = [
  { src: "/gallery/photo1.jpg", alt: "Plat signature du chef" },
  { src: "/gallery/photo2.jpg", alt: "Intérieur du restaurant" },
  { src: "/gallery/photo3.jpg", alt: "Burger maison" },
  { src: "/gallery/photo4.jpg", alt: "Dessert du jour" },
  { src: "/gallery/photo5.jpg", alt: "Terrasse ensoleillée" },
  { src: "/gallery/photo6.jpg", alt: "Préparation en cuisine" },
];

const EVENEMENTS = [
  { date: "Tous les vendredis", titre: "Soirée jazz", desc: "Concert live dès 20h — entrée libre" },
  { date: "Samedi 12 avril", titre: "Brunch dominical", desc: "Formule brunch 12h–15h sur réservation" },
  { date: "Mercredi 23 avril", titre: "Soirée tapas", desc: "Menu tapas et vins du monde — 18h–23h" },
];

export default function Galerie() {
  return (
    <div className="page-galerie">
      <Navbar />

      {/* GALERIE */}
      <section className="galerie-section">
        <div className="galerie-header">
          <p className="section-label">Notre univers</p>
          <h1>Galerie</h1>
        </div>

        <div className="galerie-grid">
          {PHOTOS.map((photo, i) => (
            <div key={i} className={`galerie-item${i === 0 ? " large" : ""}`}>
              <img src={photo.src} alt={photo.alt} />
              <div className="galerie-overlay">
                <i className="fas fa-expand" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ÉVÉNEMENTS */}
      <section className="evenements-section">
        <div className="evenements-overlay" />
        <div className="evenements-contenu">
          <p className="section-label-light">Agenda</p>
          <h2>Événements &amp; soirées</h2>
          <ul className="evenements-liste">
            {EVENEMENTS.map((ev, i) => (
              <li key={i} className="evenement-item">
                <i className="fas fa-calendar-alt" />
                <div>
                  <span className="ev-date">{ev.date}</span>
                  <strong>{ev.titre}</strong>
                  <p>{ev.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}
