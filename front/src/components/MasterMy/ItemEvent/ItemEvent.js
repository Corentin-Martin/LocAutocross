import moment from 'moment';
import { ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setEvent } from '../../../actions/dashboard';

function ItemEvent({ event }) {
  const dispatch = useDispatch();

  return (
    <ListGroup.Item action className="d-flex justify-content-between bg-secondary" onClick={() => dispatch(setEvent(event))}>
      <ul className="ms-2 me-3">
        <li className="fw-bold">{moment(event.start).format('DD/MM/YYYY')}</li>
        <li className="fst-italic">{event.track.city}</li>
        <li>{event.title}</li>
      </ul>

    </ListGroup.Item>
  );
}

export default ItemEvent;
