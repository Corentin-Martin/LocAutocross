import { useState } from 'react';
import { TrashFill } from 'react-bootstrap-icons';
import MasterModal from '../MasterModal/MasterModal';
import DeleteOrCancel from '../MasterModal/DeleteOrCancel/DeleteOrCancel';

function DeleteModal({ type, idToDelete, text }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setShowToParent = (bool) => {
    setShow(bool);
  };

  return (
    <>
      <div onClick={handleShow}>
        <TrashFill
          size={24}
          className="text-black me-2"
        /> {text ?? ''}
      </div>

      <MasterModal
        show={show}
        handleClose={handleClose}
        title="Attention"
        childComponent={(
          <DeleteOrCancel
            type={type}
            handleClose={handleClose}
            idToDelete={idToDelete}
            setShowToParent={setShowToParent}
          />
)}
      />

    </>
  );
}

DeleteModal.defaultProps = {
  text: null,
};

export default DeleteModal;
