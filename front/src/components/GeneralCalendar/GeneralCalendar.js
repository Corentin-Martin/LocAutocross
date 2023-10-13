import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import './GeneralCalendar.scss';
import {
  useCallback,
  useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container, Alert,
} from 'react-bootstrap';
import AxiosPublic from '../../utils/AxiosPublic';
import CardComponent from '../CardComponent/CardComponent';
import EventComponent from '../CardComponent/EventComponent/EventComponent';
import { setElementToDisplay } from '../../actions/dashboard';
import FederationFilter from '../FederationFilter/FederationFilter';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import MasterModal from '../MasterModal/MasterModal';

function GeneralCalendar() {
  moment.locale('fr-FR');
  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEventLocal] = useState(null);
  const search = useSelector((state) => state.generalCalendar.search);
  const [isLoading, setIsLoading] = useState(true);
  const federations = useSelector((state) => state.generalCalendar.federations);
  const [noEvents, setNoEvents] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (federations) {
      setIsLoading(false);
    }
  }, [federations]);

  const onSelectEvent = useCallback((calEvent) => {
    if (calEvent && calEvent.id) {
      AxiosPublic.get(`events/${calEvent.id}`)
        .then((response) => {
          const newEvent = {
            ...response.data,
            start: new Date(response.data.start),
            end: new Date(response.data.end),
          };
          setSelectedEventLocal(newEvent);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    if (selectedEvent !== null) {
      setShow(true);
      dispatch(setElementToDisplay(selectedEvent));
    }
  }, [selectedEvent]);

  const eventPropGetter = useCallback(
    (event) => {
      if (isLoading) {
        return event;
      }
      let value = null;

      federations.forEach((fd) => {
        if (event.championship !== null
          && fd.championships.find((element) => element.id === event.championship.id)) {
          value = fd.championships.find((element) => element.id === event.championship.id);
        }
      });

      const champ = (event.isOfficial) ? value : null;

      event.style = {
        backgroundColor: (champ === null) ? '#ffcd61' : champ.color,
      };

      return event;
    },
    [isLoading],
  );

  useEffect(() => {
    const queryString = search !== null ? search.join('&') : '';

    AxiosPublic.get(`events?${queryString}`)
      .then((response) => {
        let eventsWithDate = [];

        response.data.forEach((oneEvent) => {
          eventsWithDate = [...eventsWithDate, {
            ...oneEvent,
            start: new Date(oneEvent.start),
            end: new Date(oneEvent.end),
          }];
        });
        setEvents(eventsWithDate);
        setNoEvents(false);

        if (response.data.length === 0) {
          setNoEvents(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (

    <div className="GeneralCalendar">

      <Container fluid>

        <FederationFilter />

        {noEvents && <Alert variant="danger">Aucun événement ne correspond à votre recherche</Alert>}

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.MONTH}
          style={{ height: '70vh', width: '100%' }}
          onSelectEvent={onSelectEvent}
          eventPropGetter={eventPropGetter}
          popup
          views={{ month: true, week: true }}
          messages={{
            week: 'Semaine',
            day: 'Jour',
            month: 'Mois',
            previous: 'Précédent',
            next: 'Suivant',
            today: 'Aujourd\'hui',

            showMore: (total) => `Voir ${total} supplémentaires`,
          }}
          culture="fr"
        />

        <MasterModal
          show={show}
          handleClose={handleClose}
          childComponent={(
            <CardComponent
              childComponent={(
                <EventComponent
                  event={selectedEvent}
                  fromCalendar
                  large
                />
)}
            />
)}
        />

      </Container>

    </div>
  );
}

export default GeneralCalendar;
