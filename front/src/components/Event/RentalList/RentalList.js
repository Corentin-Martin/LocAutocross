import './RentalList.scss';

function RentalList({ rentals }) {
  return (

    (rentals.length === 0)
      ? (<h3>Pas de locations proposées pour cette épreuve</h3>)
      : (
        <>
          <h3>A louer</h3>
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
      )

  );
}

export default RentalList;
