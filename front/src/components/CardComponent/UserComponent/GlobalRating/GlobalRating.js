import { Card } from 'react-bootstrap';
import Stars from '../../../Stars/Stars';

function GlobalRating({ rating, number }) {
  if (rating === null) {
    <Card.Text className="text-center fs-3">Non noté</Card.Text>;
  }
  return (
    <>
      <Stars rating={rating} />
      <Card.Text className="text-center mt-1 mb-1 fs-3">{rating}</Card.Text>
      <Card.Text className="text-center fst-italic">{number} avis</Card.Text>
    </>
  );
}

export default GlobalRating;
