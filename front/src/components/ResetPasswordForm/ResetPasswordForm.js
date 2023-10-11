import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Password from '../Password/Password';
import AxiosPublic from '../../utils/AxiosPublic';
import { setToken, setUser, setUserConnected } from '../../actions/user';

function ResetPasswordForm() {
  const [password, setPassword] = useState(null);
  const resetToken = useSelector((state) => state.user.resetToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const receivePasswordFromChild = (pass) => {
    setPassword(pass);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== null) {
      AxiosPublic.post('reset-password/reset', { token: resetToken, password: password })
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
    <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
      <Password sendPasswordToParent={receivePasswordFromChild} />
      <Button variant="primary" type="submit">
        Réinitialiser
      </Button>
    </Form>
  );
}

export default ResetPasswordForm;
