import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Rental.scss';

function Rental() {
  const { rentalId } = useParams();
  const [rental, setRental] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const statusMatching = {
    0: 'Brouillon',
    1: 'Publié',
    2: 'Interessé',
    3: 'Reservé',
    4: 'Validé',
    5: 'Archivé',
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/rentals/${rentalId}`)
      .then((response) => {
        setRental(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="Rental">
      {isLoading ? <p>Chargement...</p> : (
        <>
          {rental.id} {statusMatching[rental.status]}
        </>
      )}
    </div>
  );
}

export default Rental;
