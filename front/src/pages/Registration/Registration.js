import { useState } from 'react';
import './Registration.scss';
import {
  Form, Button, FloatingLabel, Row, Alert, Card,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUserConnected } from '../../actions/user';

function Registration() {
  const [mail, setMail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [wrongConnexion, setWrongConnexion] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pastePassword, setPastePassword] = useState(false);
  const [displayRequirements, setDisplayRequirements] = useState(false);

  const [length, setLength] = useState(true);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [digit, setDigit] = useState(true);
  const [specialChars, setSpecialChars] = useState(true);

  const isStrongPassword = (passwordToVerify) => {
    setLength(
      passwordToVerify.length < 12 ?? false,
    );

    setUppercase(
      !/[A-Z]/.test(passwordToVerify) ?? false,
    );

    setLowercase(
      !/[a-z]/.test(passwordToVerify) ?? false,
    );

    setDigit(
      !/\d/.test(passwordToVerify) ?? false,
    );

    const specialCharsToVerify = "!@#$%^&*()_-+=?{}[]|:;.,~`'\"\\/";

    let hasSpecialChar = false;
    for (let i = 0; i < passwordToVerify.length; i += 1) {
      if (specialCharsToVerify.includes(passwordToVerify[i])) {
        hasSpecialChar = true;
        break;
      }
    }

    setSpecialChars(!hasSpecialChar ?? false);
  };

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
        dispatch(setUserConnected(true));
        setWrongConnexion(false);
        navigate('/dashboard');
      })
      .catch(() => {
        setWrongConnexion(true);
      });
  };

  const handlePaste = (event) => {
    event.preventDefault(); // Empêche l'action de collage
    setPastePassword(true);
  };

  return (
    <Row className="d-flex justify-content-center">

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

        <FloatingLabel
          controlId="floatingInput"
          label="Pseudo"
          className="mb-3 col-8"
        >
          <Form.Control
            onChange={(event) => {
              setPseudo(event.currentTarget.value);
            }}
            type="text"
            placeholder="pseudo"
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Prénom"
          className="mb-3 col-8"
        >
          <Form.Control
            onChange={(event) => {
              setFirstname(event.currentTarget.value);
            }}
            type="text"
            placeholder="Prénom"
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Nom de famille"
          className="mb-3 col-8"
        >
          <Form.Control
            onChange={(event) => {
              setLastname(event.currentTarget.value);
            }}
            type="text"
            placeholder="Nom de famille"
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingPassword"
          className="mb-3 col-8"
          label="Mot de passe"
          onClick={() => {
            setDisplayRequirements(true);
          }}
        >
          <Form.Control
            onChange={(event) => {
              setPassword(event.currentTarget.value);
              isStrongPassword(event.currentTarget.value);
            }}
            type="password"
            placeholder="Password"
          />
        </FloatingLabel>

        {displayRequirements && (
        <p>Votre mot de passe doit contenir au moins <span className={!lowercase ? 'text text-success' : 'text text-danger'}>une minuscule, </span>
          <span className={!uppercase ? 'text text-success' : 'text text-danger'}>une majuscule, </span>
          <span className={!digit ? 'text text-success' : 'text text-danger'}>un chiffre, </span>
          <span className={!specialChars ? 'text text-success' : 'text text-danger'}>un caractère spécial, </span>
          <span className={!length ? 'text text-success' : 'text text-danger'}>12 caractères.</span>
        </p>

        )}

        <FloatingLabel controlId="floatingConfirmPassword" className="mb-3 col-8" label="Confirmez votre mot de passe">
          <Form.Control
            onPaste={handlePaste}
            onChange={(event) => {
              setConfirmPassword(event.currentTarget.value);
              setPastePassword(false);
            }}
            type="password"
            placeholder="ConfirmPassword"
          />
        </FloatingLabel>
        {pastePassword && (
        <Alert variant="danger" className="col-8 text-center">
          Vous devez retaper votre mot de passe.
        </Alert>
        )}

        <Button variant="primary" type="submit">
          Se connecter
        </Button>
      </Form>
    </Row>
  );
}

export default Registration;
