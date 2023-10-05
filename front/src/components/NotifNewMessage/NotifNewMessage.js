import { Badge, Button } from 'react-bootstrap';
import './NotifNewMessage.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function NotifNewMessage() {
  const conversations = useSelector((state) => state.user.conversations);
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  if (user === null || conversations === '' || conversations.unread.length === 0) {
    return null;
  }
  return (
    <Button
      variant="danger"
      className="col-6 col-md-4 col-lg-3 align-self-end mb-3 NotifNewMessage"
      onClick={() => {
        navigate('/mes-conversations');
      }}
    >
      Nouveau{conversations.unread.length > 1 ? 'x' : ''} message{conversations.unread.length > 1 ? 's' : ''} <Badge bg="primary" className="ms-2">{conversations.unread.length}</Badge>
      <span className="visually-hidden">unread messages</span>
    </Button>
  );
}

export default NotifNewMessage;
