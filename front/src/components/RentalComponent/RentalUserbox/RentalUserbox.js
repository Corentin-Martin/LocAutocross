import {
  Button,
  Card, Col, Spinner,
} from 'react-bootstrap';
import './RentalUserbox.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { setConversation } from '../../../actions/dashboard';
import ModalChat from '../../ModalChat/ModalChat';
import UserReservationControl from './UserReservationControl/UserReservationControl';
import AxiosPrivate from '../../../utils/AxiosPrivate';

function RentalUserbox({ rental }) {
  const [isLoading, setIsLoading] = useState(true);
  const [localConversation, setlocalConversation] = useState(null);
  const user = useSelector((state) => state.user.user);
  const conversation = useSelector((state) => state.dashboard.conversation);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== null) {
      AxiosPrivate.get(`conversations/location/${rental.id}`)
        .then((res) => {
          setlocalConversation(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [conversation, user]);

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
              <Card.Body className="text-start d-flex flex-column justify-content-center align-items center">

                {moment(rental.event.start) < moment()
                  ? <Card.Text className="alert alert-danger text-center">L'évènement est terminé. Aucune action possible.</Card.Text>
                  : (
                    <>
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
                        rental.status !== '4'
                  && <Button type="button" onClick={() => handleShow()}>Envoyer un message au propriétaire</Button>
                      )}

                      <UserReservationControl rental={rental} />
                    </>
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
