import './CardText.scss';
import { Card } from 'react-bootstrap';

function CardText({ childComponent, allWidth }) {
  return (
    <Card className={`mb-3 CardText ${allWidth ? 'w-100' : ''}`} style={{ flexGrow: '1' }}>
      <Card.Body className="bg-secondary d-flex flex-column justify-content-center">
        {childComponent}
      </Card.Body>
    </Card>
  );
}

CardText.defaultProps = {
  allWidth: false,
};

export default CardText;
