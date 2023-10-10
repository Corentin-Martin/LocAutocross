import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setOpenModalCreation } from '../../actions/dashboard';

function ModalCreation({ childComponent }) {
  const dispatch = useDispatch();
  return (
    <Modal show onHide={() => dispatch(setOpenModalCreation(false))}>
      <Modal.Header closeButton>
        <Modal.Title>Nouvelle marque</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {childComponent}
      </Modal.Body>

    </Modal>
  );
}

export default ModalCreation;
