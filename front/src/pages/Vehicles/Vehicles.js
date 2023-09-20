import { Button, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { PlusCircleFill } from 'react-bootstrap-icons';
import VehicleCreation from '../../components/VehicleCreation/VehicleCreation';
import './Vehicles.scss';
import MyVehicles from '../../components/MyVehicles/MyVehicles';
import { setOpenCreation } from '../../actions/dashboard';

function Vehicles() {
  const isOpenCreationModal = useSelector((state) => state.dashboard.isOpenCreationModal);
  console.log(isOpenCreationModal);
  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Mon garage</h1>
      <Row className="d-flex justify-content-center">
        <MyVehicles />
        {isOpenCreationModal ? <VehicleCreation />
          : (
            <div className="d-flex flex-column align-items-center col-12 col-lg-6 bg-secondary rounded-4 p-2" style={{ height: '6rem' }}>
              <h2 className="text-center">Nouveau véhicule</h2>
              <PlusCircleFill size={64} />
            </div>
          )}

      </Row>
    </Row>
  );
}

export default Vehicles;
