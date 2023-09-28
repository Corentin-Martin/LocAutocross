import axios from 'axios';
import { useEffect, useState } from 'react';
import './MyConversations.scss';
import { Accordion, ListGroup, Spinner } from 'react-bootstrap';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Eye } from 'react-bootstrap-icons';

function MyConversations() {
  const [conversations, setConversations] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user.user);

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

                          <ListGroup.Item key={conv.id} className="bg-secondary d-flex flex-column" style={{ cursor: 'pointer' }}>
                            <div>
                              <span className="fw-bold">{(conv.interestedUser === user)
                                ? `${conv.rental.ownerUser.pseudo} ` : `${conv.interestedUser.pseudo} `}
                              </span>- Dernier message reçu le <span className="fst-italic">{moment(conv.messages[0].createdAt).format('DD/MM/YYYY à HH:mm')}</span>
                            </div>

                            <div><span className="text-decoration-underline">Evènement</span> : {conv.rental.event.title} - {conv.rental.event.track.city} - {moment(conv.rental.event.start).format('DD/MM/YYYY')} </div>
                            <div><span className="text-decoration-underline">Véhicule</span> : {conv.rental.vehicle.brand.name}{conv.rental.vehicle.model !== null ? ` - ${conv.rental.vehicle.model} -` : ' - '}{moment(conv.rental.vehicle.year).format('YYYY')}</div>
                            <div className="align-self-end d-flex align-items-center">Voir... <Eye size={16} className="ms-2" /></div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                  )

              )))}
            </Accordion>
            {(conversations.unread.length === 0 && conversations.read.length === 0)
            && <p>Vous n'avez encore jamais entamé de conversations</p>}
          </div>
        )}
    </div>
  );
}

export default MyConversations;
