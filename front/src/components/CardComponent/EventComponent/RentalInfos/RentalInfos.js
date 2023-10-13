import { Card, ListGroup } from 'react-bootstrap';
import RentalItem from './RentalItem/RentalItem';

function RentalInfos({ rentals }) {
  if (rentals.length === 0) {
    return <Card.Text>Pas de locations proposées pour cet évènement.</Card.Text>;
  }
  return (
    <ListGroup>
      {rentals.map((rental) => (
        <RentalItem key={rental.id} rental={rental} />
      ))}
    </ListGroup>
  );
}

export default RentalInfos;
