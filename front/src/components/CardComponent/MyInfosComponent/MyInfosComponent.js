import { Button, Card, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ItemInfo from './ItemInfo/ItemInfo';
import DeleteButton from '../../DeleteButton/DeleteButton';

function MyInfosComponent() {
  const user = useSelector((state) => state.user.user);

  if (user === null) {
    return null;
  }

  return (
    <Card.Body className="col-12 col-md-8 col-lg-6 mx-auto d-flex flex-column justify-content-center align-items-center">
      <ListGroup className="text-start col-12">
        <ItemInfo title="Pseudo" content={user.pseudo} />
        <ItemInfo title="Prénom" content={user.firstname} />
        <ItemInfo title="Nom de famille" content={user.lastname} />
        <ItemInfo title="Adresse email" content={user.email} />
        <ItemInfo title="Rôle" content={user.roles.includes('ROLE_PRO') ? 'Pro' : 'Pilote'} />
        <ItemInfo title="Compte créé le" content={moment(user.createdAt).format('DD/MM/YYYY')} />
      </ListGroup>
      <Button type="button" className="mt-3">Modifier mes informations</Button>
      <div className="alert alert-danger col-8 mt-3"><DeleteButton type="user" idToDelete={user.id} text="Supprimer mon compte" /></div>

    </Card.Body>
  );
}

export default MyInfosComponent;
