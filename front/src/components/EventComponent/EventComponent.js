import { Card, Modal } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { setEvent } from '../../actions/dashboard';
import EventCreation from '../EventCreation/EventCreation';

function EventComponent({ fromGestion }) {
  const event = useSelector((state) => state.dashboard.event);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => () => {
    dispatch(setEvent(null));
  }, []);

  useEffect(() => {
    setShow(false);
  }, [event]);

  if (event === null) {
    return null;
  }
  return (
    <div className="col-12 col-md-10">
      <Card style={{ width: '100%', position: 'relative' }} className="mt-3 text-center bg-secondary">
        {fromGestion && (
        <XCircleFill
          size={24}
          className="text-black VehicleDetail-CloseIcon"
          onClick={() => dispatch(setEvent(null))}
        />
        )}
        <Card.Header>
          <h2>{event.title}</h2>
          <p>Date de début : {moment(event.start).format('DD/MM/YYYY')}</p>
          <p>Date de fin : {moment(event.end).format('DD/MM/YYYY')}</p>
          {event.championship !== null
              && (
              <p>Championnat : {event.championship.alias}
              </p>
              )}
        </Card.Header>

        <Card.Body>
          {event.picture !== null && <img src={`http://localhost:8000/${event.picture}`} alt="affiche" />}
          <div onClick={handleShow}>CLIC</div>
        </Card.Body>

      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <EventCreation event={event} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EventComponent;
