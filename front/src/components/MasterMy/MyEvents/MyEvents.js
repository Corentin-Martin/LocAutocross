import { ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { setElementToDisplay } from '../../../actions/dashboard';

function MyEvents({ pastOrFuture }) {
  const dispatch = useDispatch();
  return (
    <ListGroup className="col-12">

      {pastOrFuture.map((event) => (
        <ListGroup.Item key={event.id} action className="d-flex justify-content-between bg-secondary" onClick={() => dispatch(setElementToDisplay(event))}>
          <ul className="ms-2 me-3">
            <li className="fw-bold">{moment(event.start).format('DD/MM/YYYY')}</li>
            <li className="fst-italic">{event.track.city}</li>
            <li>{event.title}</li>
          </ul>

        </ListGroup.Item>
      ))}

    </ListGroup>
  );
}

export default MyEvents;
