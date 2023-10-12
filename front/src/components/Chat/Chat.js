import { useEffect, useRef, useState } from 'react';
import './Chat.scss';
import { useDispatch, useSelector } from 'react-redux';
import { XCircleFill } from 'react-bootstrap-icons';
import { setConversation, setElementToDisplay } from '../../actions/dashboard';
import Message from './Message/Message';
import AxiosPrivate from '../../utils/AxiosPrivate';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ChatForm from './ChatForm/ChatForm';

function Chat({ noCloseButton }) {
  const conversation = useSelector((state) => state.dashboard.conversation);

  const [localConv, setLocalConv] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [chatBoxHeight, setChatBoxHeight] = useState('50vh');

  const dispatch = useDispatch();
  const chatBoxRef = useRef();

  const getMessages = () => {
    AxiosPrivate.get(`conversations/${conversation.id}`)
      .then((response) => {
        setLocalConv(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => () => {
    dispatch(setConversation(null));
  }, []);

  useEffect(
    () => {
      if (conversation === null) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const intervalMessages = setInterval(getMessages, 1500);

      // eslint-disable-next-line consistent-return
      return () => {
        clearInterval(intervalMessages);
      };
    },
    [conversation],
  );

  const setAvailableHeight = () => {
    const conversationTitleHeight = document.querySelector('.ConversationTitle') !== null ? (document.querySelector('.ConversationTitle').offsetHeight / window.innerHeight) * 100 : 0;
    const headerHeight = (document.querySelector('.Header').offsetHeight / window.innerHeight) * 100;
    const footerHeight = (document.querySelector('.Footer').offsetHeight / window.innerHeight) * 100;
    setChatBoxHeight(
      100 - headerHeight - footerHeight - conversationTitleHeight,

    );
  };

  useEffect(() => {
    setAvailableHeight();
    window.addEventListener('resize', setAvailableHeight);
  }, []);

  const setSendLoadToChat = (bool) => {
    setIsLoading(bool);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="d-flex flex-column align-items-center col-12 mt-3" style={{ height: `${chatBoxHeight - 8}vh`, position: 'relative' }}>

      {!noCloseButton && (
      <div
        className="XButton"
        style={{
          position: 'absolute', top: '0', right: '4%', zIndex: '5',
        }}
      >
        <XCircleFill
          size={24}
          onClick={() => {
            dispatch(setConversation(null));
            dispatch(setElementToDisplay(null));
          }}
          className="m-2"
        />
      </div>
      )}

      <div
        style={{
          width: '100%', overflow: 'auto', position: 'relative', scrollTop: '100%', flexGrow: '1',
        }}
        className="d-flex flex-column"
        ref={chatBoxRef}
      >
        {localConv !== null && localConv.messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      <ChatForm
        conversation={conversation}
        setSendLoadToChat={setSendLoadToChat}
      />

    </div>

  );
}

Chat.defaultProps = {
  noCloseButton: false,
};

export default Chat;
