import { useState } from 'react';
import './Registration.scss';
import {
  Form, Button, FloatingLabel, Row, Alert, Modal, Badge,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUserConnected } from '../../actions/user';

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mail, setMail] = useState(null);
  const [pseudo, setPseudo] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [role, setRole] = useState([]);
  const [wrongConnexion, setWrongConnexion] = useState(false);
  const [pastePassword, setPastePassword] = useState(false);
  const [displayRequirements, setDisplayRequirements] = useState(false);

  const [length, setLength] = useState(true);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [digit, setDigit] = useState(true);
  const [specialChars, setSpecialChars] = useState(true);
  const [samePasswords, setSamePasswords] = useState(true);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const areSamePasswords = (passwordToVerify) => {
    setSamePasswords(passwordToVerify === password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if ([mail, pseudo, firstname, lastname, password, role].some((value) => value === null)) {
      setWrongConnexion(true);
    }
    else if (password === confirmPassword) {
      axios.post('http://localhost:8000/api/user', {
        email: mail,
        password: password,
        pseudo: pseudo,
        firstname: firstname,
        lastname: lastname,
        roles: role,
      })
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          dispatch(setUserConnected(true));
          setWrongConnexion(false);
          navigate('/dashboard');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    setPastePassword(true);
  };

  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Inscription</h1>

      {wrongConnexion && (
      <Alert variant="danger" className="col-8 text-center">
        Attention, tous les champs sont obligatoires pour l'inscription !
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
          controlId="floatingInput2"
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
          controlId="floatingInput3"
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
          controlId="floatingInput4"
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
          onFocus={() => {
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
        <p className="text-center">Votre mot de passe doit contenir au moins <span className={!lowercase ? 'text text-success' : 'text text-danger'}>une minuscule, </span>
          <span className={!uppercase ? 'text text-success' : 'text text-danger'}>une majuscule, </span>
          <span className={!digit ? 'text text-success' : 'text text-danger'}>un chiffre, </span>
          <span className={!specialChars ? 'text text-success' : 'text text-danger'}>un caractère spécial, </span>
          <span className={!length ? 'text text-success' : 'text text-danger'}>12 caractères.</span>
        </p>

        )}

        <FloatingLabel
          controlId="floatingConfirmPassword"
          className="mb-3 col-8"
          label="Confirmez votre mot de passe"
          onFocus={() => {
            setDisplayRequirements(false);
          }}
        >
          <Form.Control
            onPaste={handlePaste}
            onChange={(event) => {
              setConfirmPassword(event.currentTarget.value);
              setPastePassword(false);
              areSamePasswords(event.currentTarget.value);
            }}
            type="password"
            placeholder="ConfirmPassword"
          />
        </FloatingLabel>
        {!samePasswords && <p className="text text-center text-danger">Les deux mots de passe doivent être identiques.</p>}
        {pastePassword && (
        <Alert variant="danger" className="col-8 text-center">
          Vous devez retaper votre mot de passe.
        </Alert>
        )}

        <Row className="mb-3 col-8 text-center d-flex flex-column justify-content-center align-items-center">

          <h5>Choisissez votre rôle :</h5>

          <Button variant="secondary" className="col-6 mb-3" onClick={handleShow}>
            Quel rôle choisir ?
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Quel rôle choisir ?</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">Si vous êtes un particulier souhaitant mettre son véhicule en location pour une ou plusieurs épreuves
              <br />ou
              <br />
              un professionnel proposant des véhicules à la
              location et/ou organisant des évenèments sur circuits :
              <br />
              <h3>
                <Badge
                  bg="tertiary mt-2"
                  onClick={() => {
                    setRole(['ROLE_PRO']);
                    handleClose();
                  }}
                >
                  Sélectionnez le rôle <span className="fw-bold">PRO</span>
                </Badge>
              </h3>
              <hr />
              Si vous êtes un pilote à la recherche d'une location pour une ou plusieurs épreuves :
              <br />
              <h3>
                <Badge
                  bg="tertiary mt-2"
                  onClick={() => {
                    setRole(['ROLE_USER']);
                    handleClose();
                  }}
                >
                  Sélectionnez le rôle <span className="fw-bold">PILOTE</span>
                </Badge>
              </h3>

            </Modal.Body>
          </Modal>

          <div
            className="role-input col-7 bg-tertiary p-1 m-1 rounded"
            onClick={() => {
              setRole(['ROLE_PRO']);
            }}
          >

            <Form.Check
              type="switch"
              id="pro"
              name="role"
              label="Pro"
              checked={role.includes('ROLE_PRO')}
              onChange={() => {
                setRole(['ROLE_PRO']);
              }}
            />
          </div>

          <div
            className="role-input col-7 bg-tertiary p-1 m-1 rounded"
            onClick={() => {
              setRole(['ROLE_USER']);
            }}
          >

            <Form.Check
              type="switch"
              id="user"
              name="role"
              label="Pilote"
              checked={role.includes('ROLE_USER')}
              onChange={() => {
                setRole(['ROLE_USER']);
              }}
            />
          </div>

        </Row>

        <Button variant="primary" type="submit">
          Se connecter
        </Button>
      </Form>
    </Row>
  );
}

export default Registration;
