import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ItemInfo({ title, content }) {
  return (
    <ListGroup.Item className="d-flex flex-column">
      <div className="align-self-start fw-bold text-decoration-underline">{title}</div>
      <div className="align-self-end fst-italic">{content}</div>
    </ListGroup.Item>
  );
}

ItemInfo.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default ItemInfo;
