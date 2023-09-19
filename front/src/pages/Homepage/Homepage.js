import {
  Card, Spinner, Stack, Button, Row, Col,
} from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Welcome from '../../components/Welcome/Welcome';
import './Homepage.scss';
import RentalExtract from '../../components/RentalExtract/RentalExtract';

function Homepage() {
  const [newRentals, setNewRentals] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/rentals?last')
      .then((response) => {
        setNewRentals(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="Homepage">

      <Welcome />

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

export default Homepage;
