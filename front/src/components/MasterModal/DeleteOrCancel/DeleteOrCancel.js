import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AxiosPrivate from '../../../utils/AxiosPrivate';
import { setElementToDisplay, setMyVehicles } from '../../../actions/dashboard';
import {
  setResetToken, setToken, setUser, setUserConnected,
} from '../../../actions/user';

function DeleteOrCancel({
  type, handleClose, idToDelete, setShowToParent,
}) {
  const vehicles = useSelector((state) => state.dashboard.myVehicles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    AxiosPrivate.delete(`${type}/${idToDelete}`)
      .then(() => {
        const newVehicles = vehicles.filter((vehicle) => vehicle.id !== idToDelete);
        dispatch(setMyVehicles(newVehicles));
        dispatch(setElementToDisplay(null));
        setShowToParent(false);

        if (type === 'rentals') {
          navigate('/mes-locations');
        }
        if (type === 'events') {
          navigate('/mes-evenements');
        }

        if (type === 'user') {
          dispatch(setUser(null));
          dispatch(setUserConnected(false));
          dispatch(setToken(null));
          dispatch(setResetToken(null));
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          navigate('/');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const message = {
    vehicles: "Vous êtes sur le point de supprimer ce véhicule. Celui-ci sera désactivé et ne pourra plus être proposé à la location. En revanche, il apparaitra toujours dans l'historique de vos locations passées. Confirmez-vous cette action ?",
    user: "Vous êtes sur le point de supprimer définitivement votre compte. Après avoir cliqué, vous ne pourrez plus revenir en arrière, vous n'aurez plus accès à votre profil, vos conversations et vos locations. Confirmez-vous cette action ?",
  };

  return (
    <div className="d-flex flex-column">
      <p>{message[type] ?? "Vous êtes sur le point d'effectuer une supression. Confirmez-vous cette action ?" }</p>
      <div className="d-flex justify-content-around">
        <Button variant="secondary" onClick={handleClose}>
          Non !
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Oui, je veux supprimer
        </Button>
      </div>
    </div>
  );
}

export default DeleteOrCancel;
