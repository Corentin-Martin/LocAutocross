import { Star, StarFill, StarHalf } from 'react-bootstrap-icons';

function Stars({ rating }) {
  const starElements = [];

  for (let i = 0; i < Math.floor(rating); i += 1) {
    starElements.push(<StarFill key={`star-${i}`} />);
  }

  if (rating % 1 >= 0.25) {
    starElements.push(<StarHalf key="star-half" />);
  }

  const emptyStarsLength = 5 - starElements.length;
  for (let i = 0; i < emptyStarsLength; i += 1) {
    starElements.push(<Star key={`star-empty-${i}`} />);
  }

  return (
    <div>
      { starElements }
    </div>
  );
}

export default Stars;
