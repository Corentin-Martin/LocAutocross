import { Card, Carousel } from 'react-bootstrap';
import RentalExtract from '../../../RentalExtract/RentalExtract';

function FutureRentals({ rentals }) {
  if (rentals.length === 0) {
    return <Card.Text>Aucune proposition de location pour le moment.</Card.Text>;
  }
  return (

    <Carousel fade className="d-flex justify-content-center align-items-center mt-2 mb-2" style={{ minWidth: '100%' }}>
      {rentals.map((rental) => (
        <Carousel.Item key={rental.id} style={{ width: '100%' }} className="d-flex justify-content-center align-items-center bg-tertiary">
          <div className="col-12 col-md-8">
            <RentalExtract rental={rental} />
          </div>
        </Carousel.Item>
      ))}

    </Carousel>

  );
}

export default FutureRentals;
