import { Card, Col } from 'react-bootstrap';

function RentalInfos({ rental }) {
  return (
    <Col sm={12} md={6} className="mb-2" style={{ flexGrow: '1' }}>
      <Card style={{ width: '100%', height: '100%' }}>
        <Card.Header>La location</Card.Header>
        <Card.Body className="text-start">

          <Card.Text>Tarif : {rental.price ? `${rental.price}€` : 'Non renseigné'}</Card.Text>
          <Card.Text>Loueur : {rental.ownerUser.pseudo}</Card.Text>
          <Card.Text>Informations : {rental.description ?? 'Aucunes informations supplémentaires'}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default RentalInfos;
