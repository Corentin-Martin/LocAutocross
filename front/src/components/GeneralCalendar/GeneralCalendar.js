import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import './GeneralCalendar.scss';
import {
  useCallback,
  useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import {
  Container, Row, Col, Alert, Button, Offcanvas, Spinner, Modal,
} from 'react-bootstrap';
import AxiosPublic from '../../utils/AxiosPublic';
import CardComponent from '../CardComponent/CardComponent';
import EventComponent from '../CardComponent/EventComponent/EventComponent';
import { setElementToDisplay } from '../../actions/dashboard';

function GeneralCalendar() {
  moment.locale('fr-FR');
  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEventLocal] = useState(null);
  const [search, setSearch] = useState([]);
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
    const queryString = search.join('&');

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
  const handleShowFFSA = () => {
    setShowFFSA(true);
    setSearch([]);
  };

  const [showUFOLEP, setShowUFOLEP] = useState(false);

  const handleCloseUFOLEP = () => setShowUFOLEP(false);
  const handleShowUFOLEP = () => {
    setShowUFOLEP(true);
    setSearch([]);
  };

  return (

    <div className="GeneralCalendar">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (

        <Container fluid>

          <Row className="mb-3">
            {federations.map((fede) => (
              <Col size={6} key={fede.id}>
                <Button variant="primary" className="col-8" onClick={fede.alias === 'FFSA' ? handleShowFFSA : handleShowUFOLEP}>
                  {'>'} {fede.alias}
                </Button>

                <Offcanvas
                  show={fede.alias === 'FFSA' ? showFFSA : showUFOLEP}
                  onHide={fede.alias === 'FFSA' ? handleCloseFFSA : handleCloseUFOLEP}
                  placement={fede.alias === 'FFSA' ? 'start' : 'end'}
                  scroll
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{fede.alias}</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    {fede.disciplines.map((discipline) => (
                      <div key={discipline.id} className="GeneralCalendar-Discipline">
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
                    <hr />
                    <div className="GeneralCalendar-Discipline">
                      <h4>Championnat</h4>
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
                    <div style={{ backgroundColor: '#ffcd61' }} className="GeneralCalendar-Unofficial">

                      <label htmlFor="unofficial">
                        <input type="checkbox" onChange={handleInputUnofficial} name="unofficial" id="unofficial" value="championship[]=0" />
                        Séances non-officielles
                      </label>

                    </div>
                    <hr />
                    <Button type="button" className="col-12" onClick={fede.alias === 'FFSA' ? handleCloseFFSA : handleCloseUFOLEP}>Valider mes choix</Button>
                  </Offcanvas.Body>
                </Offcanvas>
              </Col>
            ))}
          </Row>
          <Row className="mb-3">
            <Col size={8}>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setSearch([]);
                }}
              >Réinitialiser les filtres
              </Button>
            </Col>
          </Row>

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

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body className="d-flex justify-content-center">
              <CardComponent childComponent={<EventComponent event={selectedEvent} />} />
            </Modal.Body>
          </Modal>

        </Container>
      )}
    </div>
  );
}

export default GeneralCalendar;
