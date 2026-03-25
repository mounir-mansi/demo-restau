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
        setStatut({ ok: true, msg: "Message envoyé\u00a0! Nous vous répondrons sous 24h." });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatut({ ok: false, msg: data.error || "Une erreur est survenue." });
      }
    } catch {
      setStatut({ ok: false, msg: "Impossible d'envoyer le message. Réessayez." });
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <div className="page-contact">
      <Navbar />

      <main className="contact-main">
        <div className="contact-header">
          <p className="section-label">Nous trouver</p>
          <h1>Contact</h1>
        </div>

        <div className="contact-wrapper">
          {/* INFOS */}
          <div className="contact-info-block">
            <h2>Venez nous voir</h2>

            <div className="contact-info-liste">
              <div className="contact-info-item">
                <i className="fas fa-map-marker-alt" />
                <div>
                  <strong>Adresse</strong>
                  <span>12 rue des Saveurs<br />75001 Paris</span>
                </div>
              </div>
              <div className="contact-info-item">
                <i className="fas fa-clock" />
                <div>
                  <strong>Horaires</strong>
                  <span>Lun–Sam&nbsp;: 11h – 23h</span>
                  <span>Dimanche&nbsp;: 12h – 22h</span>
                </div>
              </div>
              <div className="contact-info-item">
                <i className="fas fa-phone" />
                <div>
                  <strong>Téléphone</strong>
                  <a href="tel:+33600000000">06 00 00 00 00</a>
                </div>
              </div>
              <div className="contact-info-item">
                <i className="fab fa-whatsapp" />
                <div>
                  <strong>WhatsApp</strong>
                  <a href="https://wa.me/33600000000">Écrire un message</a>
                </div>
              </div>
            </div>

            <div className="contact-map">
              <iframe
                title="Localisation"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9!2d2.3465!3d48.8604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzM3LjQiTiAywrAyMCc0Ny40IkU!5e0!3m2!1sfr!2sfr!4v1"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* FORMULAIRE */}
          <div className="contact-form-block">
            <h2>Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-groupe">
                <label htmlFor="name">Nom complet</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jean Dupont"
                  required
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
                />
              </div>
              <div className="form-groupe">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
                  required
                />
              </div>

              {statut && (
                <p className={`form-statut${statut.ok ? " ok" : " err"}`}>
                  {statut.msg}
                </p>
              )}

              <button type="submit" className="btn-submit" disabled={envoi}>
                {envoi ? "Envoi en cours…" : "Envoyer le message"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
