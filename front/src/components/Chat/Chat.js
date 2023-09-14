import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import './Chat.scss';

function Chat() {
  const { id } = useParams();
  const [conversation, setConversation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState('');

  useEffect(() => {
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
  }, [isLoading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
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
        setIsLoading(false);
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
              <div key={message.id}>
                <p>Auteur : {message.user.pseudo}</p>
                <p>Date : {moment(message.createdAt).format('DD/MM/YYYY HH:mm:ss')}</p>
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
    </div>

  );
}

export default Chat;
