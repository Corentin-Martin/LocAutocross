import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import './GeneralCalendar.scss';
import {
  useCallback,
  useEffect, useState,
} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setModalCalendarIsOpen } from '../../actions/generalCalendar';
import Event from '../Event/Event';

function GeneralCalendar() {
  moment.locale('fr-FR');
  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([]);

  const [eventsFiltered, setEventsFiltered] = useState([]);

  // const [modalIsOpen, setModalIsOpen] = useState(false);

  const [modalCalendar, setModalCalendar] = useState(
    useSelector((state) => state.generalCalendar.setModalCalendarIsOpen),
  );

  // useEffect(() => {
  //   setModalIsOpen(false);
  // }, [modalCalendar]);

  const [selectedEvent, setSelectedEvent] = useState('');
  const {
    title, description, start, end, rentals, track, championship,
  } = selectedEvent;

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:8000/api/events')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let eventsWithDate = [];

    events.forEach((oneEvent) => {
      eventsWithDate = [...eventsWithDate, {
        ...oneEvent,
        start: new Date(oneEvent.start),
        end: new Date(oneEvent.end),
      }];
    });
    setEventsFiltered(eventsWithDate);
  }, [events]);

  const onSelectEvent = useCallback((calEvent) => {
    axios.get(`http://localhost:8000/api/events/${calEvent.id}`)
      .then((response) => {
        setSelectedEvent(response.data);
        dispatch(setModalCalendarIsOpen(true));
        setModalCalendar(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const eventPropGetter = useCallback(
    (event) => ({
      ...(event.isOfficial && event.championship.alias === 'SEAC' && {
        style: {
          backgroundColor: '#79D2E6',
        },
      }),
      ...(event.isOfficial && event.championship.alias === 'Ouest' && {
        style: {
          backgroundColor: '#F29F05',
        },
      }),
      ...(!event.isOfficial && {
        style: {
          backgroundColor: '#FF6961',
        },
      }),

    }),
    [],
  );

  return (

    <div className="GeneralCalendar">
      <div className="GeneralCalendar-Box GeneralCalendar-Ouest"><p className="">Challenge de l'Ouest</p></div>
      <div className="GeneralCalendar-Box GeneralCalendar-Seac"><p className="">SEAC</p></div>
      <div className="GeneralCalendar-Box GeneralCalendar-Unofficial"><p className="">Séance non-officielle</p></div>

      <Calendar
        localizer={localizer}
        events={eventsFiltered}
        startAccessor="start"
        endAccessor="end"
        defaultView={Views.MONTH}
        style={{ height: '60vh', width: '80vw' }}
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
      {modalCalendar && (
        <Event
          title={title}
          description={description}
          start={start}
          end={end}
          rentals={rentals}
          track={track}
          championship={championship}
        />
      )}
    </div>
  );
}

export default GeneralCalendar;
