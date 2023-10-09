import { Row } from 'react-bootstrap';
import './Events.scss';
import { useSelector } from 'react-redux';
import MyEvents from '../../components/MyEvents/MyEvents';
import FormAccordionCreation from '../../components/FormAccordionCreation/FormAccordionCreation';
import EventComponent from '../../components/EventComponent/EventComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import EventCreation from '../../components/EventCreation/EventCreation';

function Events() {
  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);
  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Mes évènements</h1>

      {elementToDisplay === null && (
      <>
        <FormAccordionCreation childComponent={<EventCreation />} message="Créer un nouvel évènement" />

        <MyEvents />
      </>
      )}

      <CardComponent fromGestion childComponent={<EventComponent event={elementToDisplay} />} />

    </Row>
  );
}

export default Events;
