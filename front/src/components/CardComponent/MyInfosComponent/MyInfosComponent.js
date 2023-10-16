import { Button, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useState } from 'react';
import ItemInfo from './ItemInfo/ItemInfo';
import DeleteButton from '../../DeleteButton/DeleteButton';
import AxiosPrivate from '../../../utils/AxiosPrivate';
import { setUser } from '../../../actions/user';
import MasterModal from '../../MasterModal/MasterModal';
import RegisterForm from '../../RegisterForm/RegisterForm';

function MyInfosComponent() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [welcomePro, setWelcomePro] = useState(false);

  const handleChangeRole = () => {
    AxiosPrivate.put('user', { roles: ['ROLE_PRO', 'ROLE_USER'] })
      .then((response) => {
        dispatch(setUser(response.data));
        setWelcomePro(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (user === null) {
    return null;
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setShowToParent = (bool) => {
    setShow(bool);
  };

  return (
    <>
      <Card.Body className="col-12 col-md-8 col-lg-6 mx-auto d-flex flex-column justify-content-center align-items-center">
        {welcomePro && (
        <div className="alert alert-success">Votre compte a été bien mis à jour avec le rôle "Pro". Dans votre espace "Mon Bureau", vous
          pouvez désormais créer vos évenèments, véhicules et propositions de location.
        </div>
        )}
        <ListGroup className="text-start col-12">
          <ItemInfo title="Pseudo" content={user.pseudo} />
          <ItemInfo title="Prénom" content={user.firstname} />
          <ItemInfo title="Nom de famille" content={user.lastname} />
          <ItemInfo title="Adresse email" content={user.email} />
          <ItemInfo title="Rôle" content={user.roles.includes('ROLE_PRO') ? 'Pro' : 'Pilote'} />
          <ItemInfo title="Compte créé le" content={moment(user.createdAt).format('DD/MM/YYYY')} />
        </ListGroup>
        <Button type="button" className="mt-3" onClick={handleShow}>Modifier mes informations</Button>
        {!user.roles.includes('ROLE_PRO') && <Button type="button" variant="tertiary" className="mt-3" onClick={handleChangeRole}>Je veux passer au rôle "Pro"</Button>}
        <div className="alert alert-danger col-8 mt-3"><DeleteButton type="user" idToDelete={user.id} text="Supprimer mon compte" /></div>

      </Card.Body>
      <MasterModal
        show={show}
        handleClose={handleClose}
        childComponent={<RegisterForm setShowToParent={setShowToParent} />}
      />
    </>
  );
}

export default MyInfosComponent;
