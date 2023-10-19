import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import AxiosPrivate from '../../../../../../utils/AxiosPrivate';
import { setElementToDisplay } from '../../../../../../actions/dashboard';

function NotAcceptedButton({ rental, text }) {
  const dispatch = useDispatch();
  const handleNotAccepted = (e) => {
    e.preventDefault();
    AxiosPrivate.put(`rentals/book/${rental.id}`, { status: 1 })
      .then((res) => {
        dispatch(setElementToDisplay(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <Button type="button" className="mt-2" variant="danger" onClick={handleNotAccepted}> {text}</Button>

  );
}

export default NotAcceptedButton;
