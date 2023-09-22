import { CSSTransition } from 'react-transition-group';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import VehicleCreation from '../../components/VehicleCreation/VehicleCreation';
import './Vehicles.scss';
import MyVehicles from '../../components/MyVehicles/MyVehicles';

import VehicleDetail from '../../components/VehicleDetail/VehicleDetail';
import GarageInfos from '../../components/GarageInfos/GarageInfos';

function Vehicles() {
  const vehicle = useSelector((state) => state.dashboard.vehicle);
  const isOpenCreationModal = useSelector((state) => state.dashboard.isOpenCreationModal);
  const idToEdit = useSelector((state) => state.dashboard.idToEdit);

  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Mon garage</h1>

      <div className="Vehicles-under992">
        <GarageInfos />
        {(vehicle === null) && <VehicleCreation />}
        {(vehicle === null && !isOpenCreationModal) && <MyVehicles />}
        {(vehicle !== null && idToEdit === null) && <VehicleDetail />}
      </div>

      <div className="Vehicles-over992">

        <Row className="d-flex justify-content-center">
          <Col className="col-12 col-lg-6 d-flex flex-column">
            <MyVehicles />
            <CSSTransition
              in={vehicle !== null || isOpenCreationModal}
              timeout={1000}
              classNames="your-component"
              unmountOnExit
            >
              <GarageInfos />
            </CSSTransition>
          </Col>
          <Col className="col-12 col-lg-6 d-flex flex-column">
            {(vehicle === null) && <VehicleCreation />}
            <CSSTransition
              in={vehicle !== null}
              timeout={1000}
              classNames="your-component"
              unmountOnExit
            >
              <VehicleDetail />
            </CSSTransition>

            {(vehicle === null && !isOpenCreationModal) && <GarageInfos />}

          </Col>

        </Row>
      </div>
    </Row>
  );
}

export default Vehicles;
