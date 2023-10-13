import moment from 'moment';
import { Card } from 'react-bootstrap';

function VehicleInfos({ vehicle }) {
  return (
    <>

      <Card.Text>Catégorie{vehicle.category.length > 1 ? 's : ' : ' : '}
        {vehicle.category.map((category, index) => (
          (index === vehicle.category.length - 1)
            ? `${category.name}`
            : `${category.name} / `
        ))}
      </Card.Text>
      <Card.Text>Modèle : {vehicle.model ?? 'Non renseigné'}</Card.Text>
      <Card.Text>Année : {moment(vehicle.year).format('YYYY')}</Card.Text>
      <Card.Text>Moteur : {vehicle.engine}</Card.Text>
      <Card.Text>Amortisseur : {vehicle.shocks ?? 'Non renseigné'}</Card.Text>
      <Card.Text>Infos : {vehicle.description ?? '/'}</Card.Text>
    </>

  );
}

export default VehicleInfos;
