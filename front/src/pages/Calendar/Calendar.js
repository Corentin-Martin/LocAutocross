import './Calendar.scss';
import Card from 'react-bootstrap/Card';
import GeneralCalendar from '../../components/GeneralCalendar/GeneralCalendar';
import Event from '../../components/Event/Event';

function Calendar() {
  return (
    <div className="Calendar">
      <Card className="mb-3 Welcome">
        <Card.Body className="bg-secondary">
          <Card.Text>Ici, vous trouverez le calendrier de toutes les courses et évenements.
          </Card.Text>
          <Card.Text>Si vous cherchez une location en particulier, vous pouvez affiner
            la recherche en selectionnant la ou les catégorie(s) voulue(s) et le championnat visé.
          </Card.Text>
        </Card.Body>
      </Card>
      <GeneralCalendar />
      <Event />
    </div>
  );
}

export default Calendar;
