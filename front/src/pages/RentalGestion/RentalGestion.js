import { Row } from 'react-bootstrap';
import './RentalGestion.scss';
import { useSelector } from 'react-redux';
import MyRentals from '../../components/MyRentals/MyRentals';
import RentalComponent from '../../components/RentalComponent/RentalComponent';
import FormAccordionCreation from '../../components/FormAccordionCreation/FormAccordionCreation';
import CardComponent from '../../components/CardComponent/CardComponent';
import RentalCreation from '../../components/RentalCreation/RentalCreation';

function RentalGestion() {
  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);
  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Mes locations</h1>

      {elementToDisplay === null && (
      <>
        <FormAccordionCreation childComponent={<RentalCreation />} message="Créer une nouvelle proposition de location" />

        <MyRentals />
      </>
      )}

      <CardComponent fromGestion childComponent={<RentalComponent rental={elementToDisplay} />} />

    </Row>
  );
}

export default RentalGestion;
