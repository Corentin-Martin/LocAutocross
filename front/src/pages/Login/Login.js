import axios from 'axios';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.scss';
import { useDispatch } from 'react-redux';
import {
  Form, Button, FloatingLabel, Row, Alert,
} from 'react-bootstrap';
import { setToken, setUserConnected } from '../../actions/user';
import { setRental } from '../../actions/dashboard';

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
    axios.post('http://localhost:8000/api/login_check', {
      email: mail,
      password: password,
    })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
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
      <p className="text-center mt-3">Vous n'avez pas encore de compte ? <span className="badge bg-primary" onClick={() => navigate('/inscription', location.state !== null ? { state: { rental: location.state.rental } } : '')}>Inscrivez-vous</span></p>
    </Row>
  );
}

export default Login;
