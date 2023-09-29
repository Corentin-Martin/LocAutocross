import {
  Card, Col, ListGroup, Modal, Spinner,
} from 'react-bootstrap';
import './RentalUserbox.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { Chat } from 'react-bootstrap-icons';
import { setConversation } from '../../../actions/dashboard';

function RentalUserbox({ rental }) {
  const [isLoading, setIsLoading] = useState(true);
  const [localConversation, setlocalConversation] = useState(null);
  const user = useSelector((state) => state.user.user);

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
  }, []);

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
              <Card.Body className="text-start">
                {localConversation !== '' && (
                <div
                  onClick={() => {
                    dispatch(setConversation(localConversation));
                    handleShow();
                  }}
                  style={{ cursor: 'pointer' }}
                ><span className="badge rounded me-2" style={{ backgroundColor: (localConversation.isReadByInterestedUser ? 'green' : 'red') }}>{localConversation.isReadByInterestedUser ? 'Lue' : 'Non lue'}</span> Dernier message le : {moment(localConversation.messages[0].createdAt).format('DD/MM/YYYY à HH:mm')}
                </div>
                )}

              </Card.Body>
            </Card>
          </Col>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
              <Chat test />
              {/* TODO RESOUDRE PROBLEME PASSAGE ATTRIBUTE CI DESSUS */}
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
}

export default RentalUserbox;
