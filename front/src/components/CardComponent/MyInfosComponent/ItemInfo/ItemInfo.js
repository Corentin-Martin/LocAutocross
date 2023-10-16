import { ListGroup } from 'react-bootstrap';

function ItemInfo({ title, content }) {
  return (
    <ListGroup.Item className="d-flex flex-column">
      <div className="align-self-start fw-bold text-decoration-underline">{title}</div>
      <div className="align-self-end fst-italic">{content}</div>
    </ListGroup.Item>
  );
}

export default ItemInfo;
