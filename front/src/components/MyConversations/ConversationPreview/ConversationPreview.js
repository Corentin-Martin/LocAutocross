import { ListGroup } from 'react-bootstrap';
import './ConversationPreview.scss';
import { Eye } from 'react-bootstrap-icons';
import moment from 'moment';
import { useSelector } from 'react-redux';

function ConversationPreview({ conv }) {
  const user = useSelector((state) => state.user.user);
  return (
    <ListGroup.Item className="bg-secondary d-flex flex-column" style={{ cursor: 'pointer' }}>
      <div>
        <span className="fw-bold">{(conv.interestedUser === user)
          ? `${conv.rental.ownerUser.pseudo} ` : `${conv.interestedUser.pseudo} `}
        </span>- Dernier message reçu le <span className="fst-italic">{moment(conv.messages[0].createdAt).format('DD/MM/YYYY à HH:mm')}</span>
      </div>
      <div>
        <span className="text-decoration-underline">Evènement</span> : {conv.rental.event.title} - {conv.rental.event.track.city} - {moment(conv.rental.event.start).format('DD/MM/YYYY')}
      </div>
      <div>
        <span className="text-decoration-underline">Véhicule</span> : {conv.rental.vehicle.brand.name}{conv.rental.vehicle.model !== null ? ` - ${conv.rental.vehicle.model} -` : ' - '}{moment(conv.rental.vehicle.year).format('YYYY')}
      </div>
      <div className="align-self-end d-flex align-items-center">
        Voir... <Eye size={16} className="ms-2" />
      </div>
    </ListGroup.Item>
  );
}

export default ConversationPreview;
