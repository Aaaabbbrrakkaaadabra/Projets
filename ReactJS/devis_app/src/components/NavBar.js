import { Link } from "react-router-dom"
import Button from "@mui/material/Button"
import Settings from "@mui/icons-material/Settings"
import "../components/Navbar.css"

const Navbar = () => {
  return (
    <>
      <nav className="nav">
        <div className="link-type">
          <Link to="/">
            <Button variant="text">Accueil</Button>
          </Link>
          <Link to="/devis">
            <Button variant="text">Devis</Button>
          </Link>
          <Link to="/invoices">
            <Button variant="text">Factures</Button>
          </Link>
        </div>

        {/* Icône de droite */}
        <div>
          <Link to="/settings">
            <Button variant="text" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar
