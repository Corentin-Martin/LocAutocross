import { CSSTransition } from 'react-transition-group';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { PlusCircleFill } from 'react-bootstrap-icons';
import VehicleCreation from '../../components/VehicleCreation/VehicleCreation';
import './Vehicles.scss';
import MyVehicles from '../../components/MyVehicles/MyVehicles';

import VehicleDetail from '../../components/VehicleDetail/VehicleDetail';
import GarageInfos from '../../components/GarageInfos/GarageInfos';

import FormAccordionCreation from '../../components/FormAccordionCreation/FormAccordionCreation';

function Vehicles() {
  const isOpenCreationModal = useSelector((state) => state.dashboard.isOpenCreationModal);

  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);
  const elementToEdit = useSelector((state) => state.dashboard.elementToEdit);

  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Mon garage</h1>

      <div className="Vehicles-under992">
        {!isOpenCreationModal && <GarageInfos />}
        {(elementToDisplay === null) && (
        <FormAccordionCreation
          childComponent={<VehicleCreation />}
          message={elementToEdit === null ? <><PlusCircleFill size={24} className="me-2" /> Ajouter un nouveau véhicule</> : 'Modification de véhicule'}
        />
        )}
        {(elementToDisplay === null && !isOpenCreationModal) && <MyVehicles />}
        {(elementToDisplay !== null && elementToEdit === null) && <VehicleDetail />}
      </div>

      <div className="Vehicles-over992">

        <Row className="d-flex justify-content-center">
          <Col className="col-12 col-lg-6 d-flex flex-column">
            <MyVehicles />
            <CSSTransition
              in={elementToDisplay !== null || isOpenCreationModal}
              timeout={1000}
              classNames="your-component"
              unmountOnExit
            >
              <GarageInfos />
            </CSSTransition>
          </Col>
          <Col className="col-12 col-lg-6 d-flex flex-column">
            {(elementToDisplay === null) && (
            <FormAccordionCreation
              childComponent={<VehicleCreation />}
              message={elementToEdit === null ? <><PlusCircleFill size={24} className="me-2" /> Ajouter un nouveau véhicule</> : 'Modification de véhicule'}
            />
            )}
            <CSSTransition
              in={elementToDisplay !== null}
              timeout={1000}
              classNames="your-component"
              unmountOnExit
            >
              <VehicleDetail />
            </CSSTransition>

            {(elementToDisplay === null && !isOpenCreationModal) && <GarageInfos />}

          </Col>

        </Row>
      </div>
    </Row>
  );
}

export default Vehicles;
