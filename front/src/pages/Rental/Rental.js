import './Rental.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import RentalComponent from '../../components/RentalComponent/RentalComponent';
import { setRental } from '../../actions/dashboard';

function Rental() {
  const rental = useSelector((state) => state.dashboard.rental);
  const { rentalId } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (rental === null) {
      axios.get(
        `http://localhost:8000/api/rentals/${rentalId}`,
      )
        .then((response) => {
          dispatch(setRental(response.data));
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    else {
      setIsLoading(false);
    }
  }, []);
  return (
    <div className="d-flex justify-content-center">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <RentalComponent />)}
    </div>
  );
}

export default Rental;
