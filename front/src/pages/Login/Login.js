import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.scss';
import { useDispatch } from 'react-redux';
import { Row } from 'react-bootstrap';
import { setElementToDisplay } from '../../actions/dashboard';
import LoginForm from '../../components/LoginForm/LoginForm';
import ModalResetPassword from '../../components/ModalResetPassword/ModalResetPassword';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state !== null) {
      dispatch(setElementToDisplay(location.state.rental));
    }
  }, []);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Connexion</h1>

      <LoginForm />

      <div
        className="badge mt-2 bg-danger col-6 col-md-4 col-lg-2"
        onClick={handleShow}
      >Mot de passe oublié ?
      </div>

      <p
        className="text-center mt-3"
      >Vous n'avez pas encore de compte ?
        <span
          className="badge bg-primary ms-2"
          onClick={() => navigate('/inscription', location.state !== null ? { state: { rental: location.state.rental } } : '')}
        >Inscrivez-vous
        </span>
      </p>

      <ModalResetPassword show={show} handleClose={handleClose} />
    </Row>
  );
}

export default Login;
