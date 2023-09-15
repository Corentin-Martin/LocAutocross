import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
  // const [isNavOpen, setIsNavOpen] = useState(false);
  const isUserConnected = useSelector((state) => state.user.isUserConnected);

  return (
    <Navbar expand="lg" className="bg-body-primary">

      <Link to="/" className="navbar-brand"><h1 className="Header-Title">Loc'Autocross</h1></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {!isUserConnected
            ? (
              <Link to="/login" className="nav-link">Connexion/Inscription</Link>
            )
            : (
              <Link to="/dashboard" className="nav-link">Mon bureau</Link>
            )}
          <Link to="/dashboard" className="nav-link">A propos</Link>
          <Link to="/dashboard" className="nav-link">Calendrier</Link>
          <Link to="/dashboard" className="nav-link">Les évenèments</Link>
          <Link to="/dashboard" className="nav-link">Les circuits</Link>
          <Link to="/dashboard" className="nav-link">Les locations</Link>
        </Nav>
      </Navbar.Collapse>

    </Navbar>
  );
}

export default Header;
