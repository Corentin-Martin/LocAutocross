import { Card } from 'react-bootstrap';
import './Message.scss';
import moment from 'moment';
import { useSelector } from 'react-redux';

function Message({ message }) {
  const user = useSelector((state) => state.user.user);
  return (
    <Card style={{ width: '50%' }} className={`ms-2 me-2 mt-3 ${message.user.id === user.id ? 'align-self-end bg-secondary' : 'bg-tertiary'}`}>
      <Card.Header>
        <div>
          De : {message.user.pseudo}

        </div>
        <div>
          Le : {moment(message.createdAt).format('DD/MM/YYYY à HH:mm:ss')}
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>{message.content}</Card.Text>
      </Card.Body>
    </Card>

  );
}

export default Message;
