import GeneralCalendar from '../../components/GeneralCalendar/GeneralCalendar';
import CardText from '../../components/CardText/CardText';
import CalendarText from '../../components/CardText/CalendarText/CalendarText';
import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';

function Calendar() {
  return (
    <GeneralLayout
      title="Calendrier"
      pageTitle="Calendrier"
      description="Découvrez le calendrier de tous les évènements de la saison et réservez une location pour l'épreuve de votre choix !"
      childComponent={(
        <>
          <CardText childComponent={<CalendarText />} />
          <GeneralCalendar />
        </>
    )}
    />

  );
}

export default Calendar;
