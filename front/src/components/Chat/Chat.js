import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './Chat.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Form, InputGroup, Spinner,
} from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import { setConversation } from '../../actions/dashboard';
import Message from './Message/Message';

function Chat({ noCloseButton = false }) {
  const [conversation, setLocalConversation] = useState(
    useSelector((state) => state.dashboard.conversation),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState('');
  const [chatBoxHeight, setChatBoxHeight] = useState('50vh');

  const dispatch = useDispatch();
  const chatBoxRef = useRef();

  const getMessages = () => {
    axios.get(`http://localhost:8000/api/conversations/${conversation.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setLocalConversation(response.data);
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
      getMessages();
      const intervalMessages = setInterval(getMessages, 2500);

      return () => {
        clearInterval(intervalMessages);
      };
    },
    [conversation],
  );

  const setAvailableHeight = () => {
    const conversationTitleHeight = document.querySelector('.ConversationTitle') !== null ? (document.querySelector('.ConversationTitle').offsetHeight / window.innerHeight) * 100 : 0;
    const messageFormHeight = document.querySelector('.MessageForm') !== null ? (document.querySelector('.MessageForm').offsetHeight / window.innerHeight) * 100 : 0;
    const headerHeight = (document.querySelector('.Header').offsetHeight / window.innerHeight) * 100;
    const footerHeight = (document.querySelector('.Footer').offsetHeight / window.innerHeight) * 100;
    setChatBoxHeight(
      100 - headerHeight - footerHeight - conversationTitleHeight - messageFormHeight,

    );
  };

  useEffect(() => {
    setAvailableHeight();
    window.addEventListener('resize', setAvailableHeight);
  }, []);

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    axios.post(
      `http://localhost:8000/api/messages/${conversation.id}`,
      {
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },

    )
      .then(() => {
        setContent('');
        // setTimeout(() => setIsLoading(false), 2000);
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="d-flex flex-column align-items-center col-12 mt-3" style={{ position: 'relative' }}>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      )
        : (
          <>
            {!noCloseButton && (
            <div
              className="XButton"
              style={{
                position: 'absolute', top: '0', right: '4%', zIndex: '5',
              }}
            >
              <XCircleFill
                size={24}
                onClick={() => dispatch(setConversation(null))}
                className="m-2"
              />
            </div>
            )}

            <div
              style={{
                width: '100%', height: `${chatBoxHeight - 8}vh`, overflow: 'auto', position: 'relative', scrollTop: '100%',
              }}
              className="d-flex flex-column"
              ref={chatBoxRef}
            >
              {conversation.messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
          </>
        )}

      <Form onSubmit={handleSubmit} className="MessageForm mt-3 col-12 d-flex flex-column justify-content-center align-items-center">

        <InputGroup>
          <InputGroup.Text>Votre message</InputGroup.Text>
          <Form.Control
            as="textarea"
            aria-label="Votre message"
            onChange={(event) => {
              setContent(event.currentTarget.value);
            }}
            value={content}
          />
        </InputGroup>

        <Button type="submit" className="mt-2 col-8">Envoyer</Button>

      </Form>

    </div>

  );
}

export default Chat;
