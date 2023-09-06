import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './TestCalendar.scss';
import {
  useCallback,
  useEffect, useState,
} from 'react';
import axios from 'axios';
import ModalCalendar from './ModalCalendar/ModalCalendar';

function TestCalendar() {
  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([]);

  const [eventsFiltered, setEventsFiltered] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState('');

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
        setModalIsOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const eventPropGetter = useCallback(
    (event) => ({
      ...(event.isOfficial && {
        style: {
          backgroundColor: '#79D2E6',
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
    <div>
      <Calendar
        localizer={localizer}
        events={eventsFiltered}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={onSelectEvent}
        eventPropGetter={eventPropGetter}
      />
      {modalIsOpen && <ModalCalendar event={selectedEvent} />}
    </div>
  );
}

export default TestCalendar;
