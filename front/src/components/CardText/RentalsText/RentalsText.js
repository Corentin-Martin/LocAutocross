import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function RentalsText() {
  return (
    <>
      <Card.Text>Retrouvez ici toutes les locations disponibles sur le site !</Card.Text>
      <Card.Text>
        Pour une recherche affinée selon vos critères, rendez-vous
        sur les pages <Link className="text-decoration-none fw-bold fst-italic" to="/calendrier">Calendrier</Link> ou <Link to="/circuits" className="text-decoration-none fw-bold fst-italic">Circuits</Link>.
      </Card.Text>
    </>
  );
}

export default RentalsText;
