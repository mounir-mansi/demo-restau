import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-nom">La Pergola</p>
      <p>Via Roma 14, 10121 Torino</p>
      <p>Lun–Sab&nbsp;: 11:00–23:00</p>
      <p>Domenica&nbsp;: 12:00–22:00</p>
      <div className="footer-socials">
        <a href="#" aria-label="Instagram"><i className="fab fa-instagram" /></a>
        <a href="#" aria-label="Facebook"><i className="fab fa-facebook" /></a>
      </div>
      <p className="footer-legal">
        &copy; {new Date().getFullYear()} La Pergola &mdash;{" "}
        <a href="#">Note legali</a>
      </p>
    </footer>
  );
}
