import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setConversation, setRental } from '../../../../actions/dashboard';
import AxiosPrivate from '../../../../utils/AxiosPrivate';

function ReservationAction({ rental, associateConv, handleShow }) {
  const dispatch = useDispatch();

  const handleValidatation = (e) => {
    e.preventDefault();
    AxiosPrivate.put(`rentals/${rental.id}`, { status: 4 })
      .then((res) => {
        dispatch(setRental(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (rental.status < 3) {
    return null;
  }

  if (rental.status === '4') {
    return (
      <div className="alert alert-success mt-2 mb-2 d-flex flex-column justify-content-center align-items-center text-center">
        <Card.Text>Réservation validée pour {rental.tenantUser.pseudo}</Card.Text>
        <Card.Text>N'hésitez pas à prendre contact avec lui.</Card.Text>
      </div>
    );
  }

  if (rental.status === '3') {
    return (
      <div className="alert alert-danger mt-2 mb-2 d-flex flex-column justify-content-center align-items-center text-center">
        <Card.Text>Vous avez une demande de reservation de {rental.tenantUser.pseudo} !</Card.Text>
        {associateConv.exists ? (
          <Card.Text> Vous avez déjà discuté avec.
            <span
              className="badge ms-2 bg-secondary"
              onClick={() => {
                dispatch(setConversation(associateConv.conv[0])); handleShow();
              }}
            >Ouvrir la conversation
            </span>
          </Card.Text>
        )
          : (
            <Card.Text>Vous n'avez jamais discuté avec.
              <span
                className="badge ms-2 bg-secondary"
                onClick={() => {
                  handleShow();
                }}
              >Entamer une conversation ?
              </span>
            </Card.Text>
          )}
        <Button type="button" onClick={handleValidatation}> Valider la demande de réservation de {rental.tenantUser.pseudo}</Button>
      </div>
    );
  }
}

export default ReservationAction;
