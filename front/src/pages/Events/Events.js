import { Spinner } from 'react-bootstrap';
import './Events.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { PlusCircleFill } from 'react-bootstrap-icons';
import MyEvents from '../../components/MasterMy/MyEvents/MyEvents';
import FormAccordionCreation from '../../components/FormAccordionCreation/FormAccordionCreation';
import EventCreation from '../../components/EventCreation/EventCreation';
import MasterMy from '../../components/MasterMy/MasterMy';
import AxiosPrivate from '../../utils/AxiosPrivate';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import DashboardInfos from '../../components/DashboardInfos/DashboardInfos';
import CardComponent from '../../components/CardComponent/CardComponent';
import EventComponent from '../../components/CardComponent/EventComponent/EventComponent';

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
        <DashboardLayout
          infos={<DashboardInfos myThings={myEvents} text="d'évènement" type="events" />}
          creativePart={(
            <FormAccordionCreation
              childComponent={<EventCreation />}
              message={<><PlusCircleFill size={24} className="me-2" /> Ajouter un évènement</>}
            />
        )}
          detail={(
            <CardComponent
              fromGestion
              childComponent={<EventComponent rental={elementToDisplay} />}
            />
        )}
          myThings={<MasterMy myThings={myEvents} type="event" childComponent={<MyEvents />} />}
          title="Mes évènements"
        />
      )}
    </div>
  );
}

export default Events;
