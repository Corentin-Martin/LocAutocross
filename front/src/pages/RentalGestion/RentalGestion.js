import { Row } from 'react-bootstrap';
import './RentalGestion.scss';
import RentalCreation from '../../components/RentalCreation/RentalCreation';

function RentalGestion() {
  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Mes locations</h1>
      <RentalCreation />
    </Row>
  );
}

export default RentalGestion;
