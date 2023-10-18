import moment from 'moment';
import { Card } from 'react-bootstrap';

function UserFiche({ user }) {
  const validateRentals = user.propositions.filter((rent) => rent.status === '4' && moment(rent.event.start) < moment()).length;
  return (
    <>
      <Card.Text>Pseudo : {user.pseudo}</Card.Text>
      <Card.Text>Prénom : {user.firstname}</Card.Text>
      <Card.Text>Nom de famille : {user.lastname}</Card.Text>
      <Card.Text>Location{user.propositions.length > 1 ? 's' : ''} proposée{user.propositions.length > 1 ? 's' : ''} : {user.propositions.length}</Card.Text>
      <Card.Text>Location{validateRentals > 1 ? 's' : ''} effectuée{validateRentals > 1 ? 's' : ''} : {validateRentals}</Card.Text>
    </>
  );
}

export default UserFiche;
