import axios from 'axios';
import './DeleteModal.scss';
import { useState } from 'react';
import { TrashFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setMyVehicles, setVehicleForDetails } from '../../actions/dashboard';

function DeleteModal({ type, idToDelete }) {
  const [show, setShow] = useState(false);
  const vehicles = useSelector((state) => state.dashboard.myVehicles);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const handleDelete = () => {
    axios.delete(
      `http://localhost:8000/api/${type}/${idToDelete}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },

    )
      .then(() => {
        dispatch(setVehicleForDetails(null));
        const newVehicles = vehicles.filter((vehicle) => vehicle.id !== idToDelete);
        dispatch(setMyVehicles(newVehicles));
        setShow(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>

      <TrashFill
        size={24}
        className="text-black"
        onClick={handleShow}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Attention ! </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {type === 'vehicles' ? "Vous êtes sur le point de supprimer ce véhicule. Celui-ci sera désactivé et ne pourra plus être proposé à la location. En revanche, il apparaitra toujours dans l'historique de vos locations passées. Confirmez-vous cette action ?" : "Vous êtes sur le point d'effectuer une supression. Confirmez-vous cette action ?" }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Non !
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Oui, je veux supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
