import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setElementToDisplay } from '../../../../../actions/dashboard';
import AxiosPrivate from '../../../../../utils/AxiosPrivate';
import NotAcceptedButton from './NotAcceptedButton/NotAcceptedButton';
import AssociatedConversation from './AssociatedConversation/AssociatedConversation';

function ReservationAction({ rental, associateConv, handleShow }) {
  const dispatch = useDispatch();

  const handleValidatation = (e) => {
    e.preventDefault();
    AxiosPrivate.put(`rentals/${rental.id}`, { status: 4 })
      .then((res) => {
        dispatch(setElementToDisplay(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (rental.status < 2) {
    return null;
  }

  if (rental.status === '2') {
    return (
      <div style={{ border: '1px solid #dee2e6', padding: '0.5rem 1rem' }} className="alert alert-danger mt-2 mb-2 d-flex flex-column justify-content-center align-items-center text-center">
        <Card.Text>{rental.tenantUser.pseudo} est interessé par cette location.</Card.Text>
        <AssociatedConversation associateConv={associateConv} handleShow={handleShow} />
        <NotAcceptedButton rental={rental} text={`Retirer ${rental.tenantUser.pseudo} du statut d'interessé`} />
      </div>
    );
  }

  if (rental.status === '4') {
    return (
      <div style={{ border: '1px solid #dee2e6', padding: '0.5rem 1rem' }} className="alert alert-success mt-2 mb-2 d-flex flex-column justify-content-center align-items-center text-center">
        <Card.Text>Réservation validée pour {rental.tenantUser.pseudo}</Card.Text>
        <Card.Text>N'hésitez pas à prendre contact avec lui.</Card.Text>
        <NotAcceptedButton rental={rental} text={`Annuler la réservation de ${rental.tenantUser.pseudo}`} />
      </div>
    );
  }

  if (rental.status === '3') {
    return (
      <div style={{ border: '1px solid #dee2e6', padding: '0.5rem 1rem' }} className="alert alert-danger mt-2 mb-2 d-flex flex-column justify-content-center align-items-center text-center">
        <Card.Text>Vous avez une demande de reservation de {rental.tenantUser.pseudo} !</Card.Text>
        <AssociatedConversation associateConv={associateConv} handleShow={handleShow} />
        <Button type="button" onClick={handleValidatation} variant="success"> Valider la demande de réservation de {rental.tenantUser.pseudo}</Button>
        <NotAcceptedButton rental={rental} text={`Refuser la demande de réservation de ${rental.tenantUser.pseudo}`} />
      </div>
    );
  }
}

export default ReservationAction;
