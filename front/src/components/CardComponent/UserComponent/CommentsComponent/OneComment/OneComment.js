import moment from 'moment';
import { Card } from 'react-bootstrap';

function OneComment({ comment }) {
  return (
    <Card className="m-1" style={{ width: '45%', flexGrow: '1' }}>
      <Card.Body className="col-12">
        <Card.Text>Auteur : {comment.associatedUser.pseudo}</Card.Text>
        <Card.Text>Le : {moment(comment.createdAt).format('DD/MM/YYYY à HH:mm')}</Card.Text>
        <Card.Text>Commentaire : {comment.content}</Card.Text>
        <Card.Text>Note : {comment.rating ?? 'Non noté'}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default OneComment;
