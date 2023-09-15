import {
  Card, Spinner, Stack, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Welcome from '../../components/Welcome/Welcome';
import './Homepage.scss';

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
    <>
      <Welcome />
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (

        <Card>
          <Card.Body className="bg-tertiary">
            <Stack direction="horizontal">

              <h2>Les 5 dernières mises en location</h2>
              <Button variant="outline-primary" className="p-2 ms-auto">
                <Link to="">
                  En voir plus
                  {' '}

                </Link>
              </Button>
            </Stack>
            <ul>
              {newRentals.map((rental) => (<li key={rental.id}>{rental.ownerUser.pseudo}</li>))}
            </ul>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default Homepage;
