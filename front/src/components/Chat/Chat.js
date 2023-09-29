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
  const conversation = useSelector((state) => state.dashboard.conversation);
  const [localConv, setLocalConv] = useState(null);
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
      setIsLoading(true);
      const intervalMessages = setInterval(getMessages, 1500);

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
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="d-flex flex-column align-items-center col-12 mt-3" style={{ height: `${chatBoxHeight - 8}vh`, position: 'relative' }}>
      {isLoading ? (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ flexGrow: '1' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Chargement...</span>
          </Spinner>
        </div>
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
                width: '100%', overflow: 'auto', position: 'relative', scrollTop: '100%', flexGrow: '1',
              }}
              className="d-flex flex-column"
              ref={chatBoxRef}
            >
              {localConv.messages.map((message) => (
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
