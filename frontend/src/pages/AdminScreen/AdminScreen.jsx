import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../utils/useConnecte.jsx";
import "./AdminScreen.css";

const API = import.meta.env.VITE_API_URL;

export default function AdminScreen() {
  const { connecte, logout } = useAuth();
  const navigate = useNavigate();
  const [onglet, setOnglet] = useState("messages");
  const [messages, setMessages] = useState([]);
  const [gallery, setGallery] = useState({ main: null, photos: [] });
  const [sections, setSections] = useState({});

  useEffect(() => {
    if (!connecte) navigate("/connexion");
  }, [connecte]);

  useEffect(() => {
    if (!connecte) return;
    if (onglet === "messages") chargerMessages();
    if (onglet === "galerie") chargerGalerie();
    if (onglet === "sections") chargerSections();
  }, [onglet, connecte]);

  async function chargerMessages() {
    const res = await fetch(`${API}/admin/messages`, { credentials: "include" });
    if (res.ok) setMessages(await res.json());
  }

  async function chargerGalerie() {
    const res = await fetch(`${API}/api/gallery`);
    if (res.ok) setGallery(await res.json());
  }

  async function chargerSections() {
    const res = await fetch(`${API}/api/sections`);
    if (res.ok) setSections(await res.json());
  }

  async function marquerLu(id) {
    await fetch(`${API}/admin/messages/${id}/read`, { method: "PATCH", credentials: "include" });
    setMessages((m) => m.map((msg) => msg.id === id ? { ...msg, read: true } : msg));
  }

  async function supprimerMessage(id) {
    if (!confirm("Supprimer ce message ?")) return;
    await fetch(`${API}/admin/messages/${id}`, { method: "DELETE", credentials: "include" });
    setMessages((m) => m.filter((msg) => msg.id !== id));
  }

  async function uploadPhoto(e, endpoint) {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    await fetch(`${API}${endpoint}`, { method: "POST", credentials: "include", body: fd });
    chargerGalerie();
  }

  async function uploadSection(e, slot) {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    await fetch(`${API}/admin/sections/${slot}`, { method: "POST", credentials: "include", body: fd });
    chargerSections();
  }

  async function supprimerPhoto(key) {
    if (!confirm("Supprimer cette photo ?")) return;
    await fetch(`${API}/admin/gallery`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
    chargerGalerie();
  }

  const nonLus = messages.filter((m) => !m.read).length;

  if (!connecte) return null;

  return (
    <div className="admin-page">
      {/* HEADER */}
      <header className="admin-header">
        <span className="admin-logo">La Belle Assiette — Admin</span>
        <div className="admin-header-actions">
          <Link to="/" className="admin-voir-site">Voir le site</Link>
          <button className="admin-logout" onClick={logout}>Déconnexion</button>
        </div>
      </header>

      {/* ONGLETS */}
      <nav className="admin-onglets">
        <button
          className={onglet === "messages" ? "actif" : ""}
          onClick={() => setOnglet("messages")}
        >
          Messages {nonLus > 0 && <span className="badge">{nonLus}</span>}
        </button>
        <button
          className={onglet === "galerie" ? "actif" : ""}
          onClick={() => setOnglet("galerie")}
        >
          Galerie
        </button>
        <button
          className={onglet === "sections" ? "actif" : ""}
          onClick={() => setOnglet("sections")}
        >
          Photos sections
        </button>
      </nav>

      <main className="admin-contenu">
        {/* MESSAGES */}
        {onglet === "messages" && (
          <div className="admin-messages">
            {messages.length === 0 && <p className="admin-vide">Aucun message.</p>}
            {messages.map((msg) => (
              <div key={msg.id} className={`admin-msg-card${!msg.read ? " non-lu" : ""}`}>
                <div className="admin-msg-header">
                  <div>
                    {!msg.read && <span className="msg-point" />}
                    <strong>{msg.name}</strong>
                    <span className="msg-email">{msg.email}</span>
                  </div>
                  <span className="msg-date">{new Date(msg.createdAt).toLocaleDateString("fr-FR")}</span>
                </div>
                <div className="admin-msg-corps">
                  <p>{msg.message}</p>
                </div>
                <div className="admin-msg-actions">
                  {!msg.read && (
                    <button className="btn-lu" onClick={() => marquerLu(msg.id)}>
                      Marquer lu
                    </button>
                  )}
                  <button className="btn-suppr" onClick={() => supprimerMessage(msg.id)}>
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GALERIE */}
        {onglet === "galerie" && (
          <div className="admin-galerie">
            <div className="admin-galerie-top">
              <div className="admin-galerie-main">
                {gallery.main ? (
                  <>
                    <img src={gallery.main.src} alt="Photo principale" />
                    <span className="galerie-label">Photo principale</span>
                    <div className="galerie-btns">
                      <label className="btn-galerie-icone" title="Changer">
                        <i className="fas fa-pencil-alt" />
                        <input type="file" accept="image/*" onChange={(e) => uploadPhoto(e, "/admin/gallery/main")} hidden />
                      </label>
                      <button className="btn-galerie-icone suppr" onClick={() => supprimerPhoto(gallery.main.key)} title="Supprimer">
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </>
                ) : (
                  <label className="galerie-placeholder">
                    <i className="fas fa-plus" />
                    <span>Ajouter photo principale</span>
                    <input type="file" accept="image/*" onChange={(e) => uploadPhoto(e, "/admin/gallery/main")} hidden />
                  </label>
                )}
              </div>
              <label className="admin-galerie-add">
                <i className="fas fa-plus" />
                <span>Ajouter une photo</span>
                <input type="file" accept="image/*" onChange={(e) => uploadPhoto(e, "/admin/gallery/upload")} hidden />
              </label>
            </div>

            <div className="admin-galerie-grid">
              {gallery.photos.map((photo) => (
                <div key={photo.key} className="admin-galerie-item">
                  <img src={photo.src} alt="Photo galerie" />
                  <div className="galerie-btns">
                    <label className="btn-galerie-icone" title="Changer">
                      <i className="fas fa-pencil-alt" />
                      <input type="file" accept="image/*" onChange={(e) => uploadPhoto(e, "/admin/gallery/upload")} hidden />
                    </label>
                    <button className="btn-galerie-icone suppr" onClick={() => supprimerPhoto(photo.key)} title="Supprimer">
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTIONS */}
        {onglet === "sections" && (
          <div className="admin-sections">
            {[
              { slot: "hero", label: "Hero (Accueil)" },
              { slot: "chi-siamo", label: "À propos" },
              { slot: "concert", label: "Événements" },
            ].map(({ slot, label }) => (
              <div key={slot} className="admin-section-card">
                <span className="section-card-label">{label}</span>
                {sections[slot] ? (
                  <img src={sections[slot]} alt={label} />
                ) : (
                  <div className="section-card-vide">
                    <i className="fas fa-image" />
                  </div>
                )}
                <label className="btn-section">
                  <i className="fas fa-upload" />
                  {sections[slot] ? "Changer" : "Charger"}
                  <input type="file" accept="image/*" onChange={(e) => uploadSection(e, slot)} hidden />
                </label>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
