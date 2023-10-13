import moment from 'moment';
import { ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setElementToDisplay } from '../../../../actions/dashboard';

function EventExtract({ event }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <ListGroup.Item
      onClick={() => {
        dispatch(setElementToDisplay(null));
        navigate(`/evenement/${event.id}`);
      }}
      style={{ cursor: 'pointer' }}
      className="mt-1 d-flex flex-column justify-content-between text-center"
    >

      <div className="col-12 d-flex justify-content-between">
        <span className="fw-bold">{moment(event.start).format('DD/MM/YYYY')}</span>
        <span
          className="badge p-1 align-self-end"
          style={{ backgroundColor: (event.championship !== null ? event.championship.color : '#ffcd61') }}
        >
          {event.championship !== null ? event.championship.alias : 'Evènement privé'}
        </span>
      </div>

      {event.title !== null ? <span className="fw-bold fst-italic mt-1">{event.title}</span> : '/'}

    </ListGroup.Item>
  );
}

export default EventExtract;
