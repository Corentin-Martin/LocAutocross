import {
  Card, Col, ListGroup, Spinner,
} from 'react-bootstrap';
import './RentalControl.scss';
import { useSelector } from 'react-redux';
import { PencilSquare } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import DeleteModal from '../../DeleteModal/DeleteModal';

function RentalControl({ rental }) {
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/conversations?rental=${rental.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        setConversations(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  if (user === null || (!user.roles.includes('ROLE_PRO'))) {
    return null;
  }
  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <Col sm={12} className="mb-2">
          <Card>
            <Card.Header>PANNEAU D'ADMINISTRATION</Card.Header>
            <Card.Body className="text-start">
              <div className="d-flex justify-content-between mb-2">

                <Card.Text className="d-flex align-items-center" style={{ cursor: 'pointer' }}><PencilSquare size={24} className="me-2" /> Editer</Card.Text>
                <Card.Text className="d-flex align-items center text-black" style={{ cursor: 'pointer' }}><DeleteModal type="rentals" idToDelete={rental.id} /></Card.Text>
              </div>
              <Card.Text>Conversation{conversations.length > 1 ? 's' : ''} : {conversations.length}</Card.Text>
              {conversations.length > 0 && (
              <ListGroup>
                {conversations.map((conv) => (
                  <ListGroup.Item key={conv.id}><span className="badge rounded me-2" style={{ backgroundColor: (conv.isReadByOwnerUser === 0 ? 'red' : 'green') }}>{conv.isReadByOwnerUser === 0 ? 'Non lue' : 'Lue'}</span>avec {conv.interestedUser.pseudo} - Dernier message le : {moment(conv.messages[0].createdAt).format('DD/MM/YYYY à HH:mm')} </ListGroup.Item>
                ))}
              </ListGroup>
              )}

            </Card.Body>
          </Card>
        </Col>
      )}
    </div>
  );
}

export default RentalControl;
