import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./Menu.css";

const MENU = [
  {
    categorie: "Entrées",
    icone: "fas fa-leaf",
    items: [
      { nom: "Salade fraîcheur", desc: "Roquette, tomates cerises, parmesan, vinaigrette miel-moutarde", prix: "7,50€", featured: false },
      { nom: "Bruschetta maison", desc: "Pain grillé, tomates concassées, basilic frais, huile d'olive", prix: "6,00€", featured: false },
      { nom: "Soupe du jour", desc: "Recette du chef, servie avec pain artisanal", prix: "5,50€", featured: false },
      { nom: "Assiette mixte", desc: "Charcuteries sélectionnées, cornichons, pain grillé", prix: "9,00€", featured: true },
    ],
  },
  {
    categorie: "Plats",
    icone: "fas fa-utensils",
    items: [
      { nom: "Burger Signature", desc: "Steak haché 180g, cheddar, oignons caramélisés, sauce maison, frites", prix: "14,50€", featured: true },
      { nom: "Poulet rôti & légumes", desc: "Demi-poulet fermier, légumes de saison, jus de cuisson", prix: "13,00€", featured: false },
      { nom: "Pâtes carbonara", desc: "Pâtes fraîches, lardons fumés, parmesan, crème, poivre noir", prix: "11,50€", featured: false },
      { nom: "Tagine d'agneau", desc: "Mijotage lent, pruneaux, amandes, semoule au beurre", prix: "15,00€", featured: false },
      { nom: "Wrap végétarien", desc: "Houmous, falafel, légumes grillés, sauce yaourt-citron", prix: "10,00€", featured: false },
      { nom: "Plateau snack", desc: "Hot-dog artisanal, frites, salade, sauce au choix", prix: "9,50€", featured: false },
    ],
  },
  {
    categorie: "Desserts",
    icone: "fas fa-ice-cream",
    items: [
      { nom: "Fondant chocolat", desc: "Cœur coulant, glace vanille, caramel au beurre salé", prix: "6,50€", featured: true },
      { nom: "Tarte du jour", desc: "Selon arrivage, demandez au serveur", prix: "5,00€", featured: false },
      { nom: "Tiramisu maison", desc: "Recette traditionnelle, mascarpone, café, biscuits", prix: "6,00€", featured: false },
      { nom: "Coupe de glaces", desc: "3 boules au choix, chantilly, coulis de fruits rouges", prix: "5,50€", featured: false },
    ],
  },
  {
    categorie: "Boissons",
    icone: "fas fa-glass-water",
    items: [
      { nom: "Jus de fruits frais", desc: "Orange, pomme, mangue ou mix du moment", prix: "4,00€", featured: false },
      { nom: "Sodas & Eau", desc: "Coca, Fanta, Sprite, San Pellegrino, Evian", prix: "2,50€", featured: false },
      { nom: "Café & Thé", desc: "Espresso, cappuccino, thé à la menthe, infusions", prix: "2,00€", featured: false },
      { nom: "Smoothie maison", desc: "Fruits mixés du jour, sans sucre ajouté", prix: "5,50€", featured: true },
    ],
  },
];

export default function Menu() {
  return (
    <div className="page-menu">
      <Navbar />

      <main className="menu-main">
        <div className="menu-header">
          <p className="section-label">Notre carte</p>
          <h1>Le menu</h1>
          <p className="menu-sous">Fait maison, produits frais sélectionnés chaque matin</p>
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
                  {item.featured && <span className="menu-badge">Coup de cœur</span>}
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
