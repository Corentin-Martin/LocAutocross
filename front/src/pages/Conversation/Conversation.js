import './Conversation.scss';
import { useSelector } from 'react-redux';

import MyConversations from '../../components/MyConversations/MyConversations';
import Chat from '../../components/Chat/Chat';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';

function Conversation() {
  const conversation = useSelector((state) => state.dashboard.conversation);
  const user = useSelector((state) => state.user.user);

  if (user === null) {
    return null;
  }

  return (
    <DashboardLayout
      detail={<Chat />}
      myThings={<MyConversations />}
      title="Mes conversations"
    />

  );
}

export default Conversation;
