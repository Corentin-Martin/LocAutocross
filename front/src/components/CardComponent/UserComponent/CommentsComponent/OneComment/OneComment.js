import moment from 'moment';
import { ListGroup } from 'react-bootstrap';
import Stars from '../../../../Stars/Stars';

function OneComment({ comment }) {
  return (
    <ListGroup variant="flush" className="col-12 col-md-6 text-start m-3 p-3 rounded">
      <ListGroup.Item variant="primary">Par : {comment.associatedUser.pseudo} - Le : {moment(comment.createdAt).format('DD/MM/YYYY à HH:mm')}</ListGroup.Item>
      <ListGroup.Item variant="primary">Commentaire : {comment.content}</ListGroup.Item>
      <ListGroup.Item variant="primary">Note : {comment.rating !== null ? <Stars rating={comment.rating} /> : 'Non noté'}
      </ListGroup.Item>
    </ListGroup>
  );
}

export default OneComment;
