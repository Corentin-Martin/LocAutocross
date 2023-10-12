import {
  Card, Col, ListGroup, Modal,
} from 'react-bootstrap';
import './RentalControl.scss';
import { useDispatch, useSelector } from 'react-redux';
import { PencilSquare } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import DeleteModal from '../../../DeleteModal/DeleteModal';
import {
  setConversation, setElementToDisplay, setElementToEdit, setOpenCreation,
} from '../../../../actions/dashboard';

import ModalChat from '../../../ModalChat/ModalChat';
import ReservationAction from './ReservationAction/ReservationAction';
import RentalCreation from '../../../FormAccordionCreation/RentalCreation/RentalCreation';
import AxiosPrivate from '../../../../utils/AxiosPrivate';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';

function RentalControl({ rental }) {
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [associateConv, setAssociateConv] = useState({});
  const conversation = useSelector((state) => state.dashboard.conversation);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== null && user.roles.includes('ROLE_PRO')) {
      AxiosPrivate.get(`conversations?rental=${rental.id}`)
        .then((res) => {
          setConversations(res.data);

          if (res.data === '') {
            res.data = [];
          }

          const convAssociate = (rental.tenantUser !== null)
            ? res.data.filter((conv) => conv.interestedUser.id === rental.tenantUser.id)
            : [];

          setAssociateConv({
            exists: convAssociate.length > 0,
            conv: convAssociate,
          });

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

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);

  const location = useLocation();

  const handleEditRental = () => {
    dispatch(setElementToEdit(rental));
    if (location.pathname === `/location/${rental.id}`) {
      setShowEdit(true);
    }
    else {
      dispatch(setElementToDisplay(null));

      dispatch(setOpenCreation(true));
    }
  };

  useEffect(() => {
    setShowEdit(false);
  }, [rental]);

  if (user === null || user.id !== rental.ownerUser.id || (!user.roles.includes('ROLE_PRO'))) {
    return null;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (

    <>
      <Col sm={12} className="mb-2">
        <Card>
          <Card.Header>PANNEAU D'ADMINISTRATION</Card.Header>
          <Card.Body className="text-start">
            {moment(rental.event.start) < moment()
              ? (
                <div className="alert alert-danger text-center">
                  <Card.Text>L'évènement est terminé. Aucune action possible.</Card.Text>
                  <Card.Text>{rental.status === '4' ? `Vous avez loué à ${rental.tenantUser.pseudo} pour cette épreuve.` : 'Pas de location effectuée.'}</Card.Text>
                </div>
              )
              : (
                <>
                  <div className="d-flex justify-content-between mb-2">

                    <Card.Text
                      className="d-flex align-items-center"
                      style={{ cursor: 'pointer' }}
                      onClick={handleEditRental}
                    ><PencilSquare size={24} className="me-2" /> Editer
                    </Card.Text>
                    <Card.Text className="d-flex align-items center text-black" style={{ cursor: 'pointer' }}><DeleteModal type="rentals" idToDelete={rental.id} /></Card.Text>
                  </div>

                  <ReservationAction
                    rental={rental}
                    associateConv={associateConv}
                    handleShow={handleShow}
                  />

                  <Card.Text>Conversation{conversations.length > 1 ? 's' : ''} : {conversations.length}</Card.Text>
                  {conversations.length > 0 && (
                  <ListGroup>
                    {conversations.map((conv) => (
                      <ListGroup.Item
                        key={conv.id}
                        onClick={() => {
                          dispatch(setConversation(conv));
                          handleShow();
                        }}
                        style={{ cursor: 'pointer' }}
                      ><span className="badge rounded me-2" style={{ backgroundColor: (conv.isReadByOwnerUser ? 'green' : 'red') }}>{conv.isReadByOwnerUser ? 'Lue' : 'Non lue'}</span>avec {conv.interestedUser.pseudo} - Dernier message le : {moment(conv.messages[conv.messages.length - 1].createdAt).format('DD/MM/YYYY à HH:mm')}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  )}
                </>
              )}

          </Card.Body>
        </Card>
      </Col>

      <ModalChat show={show} handleClose={handleClose} />

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton />
        <Modal.Body>
          <RentalCreation />
        </Modal.Body>
      </Modal>
    </>

  );
}

export default RentalControl;
