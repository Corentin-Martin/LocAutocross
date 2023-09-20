import { Col, Row } from 'react-bootstrap';
import VehicleCreation from '../../components/VehicleCreation/VehicleCreation';
import './Vehicles.scss';
import MyVehicles from '../../components/MyVehicles/MyVehicles';

function Vehicles() {
  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Mon garage</h1>
      <Col>
        <MyVehicles />
        <VehicleCreation />
      </Col>
    </Row>
  );
}

export default Vehicles;
