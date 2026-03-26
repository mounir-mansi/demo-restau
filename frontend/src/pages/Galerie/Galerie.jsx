import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./Galerie.css";

const API = import.meta.env.VITE_API_URL;

// Fallback statique (public/gallery/) si aucune photo en base
const PHOTOS_FALLBACK = [
  { src: "/gallery/photo1.jpg", alt: "Piatto signature dello chef" },
  { src: "/gallery/photo2.jpg", alt: "Interno del ristorante" },
  { src: "/gallery/photo3.jpg", alt: "Burger della casa" },
  { src: "/gallery/photo4.jpg", alt: "Dolce del giorno" },
  { src: "/gallery/photo5.jpg", alt: "Terrazza soleggiata" },
  { src: "/gallery/photo6.jpg", alt: "Preparazione in cucina" },
];

const EVENEMENTS = [
  { date: "Ogni venerdì", titre: "Serata jazz", desc: "Concerto live dalle 20:00 — ingresso libero" },
  { date: "Sabato 12 aprile", titre: "Brunch domenicale", desc: "Formula brunch 12:00–15:00 su prenotazione" },
  { date: "Mercoledì 23 aprile", titre: "Serata tapas", desc: "Menu tapas e vini del mondo — 18:00–23:00" },
];

export default function Galerie() {
  const [photos, setPhotos] = useState(PHOTOS_FALLBACK);
  const [concertBg, setConcertBg] = useState(null);

  useEffect(() => {
    // Charger photos galerie depuis R2
    fetch(`${API}/api/gallery`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data) {
          const toutes = [
            ...(data.main ? [{ src: data.main.src, alt: "Photo principale" }] : []),
            ...(data.photos || []).map((p) => ({ src: p.src, alt: "Photo galerie" })),
          ];
          if (toutes.length > 0) setPhotos(toutes);
        }
      })
      .catch(() => {});

    // Charger photo de fond Événements
    fetch(`${API}/api/sections`)
      .then((r) => r.ok ? r.json() : {})
      .then((s) => { if (s["concert"]) setConcertBg(s["concert"]); })
      .catch(() => {});
  }, []);

  const evenementsStyle = concertBg
    ? { backgroundImage: `url(${concertBg})` }
    : {};

  return (
    <div className="page-galerie">
      <Navbar />

      <main id="main-content">
        {/* GALERIE */}
        <section className="galerie-section" aria-label="Galleria foto">
          <div className="galerie-header">
            <p className="section-label">Il nostro mondo</p>
            <h1>Galleria</h1>
          </div>

          <div className="galerie-grid">
            {photos.map((photo, i) => (
              <div key={i} className={`galerie-item${i === 0 ? " large" : ""}`}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  width="600"
                  height="400"
                />
                <div className="galerie-overlay" aria-hidden="true">
                  <i className="fas fa-expand" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ÉVÉNEMENTS */}
        <section className="evenements-section" style={evenementsStyle} aria-label="Eventi e serate">
          <div className="evenements-overlay" aria-hidden="true" />
          <div className="evenements-contenu">
            <p className="section-label-light">Agenda</p>
            <h2>Eventi &amp; serate</h2>
            <ul className="evenements-liste">
              {EVENEMENTS.map((ev, i) => (
                <li key={i} className="evenement-item">
                  <i className="fas fa-calendar-alt" aria-hidden="true" />
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
      </main>

      <Footer />
    </div>
  );
}
