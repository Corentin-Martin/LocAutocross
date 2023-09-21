import { Card } from 'react-bootstrap';
import './VehicleDetail.scss';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import { PencilSquare, TrashFill, XCircleFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import defaultKart from '../../assets/images/defaultKart.jpeg';
import { setVehicleForDetails } from '../../actions/dashboard';

function VehicleDetail() {
  const vehicle = useSelector((state) => state.dashboard.vehicle);

  const dispatch = useDispatch();
  if (vehicle === null) {
    return null;
  }
  return (
    <Card style={{ width: '100%', position: 'relative' }} className="mt-3 text-center bg-secondary">
      <Card.Img
        variant="top"
        src={vehicle.picture !== null ? `http://localhost:8000/${vehicle.picture}` : defaultKart}
        alt={vehicle.model}
      />
      <XCircleFill
        size={36}
        className="text-black VehicleDetail-CloseIcon"
        onClick={() => dispatch(setVehicleForDetails(null))}
      />
      <Card.Body style={{ position: 'relative' }}>
        <TrashFill
          size={24}
          className="text-black VehicleDetail-DeleteIcon"
        />
        <PencilSquare
          size={24}
          className="text-tertiary VehicleDetail-EditIcon"
        />
        <Card.Title>{vehicle.brand.name} - {vehicle.model} - {moment(vehicle.year).format('YYYY')}</Card.Title>

        <Card.Subtitle>Informations</Card.Subtitle>
        <Card.Text>{vehicle.description ?? '/'}</Card.Text>

        <Card.Subtitle>Moteur</Card.Subtitle>
        <Card.Text>{vehicle.engine}</Card.Text>

        <Card.Subtitle>Amortisseurs</Card.Subtitle>
        <Card.Text>{vehicle.shocks}</Card.Text>

        <Card.Subtitle>Catégorie{vehicle.category.length > 1 ? 's' : ''}</Card.Subtitle>
        <Card.Text>
          {vehicle.category.map((cat, index) => (
            (index === vehicle.category.length - 1)
              ? ` ${cat.name}`
              : ` ${cat.name} -`

          ))}
        </Card.Text>

        <Card.Subtitle>Locations</Card.Subtitle>
        {vehicle.rentals.length === 0
          ? <Card.Text>Vous n'avez jamais proposé de location pour ce véhicule.</Card.Text> : '' }
        {vehicle.rentals.map((rental) => (
          <Link key={rental.id} to={`/location/${rental.id}`} className="VehicleDetail-RentalLink">
            <Card.Text className="bg-tertiary p-2 rounded-3 m-1">
              {rental.event.title} - {rental.event.track.city} - le {moment(rental.event.start).format('DD/MM/YYYY')}
            </Card.Text>
          </Link>
        ))}
      </Card.Body>
    </Card>

  );
}

export default VehicleDetail;
