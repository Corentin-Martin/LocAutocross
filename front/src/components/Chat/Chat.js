import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import './Chat.scss';

function Chat() {
  const { id } = useParams();
  const [conversation, setConversation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const getMessages = () => {
    axios.get(`http://localhost:8000/api/conversations/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setConversation(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(
    () => {
      getMessages();
      const intervalMessages = setInterval(getMessages, 2500);

      return () => {
        clearInterval(intervalMessages);
      };
    },
    [],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(
      `http://localhost:8000/api/messages/${id}`,
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
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {isLoading ? <p>Chargement... </p>
        : (
          <>
            {conversation.messages.map((message) => (
              <div className="Chat-Message" key={message.id}>
                <p>De : {message.user.pseudo} - Le : {moment(message.createdAt).format('DD/MM/YYYY HH:mm:ss')}</p>
                <p>Message : {message.content}</p>
              </div>
            ))}
          </>
        )}

      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => {
            setContent(event.currentTarget.value);
          }}
          type="text"
          value={content}
          placeholder="Votre message..."
        />
        <button type="submit">Envoyer votre message</button>
      </form>
      <button
        type="button"
        onClick={() => {
          navigate('/');
        }}
      >Go
      </button>
    </div>

  );
}

export default Chat;
