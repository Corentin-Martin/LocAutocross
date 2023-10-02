import { Modal } from 'react-bootstrap';
import './ModalChat.scss';
import Chat from '../Chat/Chat';

function ModalChat({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton />
      <Modal.Body>
        <Chat noCloseButton />
      </Modal.Body>
    </Modal>
  );
}

export default ModalChat;
