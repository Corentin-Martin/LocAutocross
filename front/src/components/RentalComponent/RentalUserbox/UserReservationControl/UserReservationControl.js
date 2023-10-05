import { useSelector } from 'react-redux';

import { Row } from 'react-bootstrap';
import UserReservationButton from './UserReservationButton/UserReservationButton';

function UserReservationControl({ rental }) {
  const user = useSelector((state) => state.user.user);
  const status = parseInt(rental.status, 10);

  return (
    <div
      style={{ border: '1px solid #dee2e6', padding: '0.5rem 1rem', cursor: 'pointer' }}
      className="d-flex flex-column justify-content-center align-items-center col-12 mt-3"
    >
      <h5>Réservation :</h5>

      <Row className="d-flex justify-content-center col-12">

        {rental.tenantUser === null && (
        <>
          <UserReservationButton rentalId={rental.id} status={2} />
          <UserReservationButton rentalId={rental.id} status={3} />
        </>
        )}

        {rental.tenantUser !== null
        && (
          rental.tenantUser.id !== user.id ? (
            <div className="alert alert-danger text-center col-12">
              {rental.status !== '4'
                ? "Quelqu'un est déjà interessé, vous ne pouvez pas faire de demande de réservation. En revanche, vous pouvez toujours envoyer un message au propriétaire."
                : 'Déjà réservé. Aucune action possible'}
            </div>
          ) : (
            <>
              {(status < 1 < 5) && <UserReservationButton rentalId={rental.id} status={1} />}

              {(status === 1) && <UserReservationButton rentalId={rental.id} status={2} />}

              {(status < 3) && <UserReservationButton rentalId={rental.id} status={3} />}
            </>
          ))}
      </Row>
    </div>
  );
}

export default UserReservationControl;
