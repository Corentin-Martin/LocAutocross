import axios from 'axios';
import { useEffect, useState } from 'react';
import './MyConversations.scss';
import { Accordion, ListGroup, Spinner } from 'react-bootstrap';
import ConversationPreview from './ConversationPreview/ConversationPreview';

function MyConversations() {
  const [conversations, setConversations] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/conversations', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setConversations(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="d-flex flex-column align-items-center col-12 col-md-8 mt-3">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      )
        : (
          <div className="col-12">
            <Accordion defaultActiveKey="0" className="col-12">
              {(Object.entries(conversations).map((readOrUnread) => (

                (readOrUnread[1].length > 0)
                  && (
                  <Accordion.Item
                    key={readOrUnread[1][0].id}
                    eventKey={readOrUnread[1][0].id}
                  >
                    <Accordion.Header>Conversation{readOrUnread[1].length > 1 ? 's' : ''} {readOrUnread[0] === 'unread' ? 'non' : ''} lue{readOrUnread[1].length > 1 ? 's' : ''}</Accordion.Header>
                    <Accordion.Body>
                      <ListGroup className="col-12">
                        {readOrUnread[1].map((conv) => (

                          <ConversationPreview key={conv.id} conv={conv} />

                        ))}
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                  )

              )))}
            </Accordion>
            {(conversations.unread.length === 0 && conversations.read.length === 0)
            && <p>Vous n'avez encore jamais entamé de conversation</p>}
          </div>
        )}
    </div>
  );
}

export default MyConversations;
