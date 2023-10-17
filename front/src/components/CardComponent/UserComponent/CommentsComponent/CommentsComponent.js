import { Row } from 'react-bootstrap';
import OneComment from './OneComment/OneComment';

function CommentsComponent({ comments }) {
  return (
    <Row className="d-flex justify-content-center align-items-center">
      {comments.map((comment) => (
        <OneComment key={comment.id} comment={comment} />
      ))}
    </Row>
  );
}

export default CommentsComponent;
