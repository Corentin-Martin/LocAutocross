import { Card } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useEffect } from 'react';
import { setElementToDisplay, setElementToEdit, setOpenCreation } from '../../../actions/dashboard';
import DeleteButton from '../../DeleteButton/DeleteButton';
import defaultKart from '../../../assets/images/defaultKart.jpeg';
import RentalsListGroup from '../../RentalsListGroup/RentalsListGroup';

function VehicleComponent({ vehicle }) {
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(setElementToDisplay(null));
  }, []);

  if (vehicle === null) {
    return null;
  }
  return (
    <>
      <Card.Img
        variant="top"
        src={vehicle.picture !== null ? `http://localhost:8000/${vehicle.picture}` : defaultKart}
        alt={vehicle.model}
      />
      <Card.Body style={{ position: 'relative' }}>
        <div className="CardComponent-DeleteIcon">
          <DeleteButton type="vehicles" idToDelete={vehicle.id} />
        </div>
        <PencilSquare
          size={24}
          className="text-tertiary CardComponent-EditIcon"
          onClick={() => {
            dispatch(setElementToEdit(vehicle));
            dispatch(setElementToDisplay(null));

            dispatch(setOpenCreation(true));
          }}
        />
        <Card.Title>{vehicle.brand.name}{vehicle.model !== null ? ` - ${vehicle.model} - ` : ' - '}{moment(vehicle.year).format('YYYY')}</Card.Title>

        <Card.Subtitle>Informations</Card.Subtitle>
        <Card.Text>{vehicle.description ?? '/'}</Card.Text>

        <Card.Subtitle>Moteur</Card.Subtitle>
        <Card.Text>{vehicle.engine}</Card.Text>

        <Card.Subtitle>Amortisseurs</Card.Subtitle>
        <Card.Text>{vehicle.shocks ?? 'Non renseigné'}</Card.Text>

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
          ? <Card.Text>Vous n'avez jamais proposé de location pour ce véhicule.</Card.Text>
          : (
            <RentalsListGroup rentals={vehicle.rentals} />
          )}
      </Card.Body>
    </>
  );
}

export default VehicleComponent;
