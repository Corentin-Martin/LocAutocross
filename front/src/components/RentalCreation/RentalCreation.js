import {
  Accordion, Alert, Badge, Button, FloatingLabel, Form, Row, Spinner,
} from 'react-bootstrap';
import './RentalCreation.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { X } from 'react-bootstrap-icons';
import axios from 'axios';
import { setRental } from '../../actions/dashboard';

function RentalCreation() {
  const myVehicles = useSelector((state) => state.dashboard.myVehicles);
  const federations = useSelector((state) => state.generalCalendar.federations);
  const [isLoading, setIsLoading] = useState(true);

  const [vehicle, setVehicle] = useState(null);
  const [event, setEvent] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    if (myVehicles && federations) {
      setIsLoading(false);
    }
  }, [myVehicles, federations]);

  const [openItem, setOpenItem] = useState(null);

  const [fedeChoice, setFedeChoice] = useState(null);
  const [champChoice, setChampChoice] = useState(null);
  const [privateEvent, setPrivateEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [noEvents, setNoEvents] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (champChoice !== null) {
      axios.get(`http://localhost:8000/api/events?championship[]=${champChoice.id}`)
        .then((response) => {
          let eventsWithDate = [];

          response.data.forEach((oneEvent) => {
            if (moment(oneEvent.start) > moment()) {
              eventsWithDate = [...eventsWithDate, {
                ...oneEvent,
                start: new Date(oneEvent.start),
                end: new Date(oneEvent.end),
              }];
            }
          });
          setEvents(eventsWithDate);
          if (response.data.some((oneEvent) => moment(oneEvent.start) > moment())) {
            setNoEvents(false);
          }
          else {
            setNoEvents(true);
          }
          // setNoEvents(false);

          if (response.data.length === 0) {
            setNoEvents(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [champChoice]);

  const [wrong, setWrong] = useState([]);

  const verification = () => {
    let verif = true;
    const error = [];
    if (!vehicle) {
      error.push('Vous devez choisir un véhicule');
      verif = false;
    }

    if (!event) {
      error.push('Vous devez choisir un évènement');
      verif = false;
    }

    setWrong(error);
    return verif;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (verification()) {
      axios.post(
        'http://localhost:8000/api/rentals',
        {
          vehicle: vehicle,
          event: event,
          price: price,
          status: status,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },

      )
        .then((response) => {
          dispatch(setRental(response.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // useEffect(() => {
  //   if (isOpenCreationModal) {
  //     setOpenItem('0');
  //   }
  //   else {
  //     setOpenItem(null);
  //     setVehicleToEdit(null);

  //     dispatch(setIdToEdit(null));

  //     setModel('');
  //     setBrand('');
  //     setEngine('');
  //     setShocks('');
  //     setDescription('');
  //     setPicture('');
  //     setYear('2023-01-01');
  //     setCategories([]);
  //     setWrong([]);
  //   }
  // }, [isOpenCreationModal]);

  const handleAccordionToggle = (eventKey) => {
    setOpenItem(openItem === eventKey ? null : eventKey);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (

        <Accordion
          className="col-12 mt-2 mb-2"
          activeKey={openItem}
        >

          <Accordion.Item eventKey="0" onClick={() => handleAccordionToggle('0')}>
            <Accordion.Header className="text-center bg-secondary">
              Créer une nouvelle proposition de location
            </Accordion.Header>
            <Accordion.Body onClick={(e) => {
              e.stopPropagation();
            }}
            >
              <Form className="d-flex flex-column align-items-center bg-primary rounded-4 p-2 col-12" onSubmit={handleSubmit}>

                <Form.Group controlId="categoriesSelect" className="mb-3 col-10">

                  {myVehicles.length > 0 ? (
                    <>
                      <Form.Label>Véhicule *</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => setVehicle(e.currentTarget.value)}
                      >
                        <option>Sélectionnez un véhicule</option>
                        {myVehicles.map((oneVehicle) => (
                          <option value={oneVehicle.id} key={oneVehicle.id}>{oneVehicle.brand.name}{oneVehicle.model !== null ? ` - ${oneVehicle.model} -` : ' - '}{`${moment(oneVehicle.year).format('YYYY')} `}
                            ({oneVehicle.category.map((category, index) => (
                            index === oneVehicle.category.length - 1 ? `${category.name}`
                              : `${category.name} / `
                          ))})
                          </option>
                        ))}
                      </Form.Select>
                    </>
                  ) : <Button type="button" className="col-12" variant="danger" onClick={() => navigate('/garage')}>Vous devez d'abord créer un véhicule</Button>}

                </Form.Group>

                <Form.Group controlId="categoriesSelect" className="mb-3 col-10">
                  <Form.Label>Evènement *
                    {!privateEvent && fedeChoice !== null && (
                    <Badge bg="tertiary" className="me-2">{fedeChoice.alias}
                      <X
                        size="20"
                        onClick={() => {
                          setFedeChoice(null); setChampChoice(null); setNoEvents(true);
                        }}
                      />
                    </Badge>
                    )}
                    {!privateEvent && champChoice !== null && (
                    <Badge bg="tertiary" className="me-2">{champChoice.alias}
                      <X
                        size="20"
                        onClick={() => {
                          setChampChoice(null);
                          setEvent(null);
                          setNoEvents(true);
                        }}
                      />
                    </Badge>
                    )}

                    {privateEvent && (
                    <Badge bg="tertiary" className="me-2">Evenement privé
                      <X
                        size="20"
                        onClick={() => {
                          setPrivateEvent(false);
                          setChampChoice(null);
                          setFedeChoice(null);
                          setEvent(null);
                          setNoEvents(true);
                        }}
                      />
                    </Badge>
                    )}
                  </Form.Label>

                  <Row className="text-center d-flex justify-content-around align-items-center">

                    {fedeChoice === null && (
                    <>{federations.map((fede) => (
                      <Button type="button" variant="tertiary" className="mt-1 col-12 col-md-7" key={fede.id} onClick={() => setFedeChoice(fede)}>{fede.alias}</Button>
                    ))}
                      <Button
                        type="button"
                        variant="tertiary"
                        className="mt-1 col-12 col-md-7"
                        onClick={() => {
                          setFedeChoice({ id: 0 }); setChampChoice({ id: 0 });
                          setPrivateEvent(true);
                        }}
                      >Evenement privé
                      </Button>
                    </>
                    )}

                    {fedeChoice !== null && fedeChoice.id !== 0
                  && event === null
                  && fedeChoice.championships.map((champ) => (
                    <Button
                      type="button"
                      variant="tertiary"
                      className="mt-1 col-12 col-md-7"
                      key={champ.id}
                      onClick={() => {
                        setChampChoice(champ); setEvent(false);
                      }}
                    >{champ.alias}
                    </Button>
                  ))}
                  </Row>

                  {!noEvents
                    && (
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => setEvent(e.target.value)}
                    >
                      <option>Sélectionnez un évènement</option>
                      {events.map((oneEvent) => (
                        <option
                          value={oneEvent.id}
                          key={oneEvent.id}
                        >
                          {oneEvent.title}
                        </option>
                      ))}
                    </Form.Select>
                    )}
                  {champChoice !== null && noEvents && <p>Pas d'évenement proposé</p>}

                </Form.Group>

                <FloatingLabel
                  controlId="floatingInput3"
                  label="Prix (en €)"
                  className="mb-3 col-10"
                >
                  <Form.Control
                    type="number"
                    placeholder="prix"
                    onChange={(e) => setPrice(parseFloat(e.currentTarget.value))}

                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingInput4"
                  label="Description"
                  className="mb-3 col-10"
                >
                  <Form.Control
                    type="textarea"
                    placeholder="description"
                    style={{ height: '100px' }}
                    onChange={(e) => setDescription(e.currentTarget.value)}

                  />
                </FloatingLabel>

                <Form.Group controlId="categoriesSelect" className="mb-3 col-10">
                  <Form.Label>Statut</Form.Label>

                  <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    label="Rendre visible cette annonce"
                    onChange={() => setStatus(status === 0 ? 1 : 0)}
                  />

                </Form.Group>

                <p className="mb-3">* Champs obligatoires</p>

                <Button type="submit" variant="secondary">Créer</Button>
                {wrong.length > 0 && (
                <Alert variant="danger" className="text-center mt-2 col-10">
                  <Alert.Heading>Erreur{wrong.length > 1 ? 's' : ''}</Alert.Heading>
                  {wrong.map((error) => (<p key={error}>{error}</p>))}
                </Alert>
                )}

              </Form>

            </Accordion.Body>
          </Accordion.Item>

        </Accordion>

      )}
    </div>
  );
}

export default RentalCreation;
