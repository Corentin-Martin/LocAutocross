import { Card } from 'react-bootstrap';
import RentalsListGroup from '../../RentalsListGroup/RentalsListGroup';

function RentalsBloc({ rentals, title, feeling }) {
  if (rentals.length === 0) {
    return null;
  }

  return (
    <Card style={{ width: '100%' }} className={`p-2 mt-3 bg-status-${rentals[0].status}`}>
      <Card.Title>{title}</Card.Title>
      <Card.Body>
        <RentalsListGroup rentals={rentals} noCancelAlert bgVariant="primary" feeling={feeling} />
      </Card.Body>
    </Card>

  );
}

RentalsBloc.defaultProps = {
  feeling: false,
};

export default RentalsBloc;
