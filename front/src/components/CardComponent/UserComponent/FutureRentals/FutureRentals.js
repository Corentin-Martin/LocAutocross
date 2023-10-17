import { Row } from 'react-bootstrap';
import RentalExtract from '../../../RentalExtract/RentalExtract';

function FutureRentals({ rentals }) {
  return (
    <Row className="d-flex justify-content-center align-items-center">
      {rentals.map((rental) => (
        <div key={rental.id} className="col-12 col-md-6 col-lg-3">
          <RentalExtract rental={rental} />
        </div>
      ))}
    </Row>
  );
}

export default FutureRentals;
