import {
  Button, Form, Row,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Password from '../../components/Password/Password';
import {
  setResetToken, setToken, setUser, setUserConnected,
} from '../../actions/user';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState(null);
  const resetToken = useSelector((state) => state.user.resetToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (resetToken === null) {
      dispatch(setResetToken(token));
      navigate('/reset');
    }
  }, []);

  const receivePasswordFromChild = (pass) => {
    setPassword(pass);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== null) {
      axios.post('http://localhost:8000/api/reset-password/reset', { token: resetToken, password: password })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            dispatch(setToken(res.data.token));
            dispatch(setUserConnected(true));
            dispatch(setUser(res.data.user));
            navigate('/');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Réinitialiser votre mot de passe</h1>
      <p>{token}</p>
      <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
        <Password sendPasswordToParent={receivePasswordFromChild} />
        <Button variant="primary" type="submit">
          Réinitialiser
        </Button>
      </Form>
    </Row>
  );
}

export default ResetPassword;
