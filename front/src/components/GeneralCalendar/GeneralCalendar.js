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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [search, setSearch] = useState([]);
  const eventModal = useSelector((state) => state.generalCalendar.modalCalendarIsOpen);
  const [isLoading, setIsLoading] = useState(true);
  const [federations, setFederations] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:8000/api/federations')
      .then((response) => {
        setFederations(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSelectEvent = useCallback((calEvent) => {
    if (calEvent && calEvent.id) {
      axios.get(`http://localhost:8000/api/events/${calEvent.id}`)
        .then((response) => {
          const newEvent = {
            ...response.data,
            start: new Date(response.data.start),
            end: new Date(response.data.end),
          };
          setSelectedEvent(newEvent);
          console.log(newEvent);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (selectedEvent !== null) {
      dispatch(setModalCalendarIsOpen(true));
    }
  }, [selectedEvent]);

  const eventPropGetter = useCallback(
    (event) => {
      if (isLoading) {
        return event;
      }

      let value = null;

      federations.forEach((fd) => {
        if (fd.championships.find((element) => element.id === event.championship.id)) {
          value = fd.championships.find((element) => element.id === event.championship.id);
        }
      });

      const champ = (event.isOfficial) ? value : null;

      event.style = {
        backgroundColor: (champ === null) ? '#ffcd61' : champ.color,
      };

      return event;
    },
    [federations],
  );

  useEffect(() => {
    const queryString = search.join('&');

    axios.get(`http://localhost:8000/api/events?${queryString}`)
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search]);

  const handleInput = (event) => {
    if (!search.includes(event.target.value)) {
      setSearch([...search, event.target.value]);
    }
    else {
      setSearch(search.filter((item) => item !== event.target.value));
    }
  };

  return (

    <div className="GeneralCalendar">
      {isLoading ? (
        <p>Chargement en cours...</p>
      ) : (
        <>
          <div className="GeneralCalendar-Head">
            {federations.map((fede) => (
              <div key={fede.id}>
                <h2>{fede.alias}</h2>
                <hr />
                <h3>Disciplines</h3>
                {fede.disciplines.map((discipline) => (
                  <div key={discipline.id} className="GeneralCalendar-Box">
                    <label htmlFor={discipline.name}>
                      <input type="checkbox" onChange={handleInput} name={discipline.name} id={discipline.id} value={`discipline[]=${discipline.id}`} />
                      {discipline.name}
                    </label>
                    {discipline.categories.map((cate) => (
                      <div key={cate.id} className="GeneralCalendar-Box">
                        <label htmlFor={cate.name}>
                          <input type="checkbox" onChange={handleInput} name={cate.name} id={cate.id} value={`category[]=${cate.id}`} />
                          {cate.name}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
                <hr />
                <h4>Championnats</h4>
                {fede.championships.map((oneChampionship) => (
                  <div style={{ backgroundColor: oneChampionship.color }} key={oneChampionship.id} className="GeneralCalendar-Box">
                    <label htmlFor={oneChampionship.alias}>
                      <input type="checkbox" onChange={handleInput} name={oneChampionship.alias} id={oneChampionship.id} value={`championship[]=${oneChampionship.id}`} />
                      {oneChampionship.name}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#ffcd61' }} className="GeneralCalendar-Box">
            <label htmlFor="unofficial">
              <input type="checkbox" onChange={handleInput} name="unofficial" id="0" value="championship[]=0" />
              Séance non-officielle
            </label>
          </div>
          <Calendar
            localizer={localizer}
            events={events}
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
