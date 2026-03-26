import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-nom">Il Bel Piatto</p>
      <p>12 rue des Saveurs, 75001 Parigi</p>
      <p>Lun–Sab&nbsp;: 11:00–23:00 &nbsp;|&nbsp; Dom&nbsp;: 12:00–22:00</p>
      <div className="footer-socials">
        <a href="#" aria-label="Instagram"><i className="fab fa-instagram" /></a>
        <a href="#" aria-label="Facebook"><i className="fab fa-facebook" /></a>
      </div>
      <p className="footer-legal">
        &copy; {new Date().getFullYear()} Il Bel Piatto &mdash;{" "}
        <a href="#">Note legali</a>
      </p>
    </footer>
  );
}
