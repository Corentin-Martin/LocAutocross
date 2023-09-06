import './Event.scss';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setModalCalendarIsOpen } from '../../actions/generalCalendar';

function Event({
  title, description, start, end, rentals, track, championship,
}) {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setModalCalendarIsOpen(false));
  };

  console.log(useSelector((state) => state.generalCalendar.modalCalendarIsOpen));

  console.log(rentals);
  return (
    <div className="Event">
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
        <li>Début : {start}</li>
        <li>Fin : {end}</li>
      </ul>
      <br />
      {championship !== null
      && (
      <>
        <h3>Championnat</h3>
        <ul>
          <li>Nom : {championship.name}</li>
          <li> Diminutif : {championship.alias}</li>
          <li> Fédération : {championship.federation.alias}</li>
        </ul>
        <br />
      </>
      )}
      {rentals.length > 0 ? (
        <>
          <h3>Locations disponibles</h3>
          <ul>
            {rentals.map((rental) => (
              <li key={rental.id}>
                {rental.vehicle.category.map((category) => (
                  ` ${category.name} /`
                ))} {rental.vehicle.brand.name} - {rental.vehicle.model}.
                Propriétaire : {rental.ownerUser.pseudo}. Tarif : {rental.price}€
              </li>
            ))}

          </ul>
        </>
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
