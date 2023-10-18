import { Card, Carousel } from 'react-bootstrap';
import OneComment from './OneComment/OneComment';

function CommentsComponent({ comments }) {
  if (comments.length === 0) {
    return <Card.Text>Aucune avis pour le moment.</Card.Text>;
  }
  return (

    <Carousel fade className="d-flex justify-content-center align-items-center mt-2 mb-2" style={{ minWidth: '100%' }}>
      {comments.map((comment) => (
        <Carousel.Item key={comment.id} style={{ minWidth: '100%' }} className="d-flex justify-content-center align-items-center bg-primary">
          <OneComment comment={comment} />
        </Carousel.Item>
      ))}
    </Carousel>

  );
}

export default CommentsComponent;
