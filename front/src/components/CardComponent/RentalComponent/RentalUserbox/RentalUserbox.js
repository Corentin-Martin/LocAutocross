import { Card } from 'react-bootstrap';
import moment from 'moment';
import UserReservationControl from './UserReservationControl/UserReservationControl';

import UserConversationControl from './UserConversationControl/UserConversationControl';

function RentalUserbox({ rental }) {
  if (rental.event.isCancelled) {
    return <div className="alert alert-danger text-center"><Card.Text>L'évènement est annulé, aucune action possible.</Card.Text></div>;
  }

  if (moment(rental.event.start) < moment()) {
    return <Card.Text className="alert alert-danger text-center">L'évènement est terminé. Aucune action possible.</Card.Text>;
  }

  return (
    <>
      <UserConversationControl rental={rental} />
      <UserReservationControl rental={rental} />
    </>

  );
}

export default RentalUserbox;
