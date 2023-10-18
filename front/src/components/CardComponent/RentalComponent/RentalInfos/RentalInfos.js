import { Card } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

function RentalInfos({ rental }) {
  const navigate = useNavigate();
  return (
    <>
      <Card.Text>Loueur : <span className="badge bg-secondary ms-2 p-2 text-black" onClick={() => navigate(`/utilisateur/${rental.ownerUser.id}`)}>{rental.ownerUser.pseudo} ({rental.ownerUser.rating !== null ? <>{rental.ownerUser.rating} <StarFill /> </> : 'Non noté'})</span></Card.Text>
      <Card.Text>Tarif : {rental.price ? `${rental.price}€` : 'Non renseigné'}</Card.Text>
      <Card.Text>Informations : {rental.description ?? 'Aucunes informations supplémentaires'}</Card.Text>
    </>

  );
}

export default RentalInfos;
