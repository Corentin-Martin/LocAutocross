import { useSelector } from 'react-redux';
import { PlusCircleFill } from 'react-bootstrap-icons';
import VehicleCreation from '../../components/VehicleCreation/VehicleCreation';
import MyVehicles from '../../components/MyVehicles/MyVehicles';
import VehicleDetail from '../../components/VehicleDetail/VehicleDetail';
import FormAccordionCreation from '../../components/FormAccordionCreation/FormAccordionCreation';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import DashboardInfos from '../../components/DashboardInfos/DashboardInfos';

function Vehicles() {
  const elementToEdit = useSelector((state) => state.dashboard.elementToEdit);
  const myVehicles = useSelector((state) => state.dashboard.myVehicles);

  return (

    <DashboardLayout
      infos={<DashboardInfos myThings={myVehicles} text="de véhicule" type="vehicles" />}
      creativePart={(
        <FormAccordionCreation
          childComponent={<VehicleCreation />}
          message={elementToEdit === null ? <><PlusCircleFill size={24} className="me-2" /> Ajouter un nouveau véhicule</> : 'Modification de véhicule'}
        />
      )}
      detail={<VehicleDetail />}
      myThings={<MyVehicles />}
      title="Mon garage"
    />

  );
}

export default Vehicles;
