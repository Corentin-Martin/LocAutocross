import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import { setElementToDisplay, setElementToEdit, setOpenCreation } from '../../../../actions/dashboard';
import MasterModal from '../../../MasterModal/MasterModal';
import EventCreation from '../../../FormAccordionCreation/EventCreation/EventCreation';
import DeleteModal from '../../../DeleteModal/DeleteModal';

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

        <div className="d-flex justify-content-between mb-2">

          <Card.Text
            className="d-flex align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={handleEditEvent}
          ><PencilSquare size={24} className="me-2" /> Editer
          </Card.Text>
          <Card.Text className="d-flex align-items center text-black" style={{ cursor: 'pointer' }}>
            <DeleteModal type="events" idToDelete={event.id} />
          </Card.Text>
        </div>
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
