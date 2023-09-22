import {
  Accordion, Button, FloatingLabel, Form, Spinner,
} from 'react-bootstrap';
import './RentalCreation.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function RentalCreation() {
  const myVehicles = useSelector((state) => state.dashboard.myVehicles);
  const federations = useSelector((state) => state.generalCalendar.federations);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (myVehicles && federations) {
      setIsLoading(false);
    }
  }, [myVehicles, federations]);

  // TODO GERER EVENTS
  const handleEventChange = (e) => {
    setEvent(e.target.value);
    const selectedEvent = events.find((oneEvent) => oneEvent.title === e.target.value);

    if (selectedEvent) {
      setEvent(selectedEvent);
    }
  };

  const [openItem, setOpenItem] = useState(null);

  const navigate = useNavigate();

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
              <Form className="d-flex flex-column align-items-center bg-primary rounded-4 p-2 col-12">

                <Form.Group controlId="categoriesSelect" className="mb-3 col-10">

                  {myVehicles.length > 0 ? (
                    <>
                      <Form.Label>Véhicule</Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option>Sélectionnez un véhicule</option>
                        {myVehicles.map((vehicle) => (
                          <option value={vehicle.id} key={vehicle.id}>{vehicle.brand.name}{vehicle.model !== null ? ` - ${vehicle.model} -` : ' - '}{`${moment(vehicle.year).format('YYYY')} `}
                            ({vehicle.category.map((category, index) => (
                            index === vehicle.category.length - 1 ? `${category.name}`
                              : `${category.name} / `
                          ))})
                          </option>
                        ))}
                      </Form.Select>
                    </>
                  ) : <Button type="button" className="col-12" variant="danger" onClick={() => navigate('/garage')}>Vous devez d'abord créer un véhicule</Button>}

                </Form.Group>

                <Form.Group controlId="categoriesSelect" className="mb-3 col-10">
                  <Form.Label>Evènement</Form.Label>

                  <Accordion>
                    {federations.map((fede) => (
                      <Accordion.Item eventKey={fede.id} key={fede.id}>
                        <Accordion.Header>
                          {fede.alias}
                        </Accordion.Header>
                        <Accordion.Body>
                          <Accordion>
                            {fede.championships.map((champ) => (
                              <Accordion.Item eventKey={champ.id} key={champ.id}>
                                <Accordion.Header>
                                  {champ.alias}
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Form.Group controlId="brandSelect" className="mb-3 col-12">
                                    <Form.Control
                                      type="text"
                                      placeholder="Sélectionnez un évenement"
                                      list={`eventsList${champ.alias}`} // Utilisez le datalist ici
                                      value={event ? event.title : ''}
                                      onChange={handleEventChange}
                                    />
                                    <datalist id={`eventsList${champ.alias}`}>
                                      {champ.events.map((oneEvent) => (
                                        <option key={oneEvent.id} value={oneEvent.title} />
                                      ))}
                                    </datalist>
                                  </Form.Group>
                                </Accordion.Body>
                              </Accordion.Item>
                            ))}
                          </Accordion>

                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>

                </Form.Group>

                <FloatingLabel
                  controlId="floatingInput3"
                  label="Prix (en €)"
                  className="mb-3 col-10"
                >
                  <Form.Control
                    type="number"
                    placeholder="prix"

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

                  />
                </FloatingLabel>

                <Form.Group controlId="categoriesSelect" className="mb-3 col-10">
                  <Form.Label>Statut</Form.Label>

                  <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    label="Rendre visible cette annonce"
                  />

                </Form.Group>

                <Button type="submit" variant="secondary">Créer</Button>

              </Form>

            </Accordion.Body>
          </Accordion.Item>

        </Accordion>

      )}
    </div>
  );
}

export default RentalCreation;
