import { Card } from 'react-bootstrap';

function UserFiche({ user }) {
  return (
    <>
      <Card.Text>Pseudo : {user.pseudo}</Card.Text>
      <Card.Text>Prénom : {user.firstname}</Card.Text>
      <Card.Text>Nom de famille : {user.lastname}</Card.Text>
    </>
  );
}

export default UserFiche;
