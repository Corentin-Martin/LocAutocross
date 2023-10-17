import { Card } from 'react-bootstrap';
import { Star, StarFill } from 'react-bootstrap-icons';

function GlobalRating({ rating }) {
  return (
    <>
      <div>
        {[1, 2, 3, 4, 5].map((value) => {
          if (rating >= value) {
            return <StarFill className="me-1" key={value} />;
          }
          return (
            <Star
              key={value}
              className="me-1"
            />
          );
        })}
      </div>
      <Card.Text className="text-center mt-2 fs-3">{rating}</Card.Text>
    </>
  );
}

export default GlobalRating;
