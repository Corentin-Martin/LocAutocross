import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setElementToDisplay } from '../../../../../actions/dashboard';
import AxiosPrivate from '../../../../../utils/AxiosPrivate';

function UserReservationButton({ rentalId, status }) {
  const dispatch = useDispatch();
  const match = {
    1: ['Je ne suis plus intéressé', 'red'],
    2: ['Je suis interressé', '#FFFF00'],
    3: ['Envoyer une demande de réservation', '#ff8000'],
  };
  const handleChangeStatus = (newStatus) => {
    AxiosPrivate.put(`rentals/book/${rentalId}`, {
      status: newStatus,
    })
      .then((res) => {
        dispatch(setElementToDisplay(res.data));
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
