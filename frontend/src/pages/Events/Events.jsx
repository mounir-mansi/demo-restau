import Navbar from "../../components/Navbar/Navbar.jsx";
import "./Events.css";

const EVENTI = [
  {
    date: "Ogni venerdì",
    titre: "Serata jazz",
    desc: "Concerto live dalle 20:00 — ingresso libero",
    icone: "fas fa-music",
  },
  {
    date: "Sabato 12 aprile",
    titre: "Brunch domenicale",
    desc: "Formula brunch 12:00–15:00 su prenotazione",
    icone: "fas fa-coffee",
  },
  {
    date: "Mercoledì 23 aprile",
    titre: "Serata tapas",
    desc: "Menu tapas e vini del mondo — 18:00–23:00",
    icone: "fas fa-wine-glass-alt",
  },
];

export default function Events() {
  return (
    <div className="page-eventi">
      <Navbar />

      <main className="eventi-main" id="main-content">
        <div className="eventi-overlay" aria-hidden="true" />

        <div className="eventi-contenu">
          <p className="eventi-label">Agenda</p>
          <h1>Eventi &amp; serate</h1>
          <p className="eventi-sous">
            Musica, sapori e convivialità — ogni settimana qualcosa di speciale
          </p>

          <div className="eventi-grid">
            {EVENTI.map((ev, i) => (
              <div key={i} className="evento-card">
                <div className="evento-icona">
                  <i className={ev.icone} aria-hidden="true" />
                </div>
                <span className="ev-date">{ev.date}</span>
                <h2>{ev.titre}</h2>
                <p>{ev.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
