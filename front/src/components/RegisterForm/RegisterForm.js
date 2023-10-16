import './RegisterForm.scss';
import {
  Alert, Button, FloatingLabel, Form, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Password from '../Password/Password';
import { setToken, setUser, setUserConnected } from '../../actions/user';
import AxiosPublic from '../../utils/AxiosPublic';
import ModalRoleChoice from './ModalRoleChoice/ModalRoleChoice';
import AxiosPrivate from '../../utils/AxiosPrivate';

function RegisterForm({ setShowToParent }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [mail, setMail] = useState(null);
  const [pseudo, setPseudo] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState([]);
  const [wrongConnexion, setWrongConnexion] = useState(false);
  const [duplicateMail, setDuplicateMail] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (user !== null) {
      setMail(user.email);
      setPseudo(user.pseudo);
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setRole(user.roles);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if ([mail, pseudo, firstname, lastname, password, role].some((value) => value === null)) {
      setWrongConnexion(true);
    }
    else if (user === null) {
      AxiosPublic.post('user', {
        email: mail,
        password: password,
        pseudo: pseudo,
        firstname: firstname,
        lastname: lastname,
        roles: role,
      })
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          dispatch(setToken(res.data.token));
          dispatch(setUserConnected(true));
          dispatch(setUser(res.data.user));
          setWrongConnexion(false);

          if (location.state !== null) {
            navigate(`/location/${location.state.rental.id}`);
          }
          else {
            navigate('/mon-profil');
          }
        })
        .catch((error) => {
          console.error(error.response.status);
          if (error.response.status === 409) {
            setDuplicateMail(true);
          }
        });
    }
    else {
      AxiosPrivate.put('user', {
        email: mail,
        pseudo: pseudo,
        password: password,
        firstname: firstname,
        lastname: lastname,
        roles: role,
      })
        .then((response) => {
          dispatch(setUser(response.data));
          setShowToParent(false);
        }).catch((error) => {
          console.error(error.response.status);

          if (error.response.status === 409) {
            setDuplicateMail(true);
          }
        });
    }
  };

  const receivePasswordFromChild = (pass) => {
    setPassword(pass);
  };

  const receiveRoleFromChild = (desiredRole) => {
    setRole(desiredRole);
  };
  return (

    <Form onSubmit={handleSubmit} className="col-12 d-flex flex-column align-items-center">
      {wrongConnexion && (
        <Alert variant="danger" className="col-8 text-center">
          Attention, tous les champs sont obligatoires !
        </Alert>
      )}
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
          value={mail ?? ''}
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
          value={pseudo ?? ''}
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
          value={firstname ?? ''}
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
          value={lastname ?? ''}
        />
      </FloatingLabel>

      <Password sendPasswordToParent={receivePasswordFromChild} />

      {user === null && (
      <Row className="mb-3 col-8 text-center d-flex flex-column justify-content-center align-items-center">

        <h5>Choisissez votre rôle :</h5>

        <Button variant="secondary" className="col-6 mb-3" onClick={handleShow}>
          Quel rôle choisir ?
        </Button>

        <ModalRoleChoice
          show={show}
          handleClose={handleClose}
          sendRoleToParent={receiveRoleFromChild}
        />

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
      )}

      {duplicateMail && (
      <Alert variant="danger" className="col-8 text-center">
        Cette adresse mail existe déjà.
      </Alert>
      )}

      <Button variant="primary" type="submit">
        {user === null ? "S'inscrire" : 'Modifier mes informations'}
      </Button>
    </Form>

  );
}

export default RegisterForm;
