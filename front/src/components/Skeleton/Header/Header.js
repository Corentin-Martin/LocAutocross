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
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  return (
    <div className="Header">
      <Navbar expand="xl" className="bg-body-primary mb-1">
        <Container fluid>
          <Navbar.Brand className="d-flex flex-column align-items-center">
            <Link to="/" className="Header-Title">Loc'Autocross</Link>
            {isUserConnected && (
            <span className="fst-italic fs-6 text-primary d-flex align-items-center justify-content-center">Bonjour {user.pseudo}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-raised-hand" viewBox="0 0 16 16">
                <path d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a.998.998 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207Z" />
                <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              </svg>
            </span>
            )}
          </Navbar.Brand>
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
                      to="/mon-profil"
                      onClick={() => {
                        setShowOffCanvas(false);
                      }}
                    >Mon profil
                    </NavDropdown.Item>
                    {user !== null && user.roles.includes('ROLE_PRO')
                    && (
                    <>
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
                        to="/mes-evenements"
                        onClick={() => {
                          setShowOffCanvas(false);
                        }}
                      >Mes évenèments
                      </NavDropdown.Item>
                    </>
                    )}
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
                  to="/a-propos"
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
                  to="/circuits"
                  onClick={() => {
                    setShowOffCanvas(false);
                  }}
                >Les circuits
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/locations"
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
