import { Row } from 'react-bootstrap';
import './RentalGestion.scss';
import { useSelector } from 'react-redux';
import MyRentals from '../../components/MyRentals/MyRentals';
import RentalComponent from '../../components/RentalComponent/RentalComponent';
import FormAccordion from '../../components/FormAccordion/FormAccordion';

function RentalGestion() {
  const rental = useSelector((state) => state.dashboard.rental);
  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Mes locations</h1>

      {rental === null && (
      <>
        <FormAccordion type="rental" />

        <MyRentals />
      </>
      )}

      <RentalComponent fromGestion />

    </Row>
  );
}

export default RentalGestion;
