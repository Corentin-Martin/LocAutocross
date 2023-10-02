import axios from 'axios';

import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setRental } from '../../../../../actions/dashboard';

function UserReservationButton({ rentalId, status }) {
  const dispatch = useDispatch();
  const match = {
    1: ['Plus intéressé', 'red'],
    2: ['Se postionner comme intéressé', '#FFFF00'],
    3: ['Envoyer une demande de réservation', '#ff8000'],
  };
  const handleChangeStatus = (newStatus) => {
    axios.put(`http://localhost:8000/api/rentals/book/${rentalId}`, {
      status: newStatus,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        dispatch(setRental(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <Button
      type="button"
      className="m-1 col-12 col-md-7 col-lg-5"
      style={{ backgroundColor: match[status][1] }}
      onClick={() => handleChangeStatus(status)}
    >
      {match[status][0]}
    </Button>
  );
}

export default UserReservationButton;
