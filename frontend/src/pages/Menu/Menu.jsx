import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./Menu.css";

const MENU = [
  {
    categorie: "Antipasti",
    icone: "fas fa-leaf",
    items: [
      { nom: "Insalata fresca", desc: "Rucola, pomodorini, parmigiano, vinaigrette miele e senape", prix: "7,50€", featured: false },
      { nom: "Bruschetta della casa", desc: "Pane abbrustolito, pomodori a cubetti, basilico fresco, olio d'oliva", prix: "6,00€", featured: false },
      { nom: "Zuppa del giorno", desc: "Ricetta dello chef, servita con pane artigianale", prix: "5,50€", featured: false },
      { nom: "Tagliere misto", desc: "Salumi selezionati, cetriolini, pane abbrustolito", prix: "9,00€", featured: true },
    ],
  },
  {
    categorie: "Piatti principali",
    icone: "fas fa-utensils",
    items: [
      { nom: "Burger della casa", desc: "Hamburger 180g, cheddar, cipolle caramellate, salsa della casa, patatine", prix: "14,50€", featured: true },
      { nom: "Pollo arrosto & verdure", desc: "Mezzo pollo ruspante, verdure di stagione, fondo di cottura", prix: "13,00€", featured: false },
      { nom: "Pasta alla carbonara", desc: "Pasta fresca, guanciale affumicato, pecorino, uovo, pepe nero", prix: "11,50€", featured: false },
      { nom: "Tajine di agnello", desc: "Cottura lenta, prugne secche, mandorle, couscous al burro", prix: "15,00€", featured: false },
      { nom: "Wrap vegetariano", desc: "Hummus, falafel, verdure grigliate, salsa yogurt e limone", prix: "10,00€", featured: false },
      { nom: "Piatto snack", desc: "Hot-dog artigianale, patatine, insalata, salsa a scelta", prix: "9,50€", featured: false },
    ],
  },
  {
    categorie: "Dolci",
    icone: "fas fa-ice-cream",
    items: [
      { nom: "Tortino al cioccolato", desc: "Cuore fondente, gelato alla vaniglia, caramello al burro salato", prix: "6,50€", featured: true },
      { nom: "Torta del giorno", desc: "Secondo disponibilità, chiedi al cameriere", prix: "5,00€", featured: false },
      { nom: "Tiramisù della casa", desc: "Ricetta tradizionale, mascarpone, caffè, savoiardi", prix: "6,00€", featured: false },
      { nom: "Coppa gelato", desc: "3 palline a scelta, panna montata, coulis di frutti rossi", prix: "5,50€", featured: false },
    ],
  },
  {
    categorie: "Bevande",
    icone: "fas fa-glass-water",
    items: [
      { nom: "Succo di frutta fresco", desc: "Arancia, mela, mango o mix del momento", prix: "4,00€", featured: false },
      { nom: "Bibite & Acqua", desc: "Coca, Fanta, Sprite, San Pellegrino, Evian", prix: "2,50€", featured: false },
      { nom: "Caffè & Tè", desc: "Espresso, cappuccino, tè alla menta, tisane", prix: "2,00€", featured: false },
      { nom: "Smoothie della casa", desc: "Frutta frullata del giorno, senza zuccheri aggiunti", prix: "5,50€", featured: true },
    ],
  },
];

export default function Menu() {
  return (
    <div className="page-menu">
      <Navbar />

      <main className="menu-main">
        <div className="menu-header">
          <p className="section-label">La nostra carta</p>
          <h1>Il Menu</h1>
          <p className="menu-sous">Fatto in casa, prodotti freschi selezionati ogni mattina</p>
        </div>

        {MENU.map((cat) => (
          <section key={cat.categorie} className="menu-categorie">
            <div className="menu-cat-titre">
              <i className={cat.icone} />
              <h2>{cat.categorie}</h2>
            </div>
            <div className="menu-grid">
              {cat.items.map((item) => (
                <div key={item.nom} className={`menu-card${item.featured ? " featured" : ""}`}>
                  {item.featured && <span className="menu-badge">Il preferito</span>}
                  <div className="menu-card-corps">
                    <h3>{item.nom}</h3>
                    <p>{item.desc}</p>
                  </div>
                  <span className="menu-prix">{item.prix}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
