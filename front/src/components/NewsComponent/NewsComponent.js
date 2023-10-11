import {
  Button, Card, Col, Row, Spinner, Stack,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import RentalExtract from '../RentalExtract/RentalExtract';
import AxiosPublic from '../../utils/AxiosPublic';

function NewsComponent() {
  const [newRentals, setNewRentals] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AxiosPublic.get('rentals?last')
      .then((response) => {
        setNewRentals(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <Card>
          <Card.Body className="bg-tertiary">
            <Stack direction="horizontal">

              <h2>Les nouveautés</h2>
              <Button variant="primary" className="p-2 ms-auto">
                En voir plus
              </Button>
            </Stack>
            <Row>
              {newRentals.map((rental) => (
                <Col key={rental.id} xs={12} md={6} lg={3} className="mb-2">
                  <RentalExtract rental={rental} />
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}
    </div>

  );
}

export default NewsComponent;
