import './RentalExtract.scss';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import defaultKart from '../../assets/images/defaultKart.png';
import { setElementToDisplay } from '../../actions/dashboard';

function RentalExtract({ rental }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Card style={{ width: '100%', height: '100%', textAlign: 'center' }} className="bg-secondary m-1">
      <Card.Body>
        <Card.Title>{rental.event.title}</Card.Title>
        <Card.Subtitle>à {rental.event.track.city}</Card.Subtitle>
        <Card.Text>
          {rental.event.championship !== null ? `${rental.event.championship.federation.alias} - ${rental.event.championship.alias} - Le ${moment(rental.event.start).format('DD/MM/YYYY')}` : `Le ${moment(rental.event.start).format('DD/MM/YYYY')}`}
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Img style={{ width: '85%' }} variant="top" src={rental.vehicle.picture !== null ? `${process.env.REACT_APP_API_URL}${rental.vehicle.picture}` : defaultKart} className="mb-2" />
        <Card.Title>{rental.vehicle.brand.name}</Card.Title>
        <Card.Subtitle>{rental.vehicle.category.map((category, index) => (
          index === rental.vehicle.category.length - 1 ? (` ${category.name}`) : (` ${category.name} /`)
        ))}
        </Card.Subtitle>
        <Button
          variant="tertiary"
          onClick={() => {
            dispatch(setElementToDisplay(rental));
            navigate(`/location/${rental.id}`);
          }}
          className="mt-3"
        >En savoir plus
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RentalExtract;
