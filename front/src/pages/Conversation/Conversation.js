import { useSelector } from 'react-redux';
import MyConversations from '../../components/MyConversations/MyConversations';
import Chat from '../../components/Chat/Chat';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';

function Conversation() {
  const user = useSelector((state) => state.user.user);

  if (user === null) {
    return null;
  }

  return (
    <DashboardLayout
      title="Mes conversations"
      pageTitle="Mes conversations"
      description="Discutez en temps réel sur le chat Loc'Autocross"
      detail={<Chat />}
      myThings={<MyConversations />}
    />

  );
}

export default Conversation;
