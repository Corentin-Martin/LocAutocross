import { Row } from 'react-bootstrap';
import './Events.scss';
import TracksMap from '../../components/TracksMap/TracksMap';
import TrackCreation from '../../components/TrackCreation/TrackCreation';
import EventCreation from '../../components/EventCreation/EventCreation';
import MyEvents from '../../components/MyEvents/MyEvents';

function Events() {
  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Mes évènements</h1>

      <MyEvents/>
    </Row>
  );
}

export default Events;
