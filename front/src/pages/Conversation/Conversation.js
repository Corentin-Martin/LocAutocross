import { Row } from 'react-bootstrap';
import './Conversation.scss';
import { useSelector } from 'react-redux';

import MyConversations from '../../components/MyConversations/MyConversations';
import Chat from '../../components/Chat/Chat';

function Conversation() {
  const conversation = useSelector((state) => state.dashboard.conversation);
  const user = useSelector((state) => state.user.user);

  if (user === null) {
    return null;
  }

  return (
    <Row className="d-flex justify-content-center">

      <h1 className="ConversationTitle text-center">Mes conversations</h1>
      <Row className="d-flex">
        <div className="Conversation-under992">
          {conversation === null && <MyConversations />}
        </div>
        <div className="Conversation-over992 align-self-start col-md-6">
          <MyConversations />
        </div>
        {conversation !== null
        && <div className="col-12 col-lg-6"><Chat /></div>}
      </Row>

    </Row>

  );
}

export default Conversation;
