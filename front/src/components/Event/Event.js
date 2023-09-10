import './Event.scss';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { setModalCalendarIsOpen } from '../../actions/generalCalendar';
import RentalList from './RentalList/RentalList';

function Event({
  title, description, start, end, rentals, track, championship,
}) {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setModalCalendarIsOpen(false));
  };
  const [federation, setFederation] = useState([]);

  useEffect(() => {
    if (championship !== null) {
      axios.get(`http://localhost:8000/api/championships/${championship.id}`)
        .then((response) => {
          setFederation(response.data.federation);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [championship]);

  return (
    <div className="Event" style={{ backgroundColor: (championship !== null) ? championship.color : '#ffcd61' }}>

      <button type="button" onClick={closeModal} className="Event-Button">X</button>
      <h1>{title}</h1>
      {description !== null && <h2>{description}</h2>}
      <br />
      <h3>Circuit</h3>
      <ul>
        <li>Nom : {track.name}</li>
        <li>Ville : {track.city}</li>
        <li>Département : {track.department}</li>
      </ul>
      <br />
      <h3>Dates</h3>
      <ul>
        <li>Début : {moment(start).format('DD/MM/YYYY')}</li>
        <li>Fin : {moment(end).format('DD/MM/YYYY')}</li>
      </ul>
      <br />
      {championship !== null
      && (
      <>
        <h3>Championnat</h3>
        <ul>
          <li>Nom : {championship.name}</li>
          <li> Diminutif : {championship.alias}</li>
          <li> Fédération : {federation.alias}</li>
        </ul>
        <br />
      </>
      )}
      {rentals.length > 0 ? (
        <RentalList
          rentals={rentals.filter((rental) => (rental.status > 0 && rental.status < 5))}
        />

      ) : <h3>Pas de locations proposées pour cette épreuve</h3>}

    </div>
  );
}

export default Event;

Event.defaultProps = {
  description: null,
  championship: null,
};

Event.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  rentals: PropTypes.array.isRequired,
  track: PropTypes.object.isRequired,
  championship: PropTypes.object,
};
