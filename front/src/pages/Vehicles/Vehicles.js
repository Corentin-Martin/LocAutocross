import { useSelector } from 'react-redux';
import { PlusCircleFill } from 'react-bootstrap-icons';
import VehicleCreation from '../../components/FormAccordionCreation/VehicleCreation/VehicleCreation';
import MyVehicles from '../../components/MyVehicles/MyVehicles';
import FormAccordionCreation from '../../components/FormAccordionCreation/FormAccordionCreation';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import DashboardInfos from '../../components/DashboardInfos/DashboardInfos';
import CardComponent from '../../components/CardComponent/CardComponent';
import VehicleComponent from '../../components/CardComponent/VehicleComponent/VehicleComponent';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function Vehicles() {
  const elementToEdit = useSelector((state) => state.dashboard.elementToEdit);
  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);
  const myVehicles = useSelector((state) => state.dashboard.myVehicles);

  // eslint-disable-next-line no-prototype-builtins
  if (elementToDisplay !== null && !elementToDisplay.hasOwnProperty('engine')) {
    return <LoadingSpinner />;
  }

  return (

    <DashboardLayout
      pageTitle="Votre garage"
      infos={<DashboardInfos myThings={myVehicles} text="de véhicule" type="vehicles" />}
      creativePart={(
        <FormAccordionCreation
          childComponent={<VehicleCreation />}
          message={elementToEdit === null ? <><PlusCircleFill size={24} className="me-2" /> Ajouter un nouveau véhicule</> : 'Modification de véhicule'}
        />
      )}
      detail={(
        <CardComponent
          fromGestion
          childComponent={<VehicleComponent vehicle={elementToDisplay} />}
        />
      )}
      myThings={<MyVehicles />}
      title="Mon garage"
    />

  );
}

export default Vehicles;
