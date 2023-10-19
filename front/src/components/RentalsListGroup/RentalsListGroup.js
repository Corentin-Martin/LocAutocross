import { ListGroup } from 'react-bootstrap';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import CancellationBanner from '../CancellationBanner/CancellationBanner';

function RentalsListGroup({
  rentals, noCancelAlert, bgVariant, feeling,
}) {
  const navigate = useNavigate();
  return (
    <ListGroup>
      {rentals.map((rental) => (
        <ListGroup.Item
          style={{ cursor: 'pointer', position: 'relative' }}
          variant={bgVariant ?? ''}
          onClick={() => {
            navigate(`/location/${rental.id}`);
          }}
          key={rental.id}
        >{rental.event.title !== null ? `${rental.event.title} - ` : ''}{rental.event.track.city} - le {moment(rental.event.start).format('DD/MM/YYYY')}
          {!noCancelAlert && rental.event.isCancelled && <CancellationBanner />}
          {(feeling && moment(rental.event.end) < moment()) && (
            rental.comment
              ? (
                <span
                  className="badge ms-2 bg-success"
                  onClick={(e) => {
                    e.stopPropagation(); navigate(`/utilisateur/${rental.ownerUser.id}`);
                  }}
                >Vous avez donné votre avis
                </span>
              )
              : (
                <span
                  className="badge ms-2 bg-admin text-black"
                  onClick={(e) => {
                    e.stopPropagation(); navigate(`/mon-avis/${rental.id}`);
                  }}
                >Donnez-nous votre avis
                </span>
              )
          )}

        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

RentalsListGroup.defaultProps = {
  noCancelAlert: false,
  bgVariant: null,
  feeling: false,
};

export default RentalsListGroup;
