import { CSSTransition } from 'react-transition-group';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import VehicleCreation from '../../components/VehicleCreation/VehicleCreation';
import './Vehicles.scss';
import MyVehicles from '../../components/MyVehicles/MyVehicles';

import VehicleDetail from '../../components/VehicleDetail/VehicleDetail';

function Vehicles() {
  const vehicle = useSelector((state) => state.dashboard.vehicle);

  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Mon garage</h1>
      <Row className="d-flex justify-content-center">
        <MyVehicles />
        <Col className="col-12 col-lg-6">
          <VehicleCreation />
          <CSSTransition
            in={vehicle !== null}
            timeout={1000}
            classNames="your-component"
            unmountOnExit
          >
            <VehicleDetail />
          </CSSTransition>

        </Col>

      </Row>
    </Row>
  );
}

export default Vehicles;
