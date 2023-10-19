import moment from 'moment';
import { Card } from 'react-bootstrap';

function CommentText({ rental }) {
  return (
    <>
      <Card.Text>Suite à votre location à {rental.event.title !== null ? `${rental.event.title} - ` : ''}{rental.event.track.city} le {moment(rental.event.start).format('DD/MM/YYYY')}, laissez-nous votre avis !</Card.Text>
      <Card.Text>Racontez-nous votre expérience avec {`${rental.ownerUser.pseudo} `}
        et son véhicule.
      </Card.Text>
    </>
  );
}

export default CommentText;
