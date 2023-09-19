import { Nav } from 'react-bootstrap';
import './Footer.scss';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="Footer">

      <Nav className="justify-content-center mt-3" bg="primary">
        <Nav>
          <Link to="/" className="nav-link">
            Mentions légales
          </Link>
        </Nav>
        <Nav>
          <Link to="/" className="nav-link">
            Confidentialités
          </Link>
        </Nav>
        <Nav>
          <Link to="/" className="nav-link">
            FAQ
          </Link>
        </Nav>
      </Nav>
    </div>
  );
}

export default Footer;
