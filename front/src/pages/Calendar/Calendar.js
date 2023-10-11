import './Calendar.scss';
import GeneralCalendar from '../../components/GeneralCalendar/GeneralCalendar';
import CardText from '../../components/CardText/CardText';
import CalendarText from '../../components/CardText/CalendarText/CalendarText';

function Calendar() {
  return (
    <div className="Calendar">
      <CardText childComponent={<CalendarText />} />
      <GeneralCalendar />
    </div>
  );
}

export default Calendar;
