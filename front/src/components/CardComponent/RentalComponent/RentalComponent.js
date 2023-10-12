import {
  Button,
  Card, Row,
} from 'react-bootstrap';
import moment from 'moment/moment';
import './RentalComponent.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import defaultKart from '../../../assets/images/defaultKart.jpeg';
import RentalControl from './RentalControl/RentalControl';
import RentalUserbox from './RentalUserbox/RentalUserbox';
import { setElementToDisplay } from '../../../actions/dashboard';
import RentalInfos from './RentalInfos/RentalInfos';
import VehicleInfos from './VehicleInfos/VehicleInfos';

function RentalComponent({ rental }) {
  const user = useSelector((state) => state.user.user);

  const statusMatching = useSelector((state) => state.user.statusMatching);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Card.Header
        onClick={() => {
          dispatch(setElementToDisplay(null));
          navigate(`/evenement/${rental.event.id}`);
        }}
        style={{ cursor: 'pointer' }}
      >
        <h2>{rental.event.title}</h2>
        <p>Date de début : {moment(rental.event.start).format('DD/MM/YYYY')}</p>
        <p>Date de fin : {moment(rental.event.start).format('DD/MM/YYYY')}</p>
        {rental.event.championship !== null
              && (
              <p>Championnat : {`${rental.event.championship.alias} `}
                - {rental.event.championship.federation.alias}
              </p>
              )}
      </Card.Header>

      <Card.Body>
        <Card.Img
          style={{ maxWidth: '70%' }}
          src={rental.vehicle.picture !== null ? `http://localhost:8000/${rental.vehicle.picture}` : defaultKart}
          alt={rental.vehicle.model}
        />
        <Card.Title className="mt-3">{`${rental.vehicle.brand.name} - `}
          <span className="badge text-black rounded" style={{ backgroundColor: statusMatching[rental.status][1] }}>
            {statusMatching[rental.status][0]}
          </span>
        </Card.Title>

        <Row className="mt-3 d-flex justify-content-between">
          <RentalInfos rental={rental} />
          <VehicleInfos vehicle={rental.vehicle} />

          <RentalControl rental={rental} />
          <RentalUserbox rental={rental} />
          {(user === null && rental.status < 4)
              && (
              <Button
                type="button"
                className="col-12 text-light"
                variant="danger"
                onClick={() => {
                  navigate('/connexion', { state: { rental: rental } });
                }}
              >Pour plus de renseignements ou pour réserver, veuillez vous connecter
              </Button>
              )}
        </Row>
      </Card.Body>

    </>
  );
}

export default RentalComponent;
