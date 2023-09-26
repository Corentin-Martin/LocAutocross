import axios from 'axios';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { useDispatch } from 'react-redux';
import {
  Form, Button, FloatingLabel, Row, Alert,
} from 'react-bootstrap';
import { setToken, setUserConnected } from '../../actions/user';

function Login() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongConnexion, setWrongConnexion] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

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
        navigate('/dashboard');
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
    </Row>
  );
}

export default Login;
