import './ModalCalendar.scss';

function ModalCalendar({ event }) {
  return (
    <>
      <h1>{event.title}</h1>
      <h2>{event.description}</h2>
      <h3>Circuit :</h3>
      <ul>
        <li>{event.track.name}</li>
        <li>{event.track.city}</li>
      </ul>
      <h3> Locations disponibles</h3>
      <ul>
        {event.rentals.map((rental) => (
          <li key={rental.id}>{rental.vehicle.brand.name} - {rental.vehicle.model}
            , par {rental.ownerUser.pseudo}. Prix : {rental.price}€
          </li>
        ))}
      </ul>

    </>
  );
}

export default ModalCalendar;
