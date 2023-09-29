import {
  Card, Col, ListGroup, Spinner,
} from 'react-bootstrap';
import './RentalUserbox.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function RentalUserbox({ rental }) {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user.user);

  if (user === null || user.id === rental.ownerUser.id) {
    return null;
  }
  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <Col sm={12} className="mb-2">
          <Card>
            <Card.Header>PANNEAU UTILISATEUR</Card.Header>
            <Card.Body className="text-start">
              Ici ici

            </Card.Body>
          </Card>
        </Col>
      )}
    </div>
  );
}

export default RentalUserbox;
