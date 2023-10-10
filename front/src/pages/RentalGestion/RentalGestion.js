import { Spinner } from 'react-bootstrap';
import './RentalGestion.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { PlusCircleFill } from 'react-bootstrap-icons';
import MyRentals from '../../components/MasterMy/MyRentals/MyRentals';
import RentalComponent from '../../components/RentalComponent/RentalComponent';
import FormAccordionCreation from '../../components/FormAccordionCreation/FormAccordionCreation';
import CardComponent from '../../components/CardComponent/CardComponent';
import RentalCreation from '../../components/RentalCreation/RentalCreation';
import AxiosPrivate from '../../utils/AxiosPrivate';
import MasterMy from '../../components/MasterMy/MasterMy';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import DashboardInfos from '../../components/DashboardInfos/DashboardInfos';

function RentalGestion() {
  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);

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
  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <DashboardLayout
          infos={<DashboardInfos myThings={myRentals} text="de location" type="rentals" />}
          creativePart={(
            <FormAccordionCreation
              childComponent={<RentalCreation />}
              message={<><PlusCircleFill size={24} className="me-2" /> Ajouter une proposition de location</>}
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

      )}
    </div>
  );
}

export default RentalGestion;
