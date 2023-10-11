import './CardText.scss';
import { Card } from 'react-bootstrap';

function CardText({ childComponent }) {
  return (
    <Card className="mb-3 CardText">
      <Card.Body className="bg-secondary">
        {childComponent}
      </Card.Body>
    </Card>
  );
}

export default CardText;
