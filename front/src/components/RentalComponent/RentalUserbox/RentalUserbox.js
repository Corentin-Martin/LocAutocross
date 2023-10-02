import {
  Button,
  Card, Col, Spinner,
} from 'react-bootstrap';
import './RentalUserbox.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import { setConversation } from '../../../actions/dashboard';
import ModalChat from '../../ModalChat/ModalChat';

function RentalUserbox({ rental }) {
  const [isLoading, setIsLoading] = useState(true);
  const [localConversation, setlocalConversation] = useState(null);
  const user = useSelector((state) => state.user.user);
  const conversation = useSelector((state) => state.dashboard.conversation);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== null) {
      axios.get(`http://localhost:8000/api/conversations/location/${rental.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          setlocalConversation(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [conversation]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (user === null || user.id === rental.ownerUser.id) {
    return null;
  }

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <>
          <Col sm={12} className="mb-2">
            <Card>
              <Card.Header>PANNEAU UTILISATEUR</Card.Header>
              <Card.Body className="text-start d-flex justify-content-center">
                {localConversation !== '' ? (
                  <div
                    style={{ border: '1px solid #dee2e6', padding: '0.5rem 1rem', cursor: 'pointer' }}
                    className="d-flex flex-column justify-content-center align-items-center"
                    onClick={() => {
                      dispatch(setConversation(localConversation));
                      handleShow();
                    }}
                  >
                    <h5>Conversation :</h5>
                    <div className="badge rounded" style={{ backgroundColor: (localConversation.isReadByInterestedUser ? 'green' : 'red') }}>
                      {localConversation.isReadByInterestedUser ? 'Lue' : 'Non lue'}
                    </div>
                    <p style={{ margin: '0.5rem auto' }}>
                      Dernier message le {moment(localConversation.messages[0].createdAt).format('DD/MM/YYYY à HH:mm')}
                    </p>
                    <div className="badge rounded bg-primary col-8">{localConversation.isReadByInterestedUser ? 'Ecrire' : 'Voir'}</div>
                  </div>
                ) : (
                  <Button type="button" onClick={() => handleShow()}>Envoyer un message au propriétaire</Button>
                )}

              </Card.Body>
            </Card>
          </Col>

          <ModalChat show={show} handleClose={handleClose} />
        </>
      )}
    </div>
  );
}

export default RentalUserbox;
