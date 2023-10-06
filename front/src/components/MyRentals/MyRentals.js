import { Spinner } from 'react-bootstrap';
import './MyRentals.scss';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import AxiosPrivate from '../../utils/AxiosPrivate';
import MasterMy from '../MasterMy/MasterMy';

function MyRentals() {
  const rentalDetail = useSelector((state) => state.dashboard.rental);
  const [isLoading, setIsLoading] = useState(true);
  const [myRentals, setMyRentals] = useState([]);

  useEffect(() => {
    AxiosPrivate.get('rentals?my')
      .then((response) => {
        const past = [];
        const future = [];
        const allRentals = [];

        response.data.forEach((rental) => (
          (moment(rental.event.start) > moment())
            ? future.push(rental)
            : past.push(rental)
        ));

        allRentals.push(past);
        allRentals.push(future);

        setMyRentals(allRentals);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [rentalDetail]);

  return (
    <div className="d-flex flex-column align-items-center col-12 col-md-8 mt-3">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <MasterMy myThings={myRentals} type="rental" />
      )}
    </div>
  );
}

export default MyRentals;
