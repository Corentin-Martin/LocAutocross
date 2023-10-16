import moment from 'moment';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function DatesInfos({ start, end }) {
  moment.locale('fr');
  return (
    <>
      <Card.Text>Début : {moment(start).format('DD MMMM YYYY - HH:mm')}</Card.Text>
      <Card.Text>Fin : {moment(end).format('DD MMMM YYYY - HH:mm')}</Card.Text>
    </>
  );
}

DatesInfos.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
};

export default DatesInfos;
