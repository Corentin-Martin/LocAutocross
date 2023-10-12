import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { PlusCircleFill } from 'react-bootstrap-icons';
import MyRentals from '../../components/MasterMy/MyRentals/MyRentals';
import RentalComponent from '../../components/CardComponent/RentalComponent/RentalComponent';
import FormAccordionCreation from '../../components/FormAccordionCreation/FormAccordionCreation';
import CardComponent from '../../components/CardComponent/CardComponent';
import RentalCreation from '../../components/FormAccordionCreation/RentalCreation/RentalCreation';
import AxiosPrivate from '../../utils/AxiosPrivate';
import MasterMy from '../../components/MasterMy/MasterMy';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import DashboardInfos from '../../components/DashboardInfos/DashboardInfos';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function RentalGestion() {
  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);
  const elementToEdit = useSelector((state) => state.dashboard.elementToEdit);

  const [isLoading, setIsLoading] = useState(true);
  const [myRentals, setMyRentals] = useState([]);

  useEffect(() => {
    AxiosPrivate.get('rentals?my')
      .then((response) => {
        const past = [];
        const future = [];
        const allRentals = [];

        response.data.forEach((rental) => (
          (moment(rental.event.start) > moment())
            ? future.push(rental)
            : past.push(rental)
        ));

        allRentals.push(past);
        allRentals.push(future);

        setMyRentals(allRentals);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [elementToDisplay]);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (

    <DashboardLayout
      pageTitle="Gérez vos locations"
      infos={<DashboardInfos myThings={myRentals} text="de location" type="rentals" />}
      creativePart={(
        <FormAccordionCreation
          childComponent={<RentalCreation />}
          message={elementToEdit === null ? <><PlusCircleFill size={24} className="me-2" /> Créer une proposition de location</> : 'Modifier une location'}
        />
          )}
      detail={(
        <CardComponent
          fromGestion
          childComponent={<RentalComponent rental={elementToDisplay} />}
        />
          )}
      myThings={<MasterMy myThings={myRentals} type="rental" childComponent={<MyRentals />} />}
      title="Mes locations"
    />

  );
}

export default RentalGestion;
