import './CardText.scss';
import { Card } from 'react-bootstrap';

function CardText({ childComponent }) {
  return (
    <Card className="mb-3 CardText" style={{ flexGrow: '1' }}>
      <Card.Body className="bg-secondary d-flex flex-column justify-content-center">
        {childComponent}
      </Card.Body>
    </Card>
  );
}

export default CardText;
