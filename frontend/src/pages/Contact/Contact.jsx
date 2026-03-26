import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./Contact.css";

const API = import.meta.env.VITE_API_URL;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [statut, setStatut] = useState(null);
  const [envoi, setEnvoi] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setEnvoi(true);
    setStatut(null);
    try {
      const res = await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatut({ ok: true, msg: "Messaggio inviato\u00a0! Ti risponderemo entro 24 ore." });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatut({ ok: false, msg: data.error || "Si è verificato un errore." });
      }
    } catch {
      setStatut({ ok: false, msg: "Impossibile inviare il messaggio. Riprova." });
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <div className="page-contact">
      <div className="contact-screen">
      <Navbar />

      <main className="contact-main">
        <div className="contact-header">
<h1>Contatto</h1>
        </div>

        <div className="contact-wrapper">
          {/* INFOS */}
          <div className="contact-info-block">
            <h2>Vieni a trovarci</h2>

            <div className="contact-info-liste">
              <div className="contact-info-item">
                <i className="fas fa-map-marker-alt" />
                <div>
                  <strong>Indirizzo</strong>
                  <span>Via Roma 14<br />10121 Torino</span>
                </div>
              </div>
              <div className="contact-info-item">
                <i className="fas fa-clock" />
                <div>
                  <strong>Orari</strong>
                  <span>Lun–Sab&nbsp;: 11:00 – 23:00</span>
                  <span>Domenica&nbsp;: 12:00 – 22:00</span>
                </div>
              </div>
              <div className="contact-info-item">
                <i className="fas fa-phone" />
                <div>
                  <strong>Telefono</strong>
                  <a href="tel:+390112345678">011 23 45 678</a>
                </div>
              </div>
              <div className="contact-info-item">
                <i className="fab fa-whatsapp" />
                <div>
                  <strong>WhatsApp</strong>
                  <a href="https://wa.me/390112345678">Scrivi un messaggio</a>
                </div>
              </div>
            </div>

            {/* Conteneur aspect-ratio pour éviter CLS (CWV) */}
            <div className="contact-map">
              <div className="contact-map-ratio">
                <iframe
                  title="Posizione del ristorante"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9!2d2.3465!3d48.8604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzM3LjQiTiAywrAyMCc0Ny40IkU!5e0!3m2!1sfr!2sfr!4v1"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Mappa Google Maps — 12 rue des Saveurs, Parigi"
                />
              </div>
            </div>
          </div>

          {/* FORMULAIRE */}
          <div className="contact-form-block">
            <h2>Inviaci un messaggio</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-groupe">
                <label htmlFor="name">Nome completo</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Mario Rossi"
                  required
                  aria-required="true"
                />
              </div>
              <div className="form-groupe">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jean@email.com"
                  required
                  aria-required="true"
                />
              </div>
              <div className="form-groupe">
                <label htmlFor="message">Messaggio</label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Il tuo messaggio..."
                  required
                  aria-required="true"
                />
              </div>

              <p
                role="alert"
                aria-live="polite"
                className={`form-statut${statut ? (statut.ok ? " ok" : " err") : " vide"}`}
              >
                {statut ? statut.msg : ""}
              </p>

              <button type="submit" className="btn-submit" disabled={envoi}>
                {envoi ? "Invio in corso…" : "Invia il messaggio"}
              </button>
            </form>
          </div>
        </div>
      </main>
      </div>

      <Footer />
    </div>
  );
}
