import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setModalCalendarIsOpen } from '../../../actions/generalCalendar';
import './RentalList.scss';

function RentalList({ rentals }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (

    (rentals.length === 0)
      ? (<h3>Pas de locations proposées pour cette épreuve</h3>)
      : (
        <>
          <h3>A louer</h3>
          <ul>
            {rentals.map((rental) => (
              <li
                className="RentalList-Li"
                onClick={(() => {
                  navigate(`location/${rental.id}`); dispatch(setModalCalendarIsOpen(false));
                })}
                key={rental.id}
              >
                {rental.vehicle.category.map((category) => (
                  ` ${category.name} /`
                ))} {rental.vehicle.brand.name} - {rental.vehicle.model}.
                Propriétaire : {rental.ownerUser.pseudo}. Tarif : {rental.price}€
              </li>
            ))}

          </ul>
        </>
      )

  );
}

export default RentalList;
