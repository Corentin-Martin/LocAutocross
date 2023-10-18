import { useEffect, useState } from 'react';

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
    <div>Oh</div>
  );
}

export default RentalsTracking;
