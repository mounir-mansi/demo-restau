import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-nom">La Belle Assiette</p>
      <p>12 rue des Saveurs, 75001 Paris</p>
      <p>Lun–Sam&nbsp;: 11h–23h &nbsp;|&nbsp; Dim&nbsp;: 12h–22h</p>
      <div className="footer-socials">
        <a href="#" aria-label="Instagram"><i className="fab fa-instagram" /></a>
        <a href="#" aria-label="Facebook"><i className="fab fa-facebook" /></a>
      </div>
      <p className="footer-legal">
        &copy; {new Date().getFullYear()} La Belle Assiette &mdash;{" "}
        <a href="#">Mentions légales</a>
      </p>
    </footer>
  );
}
