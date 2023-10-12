import moment from 'moment';
import { Card } from 'react-bootstrap';

function DatesInfos({ start, end }) {
  moment.locale('fr');
  return (
    <>
      <Card.Text>Début : {moment(start).format('DD MMMM YYYY - HH:mm')}</Card.Text>
      <Card.Text>Fin : {moment(end).format('DD MMMM YYYY - HH:mm')}</Card.Text>
    </>
  );
}

export default DatesInfos;
