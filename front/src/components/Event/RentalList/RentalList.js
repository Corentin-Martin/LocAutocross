import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setModalCalendarIsOpen } from '../../../actions/generalCalendar';
import './RentalList.scss';
import { setRental } from '../../../actions/dashboard';

function RentalList({ rentals }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (

    (rentals.length === 0)
      ? (<h3>Pas de locations proposées pour cette épreuve</h3>)
      : (
        <>
          <h3>A louer</h3>
          <p>Cliquez sur une location pour plus d'infos...</p>
          <ul>
            {rentals.map((rental) => (
              <li
                className="RentalList-Li"
                onClick={(() => {
                  navigate(`/location/${rental.id}`);
                  { /* TO DO ENVOYER EVENT */ }
                  dispatch(setRental(rental));
                  dispatch(setModalCalendarIsOpen(false));
                })}
                key={rental.id}
              >

                {rental.vehicle.brand.name} - {rental.vehicle.model}
                ({rental.vehicle.category.map((category, index) => (
                  index === rental.vehicle.category.length - 1 ? `${category.name}`
                    : `${category.name} / `
                ))})
                par {rental.ownerUser.pseudo}. Tarif : {rental.price ? `${rental.price}€` : 'Non renseigné'}
              </li>
            ))}

          </ul>
        </>
      )

  );
}

export default RentalList;
