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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [championships, setChampionships] = useState([]);
  const [search, setSearch] = useState([]);
  const eventModal = useSelector((state) => state.generalCalendar.modalCalendarIsOpen);
  const [isLoading, setIsLoading] = useState(true);
  const [loadChampionships, setLoadChampionships] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:8000/api/events')
      .then((response) => {
        setEvents(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/api/championships')
      .then((response) => {
        setChampionships(response.data);
        setIsLoading(false);
        setLoadChampionships(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSelectEvent = useCallback((calEvent) => {
    axios.get(`http://localhost:8000/api/events/${calEvent.id}`)
      .then((response) => {
        const newEvent = {
          ...response.data,
          start: new Date(response.data.start),
          end: new Date(response.data.end),
        };
        setSelectedEvent(newEvent);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (selectedEvent !== null) {
      dispatch(setModalCalendarIsOpen(true));
    }
  }, [selectedEvent]);

  const eventPropGetter = useCallback(
    (event) => {
      if (loadChampionships) {
        return event;
      }

      const champ = (event.isOfficial)
        ? championships.find((element) => element.id === event.championship.id) : null;

      event.style = {
        backgroundColor: (champ === null) ? '#ffcd61' : champ.color,
      };

      return event;
    },
    [championships],
  );

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

  useEffect(() => {
    const query = search.map((oneSearch) => (`&championship[]=${oneSearch}`));

    const queryString = query.toString().replace(',', '');

    axios.get(`http://localhost:8000/api/events?${queryString}`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search]);

  const handleInput = (event) => {
    if (!search.includes(event.target.id)) {
      setSearch([...search, event.target.id]);
    }
    else {
      setSearch(search.filter((item) => item !== event.target.id));
    }
  };

  return (

    <div className="GeneralCalendar">
      {isLoading || loadChampionships ? (
        <p>Chargement en cours...</p>
      ) : (
        <>
          <div>
            {championships.map((oneChampionship) => (
              <div style={{ backgroundColor: oneChampionship.color }} key={oneChampionship.id} className="GeneralCalendar-Box">
                <label htmlFor={oneChampionship.alias}>
                  <input type="checkbox" onChange={handleInput} name={oneChampionship.alias} id={oneChampionship.id} />
                  {oneChampionship.name}
                </label>
              </div>
            ))}
            <div style={{ backgroundColor: '#ffcd61' }} className="GeneralCalendar-Box">
              <label htmlFor="unofficial">
                <input type="checkbox" onChange={handleInput} name="unofficial" id="0" />
                Séance non-officielle
              </label>
            </div>

          </div>
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
          {eventModal && (
          <Event
            title={selectedEvent.title}
            description={selectedEvent.description}
            start={selectedEvent.start}
            end={selectedEvent.end}
            rentals={selectedEvent.rentals}
            track={selectedEvent.track}
            championship={selectedEvent.championship}
          />
          )}
        </>
      )}
    </div>
  );
}

export default GeneralCalendar;
