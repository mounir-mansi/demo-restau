import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import "./Galerie.css";

const API = import.meta.env.VITE_API_URL;

// Fallback statique (public/gallery/) si aucune photo en base
const PHOTOS_FALLBACK = [
  { src: "/main.png", alt: "Interno del ristorante La Pergola" },
  { src: "/Gemini_Generated_Image_n9xgecn9xgecn9xg.png", alt: "Piatto signature dello chef" },
  { src: "/Gemini_Generated_Image_vcdfusvcdfusvcdf.png", alt: "Antipasto della casa" },
  { src: "/Gemini_Generated_Image_wqqby4wqqby4wqqb.png", alt: "Dolce del giorno" },
  { src: "/Gemini_Generated_Image_xwymhaxwymhaxwym.png", alt: "Preparazione in cucina" },
];

export default function Galerie() {
  const [photos, setPhotos] = useState(PHOTOS_FALLBACK);

  useEffect(() => {
    fetch(`${API}/api/gallery`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data) {
          const toutes = [
            ...(data.main ? [{ src: data.main.src, alt: "Foto principale" }] : []),
            ...(data.photos || []).map((p) => ({ src: p.src, alt: "Foto galleria" })),
          ];
          if (toutes.length > 0) setPhotos(toutes);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="page-galerie">
      <Navbar />

      <main id="main-content">
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
                  loading={i === 0 ? "eager" : "lazy"}
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
      </main>
    </div>
  );
}
