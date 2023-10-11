import { useState } from 'react';
import {
  Alert, Button, FloatingLabel, Form,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AxiosPublic from '../../utils/AxiosPublic';
import { setToken, setUserConnected } from '../../actions/user';

function LoginForm() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongConnexion, setWrongConnexion] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

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
  return (
    <div>
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
    </div>
  );
}

export default LoginForm;
