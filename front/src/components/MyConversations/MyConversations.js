import { useEffect, useState } from 'react';
import './MyConversations.scss';
import { Accordion, ListGroup, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ConversationPreview from './ConversationPreview/ConversationPreview';
import AxiosPrivate from '../../utils/AxiosPrivate';

function MyConversations() {
  const [conversations, setConversations] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const conversation = useSelector((state) => state.dashboard.conversation);

  useEffect(() => {
    AxiosPrivate.get('conversations')
      .then((response) => {
        setConversations(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [conversation === null]);

  return (
    <div className="d-flex flex-column align-items-center col-12 mt-3">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      )
        : (
          <div className="col-12">
            {((conversations.unread.length > 0 && conversations.read.length > 0)
            || (conversations.unread.length > 0 && conversations.read.length === 0)
            || (conversations.unread.length === 0 && conversations.read.length > 0))
            && (
            <Accordion defaultActiveKey={Object.entries(conversations)[0][1].length > 0 ? Object.entries(conversations)[0][1][0].id : '0'} className="col-12">
              {(Object.entries(conversations).map((readOrUnread) => (
                <div key={readOrUnread}>
                  {readOrUnread[1].length > 0
                    ? (
                      <Accordion.Item
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
                    ) : (
                      <Accordion.Item>
                        <Accordion.Header>Aucune conversation {readOrUnread[0] === 'unread' ? 'non' : ''} lue</Accordion.Header>
                      </Accordion.Item>
                    )}

                </div>

              )))}
            </Accordion>
            )}
            {(conversations.unread.length === 0 && conversations.read.length === 0)
            && <p className="text-center">Vous n'avez encore jamais entamé de conversation</p>}
          </div>
        )}
    </div>
  );
}

export default MyConversations;
