import { useEffect, useState } from 'react';
import RentalsBloc from './RentalsBloc/RentalsBloc';

function RentalsTracking({ rentals }) {
  const [interested, setInterested] = useState([]);
  const [askReservation, setAskReservation] = useState([]);
  const [validate, setValidate] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [noRent, setNoRent] = useState(false);

  useEffect(() => {
    if (rentals.length === 0) {
      setNoRent(true);
    }
    else {
      rentals.forEach((rent) => {
        if (rent.status === '2') {
          setInterested([...interested, rent]);
        }
        if (rent.status === '3') {
          setAskReservation([...askReservation, rent]);
        }
        if (rent.status === '4') {
          setValidate([...validate, rent]);
        }
        if (rent.status === '6') {
          setCancelled([...cancelled, rent]);
        }
      });
    }
  }, []);

  if (noRent) {
    return <div className="alert alert-danger">Vous n'avez encore jamais effectué de réservation ni effectué de demande.</div>;
  }

  return (
    <>
      <RentalsBloc title="Ma liste" rentals={interested} />

      <RentalsBloc title={`En cours de demande de réservation${askReservation.length > 1 ? 's' : ''}`} rentals={askReservation} />

      <RentalsBloc title={`Réservation${validate.length > 1 ? 's' : ''} validée${validate.length > 1 ? 's' : ''}`} rentals={validate} feeling />

      <RentalsBloc title={`Evènement${cancelled.length > 1 ? 's' : ''} annulé${cancelled.length > 1 ? 's' : ''}`} rentals={cancelled} />

    </>

  );
}

export default RentalsTracking;
