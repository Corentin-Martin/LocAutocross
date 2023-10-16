import { Modal } from 'react-bootstrap';

function MasterModal({
  show, handleClose, childComponent, title,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        {title !== null && <Modal.Title>{title}</Modal.Title>}
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        {childComponent}
      </Modal.Body>
    </Modal>
  );
}

MasterModal.defaultProps = {
  title: null,
};

export default MasterModal;
