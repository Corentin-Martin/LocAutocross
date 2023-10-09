import './Rental.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import RentalComponent from '../../components/RentalComponent/RentalComponent';
import { setElementToDisplay } from '../../actions/dashboard';
import AxiosPublic from '../../utils/AxiosPublic';
import CardComponent from '../../components/CardComponent/CardComponent';

function Rental() {
  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);
  const { rentalId } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (elementToDisplay === null) {
      AxiosPublic.get(`rentals/${rentalId}`)
        .then((response) => {
          dispatch(setElementToDisplay(response.data));
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    else {
      setIsLoading(false);
    }
  }, [location.pathname]);
  return (
    <div className="d-flex justify-content-center">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <CardComponent childComponent={<RentalComponent rental={elementToDisplay} />} />)}
    </div>
  );
}

export default Rental;
