import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setConversation } from '../../../../../../actions/dashboard';

function AssociatedConversation({ associateConv, handleShow }) {
  const dispatch = useDispatch();

  if (associateConv.exists) {
    return (
      <Card.Text> Vous avez déjà discuté avec.
        <span
          className="badge ms-2 bg-secondary"
          onClick={() => {
            dispatch(setConversation(associateConv.conv[0])); handleShow();
          }}
        >Ouvrir la conversation
        </span>
      </Card.Text>
    );
  }
  return (

    <Card.Text>Vous n'avez jamais discuté avec.
      <span
        className="badge ms-2 bg-secondary"
        onClick={() => {
          handleShow();
        }}
      >Entamer une conversation ?
      </span>
    </Card.Text>

  );
}

export default AssociatedConversation;
