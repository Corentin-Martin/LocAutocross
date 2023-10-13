import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import { setElementToDisplay, setElementToEdit, setOpenCreation } from '../../../../actions/dashboard';
import MasterModal from '../../../MasterModal/MasterModal';
import EventCreation from '../../../FormAccordionCreation/EventCreation/EventCreation';
import DeleteButton from '../../../DeleteButton/DeleteButton';

function EventControl({ event }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const handleClose = () => setShow(false);

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
    <>{moment(event.start) < moment()
      ? (
        <div className="alert alert-danger text-center">
          <Card.Text>L'évènement est terminé. Aucune action possible.</Card.Text>
        </div>
      )
      : (
        <>
          <Card.Text
            className="d-flex align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={handleEditEvent}
          ><PencilSquare size={24} className="me-2" /> Editer
          </Card.Text>
          <div className="d-flex align-items center text-black" style={{ cursor: 'pointer' }}>
            <DeleteButton type="events" idToDelete={event.id} text="Annuler" />
          </div>
        </>

      )}
      <MasterModal
        show={show}
        handleClose={handleClose}
        childComponent={<EventCreation closeModal={handleClose} />}
      />
    </>

  );
}

export default EventControl;
