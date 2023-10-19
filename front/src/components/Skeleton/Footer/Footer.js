import { Nav } from 'react-bootstrap';
import './Footer.scss';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="Footer">

      <Nav className="justify-content-center mt-3" bg="primary">
        <Nav>
          <Link to="/mentions-legales" className="nav-link">
            Mentions légales
          </Link>
        </Nav>
        <Nav>
          <Link to="/confidentialite" className="nav-link">
            Confidentialité
          </Link>
        </Nav>
        <Nav>
          <Link to="/faq" className="nav-link">
            FAQ
          </Link>
        </Nav>
      </Nav>
    </div>
  );
}

export default Footer;
