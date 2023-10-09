import { Row } from 'react-bootstrap';
import './Events.scss';
import { useSelector } from 'react-redux';
import MyEvents from '../../components/MyEvents/MyEvents';
import FormAccordion from '../../components/FormAccordion/FormAccordion';
import EventComponent from '../../components/EventComponent/EventComponent';

function Events() {
  const event = useSelector((state) => state.dashboard.event);
  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Mes évènements</h1>

      {event === null && (
      <>
        <FormAccordion type="event" />

        <MyEvents />
      </>
      )}

      <EventComponent fromGestion />
    </Row>
  );
}

export default Events;
