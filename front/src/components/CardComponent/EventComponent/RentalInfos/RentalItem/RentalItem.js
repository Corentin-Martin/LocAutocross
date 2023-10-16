import moment from 'moment';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { setElementToDisplay } from '../../../../../actions/dashboard';

function RentalItem({ rental }) {
  const statusMatching = useSelector((state) => state.user.statusMatching);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (

    <ListGroup.Item
      className="d-flex justify-content-between align-items-center"
      action
      variant="primary"
      onClick={(() => {
        dispatch(setElementToDisplay(null));
        navigate(`/location/${rental.id}`);
      })}
    >

      <ListGroup variant="flush">
        <ListGroup.Item variant="primary">{rental.vehicle.brand.name}{rental.vehicle.model !== null ? ` - ${rental.vehicle.model} - ` : ' - '}{moment(rental.vehicle.year).format('YYYY')}</ListGroup.Item>
        <ListGroup.Item variant="primary">({rental.vehicle.category.map((category, index) => (
          index === rental.vehicle.category.length - 1 ? `${category.name}`
            : `${category.name} / `
        ))})
        </ListGroup.Item>
        <ListGroup.Item variant="primary"> par {rental.ownerUser.pseudo}. Tarif : {rental.price ? `${rental.price}€` : 'Non renseigné'}</ListGroup.Item>
      </ListGroup>

      <div
        className="badge text-black rounded justify-self-end"
        style={{
          backgroundColor: statusMatching[rental.status][1],
        }}
      >
        {statusMatching[rental.status][0]}
      </div>

    </ListGroup.Item>

  );
}

RentalItem.propTypes = {
  rental: PropTypes.object.isRequired,
};

export default RentalItem;
