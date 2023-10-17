import moment from 'moment';
import { ListGroup } from 'react-bootstrap';
import { Star, StarFill } from 'react-bootstrap-icons';

function OneComment({ comment }) {
  return (
    <ListGroup variant="flush" className="col-12 col-md-6 text-start m-3 p-3 rounded">
      <ListGroup.Item variant="primary">Par : {comment.associatedUser.pseudo} - Le : {moment(comment.createdAt).format('DD/MM/YYYY à HH:mm')}</ListGroup.Item>
      <ListGroup.Item variant="primary">Commentaire : {comment.content}</ListGroup.Item>
      <ListGroup.Item variant="primary">Note : {comment.rating !== null ? [1, 2, 3, 4, 5].map((value) => {
        if (comment.rating >= value) {
          return <StarFill className="me-1" key={value} />;
        }
        return (
          <Star
            key={value}
            className="me-1"
          />
        );
      }) : 'Non noté'}
      </ListGroup.Item>
    </ListGroup>
  );
}

export default OneComment;
