import {
  Button,
  Card, Row,
} from 'react-bootstrap';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setElementToDisplay } from '../../../actions/dashboard';
import RentalInfos from './RentalInfos/RentalInfos';
import VehicleInfos from './VehicleInfos/VehicleInfos';
import RentalControl from './RentalControl/RentalControl';
import RentalUserbox from './RentalUserbox/RentalUserbox';
import InfosComponent from '../../InfosComponent/InfosComponent';
import defaultKart from '../../../assets/images/defaultKart.png';
import CancellationBanner from '../../CancellationBanner/CancellationBanner';

function RentalComponent({ rental }) {
  const user = useSelector((state) => state.user.user);
  const statusMatching = useSelector((state) => state.user.statusMatching);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClickHeader = () => {
    if (location.pathname !== '/mes-locations') {
      dispatch(setElementToDisplay(null));
      navigate(`/evenement/${rental.event.id}`);
    }
  };

  return (
    <>
      <Card.Header
        onClick={handleClickHeader}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        {rental.event.title !== null && <h2>{rental.event.title}</h2>}
        <p>Date de début : {moment(rental.event.start).format('DD/MM/YYYY à HH:mm')}</p>
        <p>Date de fin : {moment(rental.event.end).format('DD/MM/YYYY à HH:mm')}</p>
        {rental.event.championship !== null
              && (
              <p>Championnat : {`${rental.event.championship.alias} `}
                - {rental.event.championship.federation.alias}
              </p>
              )}
        {rental.event.isCancelled && <CancellationBanner />}
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
          <InfosComponent title="La location" childComponent={<RentalInfos rental={rental} />} />
          <InfosComponent title="Le véhicule" childComponent={<VehicleInfos vehicle={rental.vehicle} />} />

          {user !== null
          && user.id !== rental.ownerUser.id
          && <InfosComponent title="GESTION UTILISATEUR" bgVariant="admin" childComponent={<RentalUserbox rental={rental} />} />}

          {user !== null
          && user.id === rental.ownerUser.id
          && <InfosComponent title="ADMINISTRATION" bgVariant="admin" childComponent={<RentalControl rental={rental} />} />}

          {(user === null && rental.status < 4 && !rental.event.isCancelled)
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

RentalComponent.defaultProps = {
  rental: null,
};

RentalComponent.propTypes = {
  rental: PropTypes.object,
};

export default RentalComponent;
