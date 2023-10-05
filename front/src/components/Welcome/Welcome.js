import './Welcome.scss';
import Card from 'react-bootstrap/Card';

function Welcome() {
  return (

    <Card className="mb-3 Welcome">
      <Card.Body className="bg-secondary">
        <Card.Text>Bienvenue sur Loc'Autocross !</Card.Text>
        <Card.Text>Vous êtes pilote ou vous souhaitez le devenir ? Vous cherchez
          un véhicule pour une course ou pour une session d'entrainement
          ? Ce site est fait pour vous !
        </Card.Text>
        <Card.Text>Vous êtes un professionnel, vous avez des véhicules à louer,
          vous organisez des sessions de roulage sur votre circuit ?
          Ce site est également fait pour vous !
        </Card.Text>
        <Card.Text>Vous êtes un particulier et cherchez à mettre en location
          votre véhicule pour une ou plusieurs courses dans la saison
          ? Là aussi, ce site est fait pour vous !
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Welcome;
