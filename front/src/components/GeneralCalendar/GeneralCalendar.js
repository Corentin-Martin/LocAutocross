import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import './GeneralCalendar.scss';
import {
  useCallback,
  useEffect, useState,
} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import Spinner from 'react-bootstrap/Spinner';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
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

  const handleInputOnReactSelect = (selectedOptions, meta) => {
    if (meta.action === 'select-option') {
      const table = [];
      selectedOptions.forEach((element) => {
        if (!search.includes(element.value)) {
          table.push(element.value);
        }
      });
      const tableFin = [...search, ...table];
      setSearch(tableFin);
    }

    if (meta.action === 'remove-value') {
      setSearch(search.filter((item) => item !== meta.removedValue.value));
    }
  };

  const handleInputUnofficial = (event) => {
    if (!search.includes(event.target.value)) {
      setSearch([...search, event.target.value]);
    }
    else {
      setSearch(search.filter((item) => item !== event.target.value));
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '4px',
      boxShadow: state.isFocused ? '0 0 3px rgba(0, 0, 0, 0.3)' : 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'grey' : state.data.color,
      color: state.isFocused ? 'black' : 'inherit',
    }),
  };

  const [showFFSA, setShowFFSA] = useState(false);

  const handleCloseFFSA = () => setShowFFSA(false);
  const handleShowFFSA = () => setShowFFSA(true);

  const [showUFOLEP, setShowUFOLEP] = useState(false);

  const handleCloseUFOLEP = () => setShowUFOLEP(false);
  const handleShowUFOLEP = () => setShowUFOLEP(true);

  return (

    <div className="GeneralCalendar">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (

        <Container fluid>

          <Row>
            {federations.map((fede) => (
              <Col size={6} key={fede.id}>
                <Button variant="primary" className="col-8" onClick={fede.alias === 'FFSA' ? handleShowFFSA : handleShowUFOLEP}>
                  {fede.alias}
                </Button>

                <Offcanvas
                  show={fede.alias === 'FFSA' ? showFFSA : showUFOLEP}
                  onHide={fede.alias === 'FFSA' ? handleCloseFFSA : handleCloseUFOLEP}
                  placement={fede.alias === 'FFSA' ? 'start' : 'end'}
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{fede.alias}</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <div className="GeneralCalendar-Box">
                      {fede.disciplines.map((discipline) => (
                        <div key={discipline.id} className="GeneralCalendar-Box-Discipline">
                          <h4>{discipline.name}</h4>
                          <ReactSelect
                            placeholder="Sélectionnez..."
                            isMulti
                            isSearchable
                            isClearable={false}
                            onChange={handleInputOnReactSelect}
                            options={discipline.categories.map((cate) => ({ value: `category[]=${cate.id}`, label: cate.name }))}
                          />
                        </div>

                      ))}
                    </div>
                    <hr />
                    <div className="GeneralCalendar-Box">
                      <h4>Championnats</h4>

                      <div className="GeneralCalendar-Box-Discipline">
                        <ReactSelect
                          styles={customStyles}
                          isClearable={false}
                          closeMenuOnSelect={false}
                          isMulti
                          isSearchable
                          onChange={handleInputOnReactSelect}
                          options={fede.championships.map((oneChampionship) => (
                            { value: `championship[]=${oneChampionship.id}`, label: oneChampionship.name, color: oneChampionship.color }))}
                        />
                      </div>
                    </div>
                  </Offcanvas.Body>
                </Offcanvas>

              </Col>
            ))}
          </Row>

          <div style={{ backgroundColor: '#ffcd61' }} className="GeneralCalendar-Federation">

            <label htmlFor="unofficial">
              <input type="checkbox" onChange={handleInputUnofficial} name="unofficial" id="0" value="championship[]=0" />
              Séance non-officielle
            </label>

          </div>

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

        </Container>
      )}
    </div>
  );
}

export default GeneralCalendar;
