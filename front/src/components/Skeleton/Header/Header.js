import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, NavDropdown, Offcanvas } from 'react-bootstrap';
import { useState } from 'react';
import { ToggleOff } from 'react-bootstrap-icons';
import { setToken, setUser, setUserConnected } from '../../../actions/user';

function Header() {
  const isUserConnected = useSelector((state) => state.user.isUserConnected);
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="Header">
      <Navbar expand="xl" className="bg-body-primary mb-3">
        <Container fluid>
          <Navbar.Brand><Link to="/" className="Header-Title">Loc'Autocross</Link></Navbar.Brand>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar-expand-false"
            onClick={() => {
              setShowOffCanvas(true);
            }}
          />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-false"
            aria-labelledby="offcanvasNavbarLabel-expand-false"
            placement="end"
            show={showOffCanvas}
            onHide={() => {
              setShowOffCanvas(false);
            }}
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
                    <NavDropdown.Item
                      as={Link}
                      to="/connexion"
                      onClick={() => {
                        setShowOffCanvas(false);
                      }}
                    >Connexion
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/inscription"
                      onClick={() => {
                        setShowOffCanvas(false);
                      }}
                    >Inscription
                    </NavDropdown.Item>

                  </NavDropdown>
                ) : (
                  <NavDropdown
                    title="Mon Bureau"
                    id="offcanvasNavbarDropdown-expand-false"
                  >
                    <NavDropdown.Item
                      as={Link}
                      to="/mon-garage"
                      onClick={() => {
                        setShowOffCanvas(false);
                      }}
                    >Mon garage
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/mes-locations"
                      onClick={() => {
                        setShowOffCanvas(false);
                      }}
                    >Mes locations
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/mes-conversations"
                      onClick={() => {
                        setShowOffCanvas(false);
                      }}
                    >Mes conversations
                    </NavDropdown.Item>

                  </NavDropdown>

                )}
                <Nav.Link
                  as={Link}
                  to="/dashboard"
                  onClick={() => {
                    setShowOffCanvas(false);
                  }}
                >A propos
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/calendrier"
                  onClick={() => {
                    setShowOffCanvas(false);
                  }}
                >Calendrier
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/dashboard"
                  onClick={() => {
                    setShowOffCanvas(false);
                  }}
                >Les évenèments
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/dashboard"
                  onClick={() => {
                    setShowOffCanvas(false);
                  }}
                >Les circuits
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/dashboard"
                  onClick={() => {
                    setShowOffCanvas(false);
                  }}
                >Les locations
                </Nav.Link>
                {isUserConnected && (
                <Nav.Link
                  as={Link}
                  to="/"
                  onClick={() => {
                    dispatch(setToken(null));
                    dispatch(setUser(null));
                    setShowOffCanvas(false);
                    dispatch(setUserConnected(false));
                    localStorage.removeItem('token');
                  }}
                >Deconnexion <ToggleOff size={16} />
                </Nav.Link>
                )}

              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
