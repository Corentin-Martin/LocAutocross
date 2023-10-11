import { Badge, Modal } from 'react-bootstrap';

function ModalRoleChoice({ show, handleClose, sendRoleToParent }) {
  const handleClick = (role) => {
    sendRoleToParent(role);
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Quel rôle choisir ?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">Si vous êtes un particulier souhaitant mettre son véhicule en location pour une ou plusieurs épreuves
        <br />ou
        <br />
        un professionnel proposant des véhicules à la
        location et/ou organisant des évenèments sur circuits :
        <br />
        <h3>
          <Badge
            bg="tertiary mt-2"
            onClick={() => {
              handleClick(['ROLE_PRO']);
            }}
          >
            Sélectionnez le rôle <span className="fw-bold">PRO</span>
          </Badge>
        </h3>
        <hr />
        Si vous êtes un pilote à la recherche d'une location pour une ou plusieurs épreuves :
        <br />
        <h3>
          <Badge
            bg="tertiary mt-2"
            onClick={() => {
              handleClick(['ROLE_USER']);
            }}
          >
            Sélectionnez le rôle <span className="fw-bold">PILOTE</span>
          </Badge>
        </h3>

      </Modal.Body>
    </Modal>
  );
}

export default ModalRoleChoice;
