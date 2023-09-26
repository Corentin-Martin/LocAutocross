import { Row } from 'react-bootstrap';
import './RentalGestion.scss';
import RentalCreation from '../../components/RentalCreation/RentalCreation';
import MyRentals from '../../components/MyRentals/MyRentals';

function RentalGestion() {
  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Mes locations</h1>
      <RentalCreation />
      <Row>

        <MyRentals />
      </Row>
    </Row>
  );
}

export default RentalGestion;
