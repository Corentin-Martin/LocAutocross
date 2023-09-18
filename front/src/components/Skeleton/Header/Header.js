import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, NavDropdown, Offcanvas } from 'react-bootstrap';

function Header() {
  const isUserConnected = useSelector((state) => state.user.isUserConnected);

  return (
    <Navbar expand="xl" className="bg-body-primary mb-3 Header">
      <Container fluid>
        <Navbar.Brand className="Header-Title">Loc'Autocross</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-false" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-false"
          aria-labelledby="offcanvasNavbarLabel-expand-false"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-false">
              Loc'Autocross
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {!isUserConnected ? (
                <NavDropdown
                  title="Connexion / Inscription"
                  id="offcanvasNavbarDropdown-expand-false"
                >
                  <NavDropdown.Item><Link to="/login" className="nav-link">Connexion</Link></NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/login" className="nav-link">Inscription</Link>
                  </NavDropdown.Item>

                </NavDropdown>
              ) : <Link className="nav-link" href="#action1">Mon Bureau</Link>}
              <Link to="/dashboard" className="nav-link">A propos</Link>
              <Link to="/dashboard" className="nav-link">Calendrier</Link>
              <Link to="/dashboard" className="nav-link">Les évenèments</Link>
              <Link to="/dashboard" className="nav-link">Les circuits</Link>
              <Link to="/dashboard" className="nav-link">Les locations</Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
