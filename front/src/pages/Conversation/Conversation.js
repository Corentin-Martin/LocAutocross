import { Row } from 'react-bootstrap';
import './Conversation.scss';
import MyConversations from '../../components/MyConversations/MyConversations';

function Conversation() {
  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Mes conversations</h1>

      <MyConversations />

    </Row>

  );
}

export default Conversation;
