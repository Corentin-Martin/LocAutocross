import { Row, Spinner } from 'react-bootstrap';
import './Events.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
import MyEvents from '../../components/MasterMy/MyEvents/MyEvents';
import FormAccordionCreation from '../../components/FormAccordionCreation/FormAccordionCreation';
import EventComponent from '../../components/EventComponent/EventComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import EventCreation from '../../components/EventCreation/EventCreation';
import MasterMy from '../../components/MasterMy/MasterMy';
import AxiosPrivate from '../../utils/AxiosPrivate';

function Events() {
  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);

  const [isLoading, setIsLoading] = useState(true);
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    AxiosPrivate.get('events?my')
      .then((response) => {
        const past = [];
        const future = [];
        const allEvents = [];

        response.data.forEach((event) => (
          (moment(event.start) > moment())
            ? future.push(event)
            : past.push(event)
        ));

        allEvents.push(past);
        allEvents.push(future);

        setMyEvents(allEvents);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [elementToDisplay]);

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <Row className="d-flex justify-content-center">

          <h1 className="text-center">Mes évènements</h1>

          {elementToDisplay === null && (
          <>
            <FormAccordionCreation childComponent={<EventCreation />} message="Créer un nouvel évènement" />

            <MasterMy myThings={myEvents} type="event" childComponent={<MyEvents />} />
          </>
          )}

          <CardComponent fromGestion childComponent={<EventComponent event={elementToDisplay} />} />

        </Row>
      )}
    </div>
  );
}

export default Events;
