import {
  Button,
  Card, Col, Spinner,
} from 'react-bootstrap';
import './RentalUserbox.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import { setConversation, setRental } from '../../../actions/dashboard';
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

  const handleChangeStatus = (number) => {
    const newStatus = parseInt(rental.status, 10) + number;
    axios.put(`http://localhost:8000/api/rentals/book/${rental.id}`, {
      status: newStatus,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        dispatch(setRental(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
              <Card.Body className="text-start d-flex flex-column justify-content-center align-items center">
                {localConversation !== '' ? (
                  <div
                    style={{ border: '1px solid #dee2e6', padding: '0.5rem 1rem', cursor: 'pointer' }}
                    className="d-flex flex-column justify-content-center align-items-center col-12"
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

                <div
                  style={{ border: '1px solid #dee2e6', padding: '0.5rem 1rem', cursor: 'pointer' }}
                  className="d-flex flex-column justify-content-center align-items-center col-12 mt-3"
                >
                  <h5>Réservation :</h5>
                  {rental.tenantUser === null && (
                  <>
                    <Button type="button" onClick={() => handleChangeStatus(1)}>Se postionner comme interessé</Button>
                    <Button type="button" onClick={() => handleChangeStatus(2)}>Envoyer une demande de réservation</Button>
                  </>
                  )}
                  {(rental.tenantUser !== null && rental.tenantUser.id !== user.id)
                  && (
                  <div>
                    {rental.status !== '4' ? "Quelqu'un est déjà interessé, vous ne pouvez pas faire de demande de réservation. En revanche, vous pouvez toujours envoyer un message au propriétaire." : 'Déjà réservé. Aucune action possible'}
                  </div>
                  )}
                  {rental.tenantUser !== null && rental.tenantUser.id === user.id
                  && (
                  <>
                    {rental.status === '1' && (
                    <>
                      <Button type="button" onClick={() => handleChangeStatus(1)}>Se postionner comme interessé</Button>
                      <Button type="button" onClick={() => handleChangeStatus(2)}>Envoyer une demande de réservation</Button>
                    </>
                    )}
                    {rental.status === '2' && (
                    <>
                      <Button type="button" onClick={() => handleChangeStatus(-1)}>Plus interessé</Button>
                      <Button type="button" onClick={() => handleChangeStatus(+1)}>Envoyer une demande de réservation</Button>
                    </>
                    )}
                    {rental.status === '3' && (
                    <Button type="button" onClick={() => handleChangeStatus(-2)}>Plus interessé</Button>
                    )}
                    {rental.status === '4' && (
                    <Button type="button" onClick={() => handleChangeStatus(-3)}>Plus interessé</Button>
                    )}
                  </>
                  )}
                </div>

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
