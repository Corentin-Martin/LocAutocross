import { Row } from 'react-bootstrap';
import './Events.scss';
import TracksMap from '../../components/TracksMap/TracksMap';

function Events() {
  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Mes évènements</h1>

      <TracksMap />

    </Row>
  );
}

export default Events;
