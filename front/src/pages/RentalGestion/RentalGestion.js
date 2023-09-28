import { Row } from 'react-bootstrap';
import './RentalGestion.scss';
import { useSelector } from 'react-redux';
import RentalCreation from '../../components/RentalCreation/RentalCreation';
import MyRentals from '../../components/MyRentals/MyRentals';
import RentalComponent from '../../components/RentalComponent/RentalComponent';

function RentalGestion() {
  const rental = useSelector((state) => state.dashboard.rental);
  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Mes locations</h1>

      {rental === null && (
      <>
        <RentalCreation />

        <MyRentals />
      </>
      )}

      <RentalComponent fromGestion />

    </Row>
  );
}

export default RentalGestion;
