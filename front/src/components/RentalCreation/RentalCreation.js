import {
  Alert, Badge, Button, FloatingLabel, Form, Row,
} from 'react-bootstrap';
import './RentalCreation.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { X } from 'react-bootstrap-icons';
import { setElementToDisplay } from '../../actions/dashboard';
import AxiosPrivate from '../../utils/AxiosPrivate';

function RentalCreation({ rental }) {
  const myVehicles = useSelector((state) => state.dashboard.myVehicles);
  const federations = useSelector((state) => state.generalCalendar.federations);

  const [vehicle, setVehicle] = useState(null);
  const [event, setEvent] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [status, setStatus] = useState(0);

  const [fedeChoice, setFedeChoice] = useState(null);
  const [champChoice, setChampChoice] = useState(null);
  const [privateEvent, setPrivateEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [noEvents, setNoEvents] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (rental !== null) {
      setVehicle(rental.vehicle.id);
      setEvent(rental.event.id);
      setPrice(rental.price);
      setDescription(rental.description);
      setStatus(parseInt(rental.status, 10));

      if (!rental.event.isOfficial) {
        setPrivateEvent(true);
      }
      else {
        setFedeChoice(...federations.filter(
          (fd) => fd.id === rental.event.championship.federation.id,
        ));

        setChampChoice(rental.event.championship);
      }
    }
  }, []);

  useEffect(() => {
    if (champChoice !== null) {
      AxiosPrivate.get(`events?championship[]=${champChoice.id}`)
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
      if (rental === null) {
        AxiosPrivate.post(
          'rentals',
          {
            vehicle: vehicle,
            event: event,
            price: price,
            status: status,
            description: description,
          },
        )
          .then((response) => {
            dispatch(setElementToDisplay(response.data));
          })
          .catch((err) => {
            console.error(err);
          });
      }
      else {
        const existUser = (rental.tenantUser !== null ? rental.tenantUser.id : null);

        const tenantUser = (status === 0) ? null : existUser;

        AxiosPrivate.put(
          `rentals/${rental.id}`,
          {
            vehicle: vehicle,
            event: event,
            price: price,
            status: status,
            description: description,
            tenantUser: tenantUser,
          },
        )
          .then((response) => {
            dispatch(setElementToDisplay(response.data));
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  return (

    <Form className="d-flex flex-column align-items-center bg-primary rounded-4 p-2 col-12" onSubmit={handleSubmit}>

      <Form.Group controlId="categoriesSelect" className="mb-3 col-10">

        {myVehicles.length > 0 ? (
          <>
            <Form.Label>Véhicule *</Form.Label>
            <Form.Select
              defaultValue={vehicle ?? ''}
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
        ) : <Button type="button" className="col-12" variant="danger" onClick={() => navigate('/mon-garage')}>Vous devez d'abord créer un véhicule</Button>}

      </Form.Group>

      <Form.Group controlId="categoriesSelect" className="mb-3 col-10">
        <Form.Label>Evènement *
          {!privateEvent && fedeChoice !== null && (
          <Badge bg="tertiary" className="me-2">{fedeChoice.alias}
            <X
              size="20"
              onClick={() => {
                setFedeChoice(null);
                setChampChoice(null);
                setNoEvents(true);
                setEvent(null);
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
                      defaultValue={event ?? ''}
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
          value={price ?? ''}
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
          value={description ?? ''}
          style={{ height: '100px' }}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </FloatingLabel>

      <Form.Group controlId="categoriesSelect" className="mb-3 col-10">
        <Form.Label>Statut</Form.Label>

        {(rental === null || (rental !== null && rental.status === '0')) && (
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          label="Rendre visible cette annonce"
          onChange={() => setStatus(status === 0 ? 1 : 0)}
        />
        )}

        {rental !== null && rental.status < 4 && rental.status > 0 && (
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          label="Masquer cette annonce"
          onChange={() => setStatus(status !== 0 ? 0 : parseInt(rental.status, 10))}
        />
        )}
        {(rental !== null && status === 0 && rental.tenantUser !== null)
                    && <p className="alert alert-danger text-center">Attention, si vous masquez cette annonce. La réservation ou demande de réservation associée sera supprimée.</p>}

      </Form.Group>

      <p className="mb-3">* Champs obligatoires</p>

      <Button type="submit" variant="secondary">{rental === null ? 'Créer' : 'Modifier'}</Button>
      {wrong.length > 0 && (
      <Alert variant="danger" className="text-center mt-2 col-10">
        <Alert.Heading>Erreur{wrong.length > 1 ? 's' : ''}</Alert.Heading>
        {wrong.map((error) => (<p key={error}>{error}</p>))}
      </Alert>
      )}

    </Form>

  );
}

RentalCreation.defaultProps = {
  rental: null,
};
export default RentalCreation;
