import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AxiosPrivate from '../../../utils/AxiosPrivate';
import { setElementToDisplay, setMyVehicles } from '../../../actions/dashboard';

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
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="d-flex flex-column">
      <p>{type === 'vehicles' ? "Vous êtes sur le point de supprimer ce véhicule. Celui-ci sera désactivé et ne pourra plus être proposé à la location. En revanche, il apparaitra toujours dans l'historique de vos locations passées. Confirmez-vous cette action ?" : "Vous êtes sur le point d'effectuer une supression. Confirmez-vous cette action ?" }</p>
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
