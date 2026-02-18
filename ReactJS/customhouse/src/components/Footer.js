import './Footer.css'

function Footer() {
    return (
        <>
     <footer className="footer">
  <div className="footer-container">
    <div className="footer-brand">
      <h2>MonSite</h2>
      <p>Construire des expériences modernes et élégantes pour le web.</p>
    </div>

    <div className="footer-links">
      <div>
        <h3>Produits</h3>
        <a href="//#">Fonctionnalités</a>
        <a href="/#">Tarifs</a>
        <a href="/#">Intégrations</a>
      </div>
      <div>
        <h3>Entreprise</h3>
        <a href="/#">À propos</a>
        <a href="/#">Carrières</a>
        <a href="/#">Blog</a>
      </div>
      <div>
        <h3>Support</h3>
        <a href="/#">FAQ</a>
        <a href="/#">Aide</a>
        <a href="/#">Contact</a>
      </div>
    </div>

    <div className="footer-social">
      <a href="/#"><i className="fab fa-facebook"></i></a>
      <a href="/#"><i className="fab fa-twitter"></i></a>
      <a href="/#"><i className="fab fa-linkedin"></i></a>
      <a href="/#"><i className="fab fa-instagram"></i></a>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© {new Date().getFullYear()} MonSite. Tous droits réservés.</p>
  </div>
</footer>

        
        </>
    )
}

export default Footer;