import { Button, Card, ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useEffect, useState } from 'react';
import EventExtract from './EventExtract/EventExtract';
import { setElementToDisplay } from '../../../actions/dashboard';
// eslint-disable-next-line import/no-cycle
import TracksMap from '../../TracksMap/TracksMap';

function TrackComponent({ extract, track }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [moreThan3, setMoreThan3] = useState(false);

  useEffect(() => {
    const futureEvents = track.events.filter((event) => moment(event.start) > moment());
    futureEvents.sort((a, b) => new Date(a.start) - new Date(b.start));
    if (track.events.length > 3) {
      setMoreThan3(true);
    }
    setEvents(extract ? futureEvents.slice(0, 3) : futureEvents);
  }, []);
  return (
    <>
      <Card.Header onClick={() => (extract ? navigate(`/circuit/${track.id}`) : '')} style={{ cursor: 'pointer' }}>
        {track.name !== null && <Card.Title>{track.name}</Card.Title>}
        <Card.Subtitle>{track.city} ({track.postCode} - {track.department})</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        {!extract && <TracksMap fromTrackPage />}
        {events.length > 0
          ? (
            <>
              <h6 className="fst-italic text-decoration-underline">Les prochains évènemements :</h6>
              <ListGroup>
                {events.map((event) => {
                  if (moment(event.start) > moment()) {
                    return <EventExtract key={event.id} event={event} />;
                  }
                  return null;
                })}
              </ListGroup>
              {extract && moreThan3 && (
              <Button
                className="mt-2 fst-italic"
                type="button"
                onClick={() => {
                  dispatch(setElementToDisplay(null));
                  navigate(`/circuit/${track.id}`);
                }}
              >... En voir plus
              </Button>
              )}
            </>
          ) : <p>Aucun évènemement à venir.</p>}
      </Card.Body>
    </>
  );
}

TrackComponent.defaultProps = {
  extract: false,
};

export default TrackComponent;
