import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import AxiosPrivate from '../../../../../utils/AxiosPrivate';
import LoadingSpinner from '../../../../LoadingSpinner/LoadingSpinner';
import { setConversation } from '../../../../../actions/dashboard';
import MasterModal from '../../../../MasterModal/MasterModal';
import Chat from '../../../../Chat/Chat';

function UserConversationControl({ rental }) {
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (localConversation === '' && rental.status < 4) {
    return (
      <>
        <Button type="button" className="col-12" onClick={() => handleShow()}>Envoyer un message au propriétaire</Button>
        <MasterModal
          show={show}
          handleClose={handleClose}
          childComponent={<Chat noCloseButton />}
        />
      </>
    );
  }
  return (
    <>
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
          Dernier message le {moment(localConversation.messages[localConversation.messages.length - 1].createdAt).format('DD/MM/YYYY à HH:mm')}
        </p>
        <div className="badge rounded bg-primary col-8">{localConversation.isReadByInterestedUser ? 'Ecrire' : 'Voir'}</div>
      </div>

      <MasterModal
        show={show}
        handleClose={handleClose}
        childComponent={<Chat noCloseButton />}
      />
    </>
  );
}

export default UserConversationControl;
