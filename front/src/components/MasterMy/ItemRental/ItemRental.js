import moment from 'moment';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setElementToDisplay } from '../../../actions/dashboard';

function ItemRental({ rent }) {
  const dispatch = useDispatch();
  const statusMatching = useSelector((state) => state.user.statusMatching);

  return (
    <ListGroup.Item action className="d-flex justify-content-between bg-secondary" onClick={() => dispatch(setElementToDisplay(rent))}>
      <ul className="ms-2 me-3">
        <li className="fw-bold">{moment(rent.event.start).format('DD/MM/YYYY')}</li>
        <li className="fst-italic">{rent.event.track.city}</li>
        <li>{rent.event.title}</li>
        <li>{rent.vehicle.brand.name}{rent.vehicle.model !== null ? ` - ${rent.vehicle.model} -` : ' - '}{moment(rent.vehicle.year).format('YYYY')}</li>
      </ul>

      <span className="badge text-black rounded d-flex align-items-center justify-content-center" style={{ backgroundColor: statusMatching[rent.status][1], minWidth: '76px' }}>
        {statusMatching[rent.status][0]}
      </span>
    </ListGroup.Item>
  );
}

export default ItemRental;
