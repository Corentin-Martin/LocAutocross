import { Card, ListGroup } from 'react-bootstrap';
import EventExtract from './EventExtract/EventExtract';

function TrackComponent({ track }) {
  return (
    <>
      <Card.Header>
        {track.name !== null && <Card.Title>{track.name}</Card.Title>}
        <Card.Subtitle>{track.city} ({track.postCode} - {track.department})</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        {track.events.length > 0
        && (
        <ListGroup>
          {track.events.map((event) => (
            <EventExtract key={event.id} event={event} />
          ))}
        </ListGroup>
        )}
      </Card.Body>
    </>
  );
}

export default TrackComponent;
