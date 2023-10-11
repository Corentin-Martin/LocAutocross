import {
  Card, Col, Modal, Row,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { setElementToDisplay, setElementToEdit, setOpenCreation } from '../../../actions/dashboard';
import EventCreation from '../../FormAccordionCreation/EventCreation/EventCreation';
import RentalList from './RentalList/RentalList';

function EventComponent({ event }) {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => () => {
    dispatch(setElementToDisplay(null));
  }, []);

  useEffect(() => {
    setShow(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [event]);

  const location = useLocation();

  const handleEditEvent = () => {
    dispatch(setElementToEdit(event));
    if (location.pathname === `/evenement/${event.id}`) {
      setShow(true);
    }
    else {
      dispatch(setElementToDisplay(null));

      dispatch(setOpenCreation(true));
    }
  };

  return (
    <>
      <Card.Header>
        {event.title !== null ? <h2>{event.title}</h2> : ''}
        <p>Date de début : {moment(event.start).format('DD/MM/YYYY')}</p>
        <p>Date de fin : {moment(event.end).format('DD/MM/YYYY')}</p>
        {event.championship !== null
              && (
              <p>Championnat : {event.championship.alias}
              </p>
              )}
      </Card.Header>

      <Card.Body>

        {event.description !== null && <p>{event.description}</p>}
        <Row>
          <Col sm={12} md={6} className="mb-3">
            <div className="Event-Box">
              <h3>Circuit</h3>
              <ul>
                <li>Nom : {event.track.name}</li>
                <li>Ville : {event.track.city} {`(${event.track.postCode})`}</li>
                <li>Département : {event.track.department}</li>
              </ul>
            </div>
          </Col>
          <Col sm={12} md={6} className="mb-3">
            <div className="Event-Box">
              <h3>Dates</h3>
              <ul>
                <li>Début : {moment(event.start).format('DD/MM/YYYY')}</li>
                <li>Fin : {moment(event.end).format('DD/MM/YYYY')}</li>
              </ul>
            </div>
          </Col>
          {event.championship !== null
      && (
        <Col sm={12} className="mb-3">
          <div className="Event-Box">
            <h3>Championnat</h3>
            <ul>
              <li>Nom : {event.championship.name} ({event.championship.alias})</li>
              <li> Fédération : {event.championship.federation.alias}</li>
            </ul>
          </div>
        </Col>
      )}
          <Col sm={12} className="mb-3">
            <div className="Event-Box">
              {event.rentals.length > 0 ? (
                <RentalList
                  rentals={event.rentals.filter(
                    (rental) => (rental.status > 0 && rental.status < 5),
                  )}
                />

              ) : <h3>Pas de locations proposées pour cette épreuve</h3>}
            </div>
          </Col>
        </Row>
        {event.picture !== null && <img src={`http://localhost:8000/${event.picture}`} alt="affiche" />}
        <div onClick={handleEditEvent}>CLIC</div>
      </Card.Body>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <EventCreation event={event} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EventComponent;
