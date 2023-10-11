import './Registration.scss';
import { Row } from 'react-bootstrap';

import RegisterForm from '../../components/RegisterForm/RegisterForm';

function Registration() {
  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Inscription</h1>

      <RegisterForm />
    </Row>
  );
}

export default Registration;
