import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.scss';
import { useDispatch } from 'react-redux';
import {
  Form, Button, FloatingLabel, Row, Alert, Modal,
} from 'react-bootstrap';
import { setToken, setUserConnected } from '../../actions/user';
import { setRental } from '../../actions/dashboard';
import AxiosPublic from '../../utils/AxiosPublic';

function Login() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongConnexion, setWrongConnexion] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state !== null) {
      dispatch(setRental(location.state.rental));
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    AxiosPublic.post('login_check', {
      email: mail,
      password: password,
    })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        dispatch(setToken(res.data.token));
        dispatch(setUserConnected(true));
        setWrongConnexion(false);
        navigate(-1);
      })
      .catch((err) => {
        console.error(err);
        setWrongConnexion(true);
      });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [mailToReset, setMailToReset] = useState('');
  const [submit, setSubmit] = useState(false);

  const handleResetSubmit = (event) => {
    event.preventDefault();
    AxiosPublic.post('reset-password', { email: mailToReset })
      .then((resp) => {
        if (resp.status === 200) {
          setMailToReset('');
          setSubmit(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Connexion</h1>

      {wrongConnexion && (
      <Alert variant="danger" className="col-8 text-center">
        Erreur, identifiant ou mot de passe invalides...
      </Alert>
      )}

      <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
        <FloatingLabel
          controlId="floatingInput"
          label="Adresse mail"
          className="mb-3 col-8"
        >
          <Form.Control
            onChange={(event) => {
              setMail(event.currentTarget.value);
            }}
            type="email"
            placeholder="name@example.com"
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" className="mb-3 col-8" label="Mot de passe">
          <Form.Control
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
            type="password"
            placeholder="Password"
          />
        </FloatingLabel>

        <Button variant="primary" type="submit">
          Se connecter
        </Button>
      </Form>
      <div className="badge mt-2 bg-danger col-6 col-md-4 col-lg-2" onClick={handleShow}>Mot de passe oublié ?</div>
      <p className="text-center mt-3">Vous n'avez pas encore de compte ? <span className="badge bg-primary" onClick={() => navigate('/inscription', location.state !== null ? { state: { rental: location.state.rental } } : '')}>Inscrivez-vous</span></p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Réinitialisation de mot de passe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!submit ? (
            <Form onSubmit={handleResetSubmit}>
              <Form.Label htmlFor="inputMail">Votre adresse mail</Form.Label>
              <Form.Control
                type="email"
                id="inputMail"
                aria-describedby="emailHelpBlock"
                onChange={(e) => setMailToReset(e.currentTarget.value)}
                value={mailToReset}
              />
              <Button type="submit" className="mt-2">Envoyer</Button>
            </Form>
          )
            : (
              <div className="text-center">
                <p>Si un compte est lié à cette adresse,
                  un email contenant un lien pour réinitialiser le mot de passe vient d'être envoyé.
                </p>
                <p>Ce lien expirera dans 1 heure.</p>
                <p>Si vous n'avez pas reçu d'email, vérifiez vos spams ou <span className="fw-bold text-decoration-underline" onClick={() => setSubmit(false)}>essayez de nouveau</span>.</p>
              </div>
            )}

        </Modal.Body>
      </Modal>
    </Row>
  );
}

export default Login;
