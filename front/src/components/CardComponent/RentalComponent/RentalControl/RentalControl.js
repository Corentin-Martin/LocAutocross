import {
  Card,
} from 'react-bootstrap';
import './RentalControl.scss';
import { useDispatch, useSelector } from 'react-redux';
import { PencilSquare } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteButton from '../../../DeleteButton/DeleteButton';
import {
  setElementToDisplay, setElementToEdit, setOpenCreation,
} from '../../../../actions/dashboard';

import ReservationAction from './ReservationAction/ReservationAction';
import RentalCreation from '../../../FormAccordionCreation/RentalCreation/RentalCreation';
import AxiosPrivate from '../../../../utils/AxiosPrivate';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import MasterModal from '../../../MasterModal/MasterModal';
import Chat from '../../../Chat/Chat';
import ConversationsPreview from './ConversationsPreview/ConversationsPreview';

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

  const setShowToParent = (bool) => {
    setShow(bool);
  };

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (rental.event.isCancelled) {
    return <div className="alert alert-danger text-center"><Card.Text>L'évènement est annulé, aucune action possible.</Card.Text></div>;
  }

  if (moment(rental.event.start) < moment()) {
    return (
      <div className="alert alert-danger text-center">
        <Card.Text>L'évènement est terminé. Aucune action possible.</Card.Text>
        <Card.Text>{rental.status === '4' ? `Vous avez loué à ${rental.tenantUser.pseudo} pour cette épreuve.` : 'Pas de location effectuée.'}</Card.Text>
      </div>
    );
  }

  return (

    <>

      <div className="d-flex justify-content-between mb-2">
        <Card.Text
          className="d-flex align-items-center"
          style={{ cursor: 'pointer' }}
          onClick={handleEditRental}
        ><PencilSquare size={24} className="me-2" /> Editer
        </Card.Text>
        <div className="d-flex align-items center text-black" style={{ cursor: 'pointer' }}>
          <DeleteButton type="rentals" idToDelete={rental.id} />
        </div>
      </div>

      <ReservationAction
        rental={rental}
        associateConv={associateConv}
        handleShow={handleShow}
      />

      <ConversationsPreview
        conversations={conversations}
        setShowToParent={setShowToParent}
      />

      <MasterModal
        show={show}
        handleClose={handleClose}
        childComponent={<Chat noCloseButton />}
      />

      <MasterModal
        show={showEdit}
        handleClose={handleCloseEdit}
        childComponent={<RentalCreation />}
      />

    </>

  );
}

RentalControl.propTypes = {
  rental: PropTypes.object.isRequired,
};

export default RentalControl;
