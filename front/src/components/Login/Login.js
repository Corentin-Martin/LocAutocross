import axios from 'axios';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

function Login() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/login_check', {
      email: mail,
      password: password,
    })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>

      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => {
            setMail(event.currentTarget.value);
          }}
          type="mail"
          placeholder="votre mail"
        />
        <input
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
          type="password"
          placeholder="votre mot de passe"
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default Login;
