import moment from 'moment';
import { ListGroup } from 'react-bootstrap';

function EventExtract({ event }) {
  return (
    <ListGroup.Item>{event.title !== null ? `${event.title} - ` : ''}{event.championship !== null ? event.championship.alias : 'Evènement privé'}  - {moment(event.start).format('DD/MM/YYYY')}</ListGroup.Item>
  );
}

export default EventExtract;
