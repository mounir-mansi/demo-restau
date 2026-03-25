import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useConnecte.jsx";
import "./ConnexionScreen.css";

export default function ConnexionScreen() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [afficher, setAfficher] = useState(false);
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);
  const { login: doLogin } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErreur("");
    setChargement(true);
    try {
      await doLogin(login, password);
      navigate("/admin");
    } catch (err) {
      setErreur(err.message);
    } finally {
      setChargement(false);
    }
  }

  return (
    <div className="connexion-page">
      <div className="connexion-box">
        <div className="connexion-logo">
          <span className="cx-nom">La Belle Assiette</span>
          <span className="cx-sous">Espace administration</span>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="cx-groupe">
            <label htmlFor="login">Identifiant</label>
            <input
              id="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="admin"
              required
            />
          </div>
          <div className="cx-groupe">
            <label htmlFor="password">Mot de passe</label>
            <div className="cx-password">
              <input
                id="password"
                type={afficher ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="cx-eye"
                onClick={() => setAfficher((v) => !v)}
                aria-label={afficher ? "Masquer" : "Afficher"}
              >
                <i className={afficher ? "fas fa-eye-slash" : "fas fa-eye"} />
              </button>
            </div>
          </div>

          {erreur && <p className="cx-erreur">{erreur}</p>}

          <button type="submit" className="cx-btn" disabled={chargement}>
            {chargement ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
