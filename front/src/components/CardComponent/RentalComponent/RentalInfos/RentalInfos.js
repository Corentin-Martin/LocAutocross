import { Card } from 'react-bootstrap';

function RentalInfos({ rental }) {
  return (
    <>
      <Card.Text>Tarif : {rental.price ? `${rental.price}€` : 'Non renseigné'}</Card.Text>
      <Card.Text>Loueur : {rental.ownerUser.pseudo}</Card.Text>
      <Card.Text>Informations : {rental.description ?? 'Aucunes informations supplémentaires'}</Card.Text>
    </>

  );
}

export default RentalInfos;
