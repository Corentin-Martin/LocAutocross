import './Welcome.scss';
import Card from 'react-bootstrap/Card';

function Welcome() {
  return (

    <Card>
      <Card.Body className="bg-secondary">Bienvenue sur Loc'Autocross, le site qui va vous aider à trouver la location des vos rêves !</Card.Body>
    </Card>
  );
}

export default Welcome;
