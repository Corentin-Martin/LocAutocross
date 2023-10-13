import { Card, ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { setConversation } from '../../../../../actions/dashboard';

function ConversationsPreview({ conversations, setShowToParent }) {
  const dispatch = useDispatch();
  return (
    <div style={{ border: '1px solid #dee2e6', padding: '0.5rem 1rem' }}><Card.Text>Conversation{conversations.length > 1 ? 's' : ''} : {conversations.length}</Card.Text>
      {conversations.length > 0 && (
      <ListGroup>
        {conversations.map((conv) => (
          <ListGroup.Item
            key={conv.id}
            onClick={() => {
              dispatch(setConversation(conv));
              setShowToParent(true);
            }}
            style={{ cursor: 'pointer' }}
          ><span className="badge rounded me-2" style={{ backgroundColor: (conv.isReadByOwnerUser ? 'green' : 'red') }}>{conv.isReadByOwnerUser ? 'Lue' : 'Non lue'}</span>avec {conv.interestedUser.pseudo} - Dernier message le : {moment(conv.messages[conv.messages.length - 1].createdAt).format('DD/MM/YYYY à HH:mm')}
          </ListGroup.Item>
        ))}
      </ListGroup>
      )}
    </div>
  );
}
export default ConversationsPreview;
