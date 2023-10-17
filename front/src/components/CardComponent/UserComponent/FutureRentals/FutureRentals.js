import RentalExtract from '../../../RentalExtract/RentalExtract';

function FutureRentals({ rentals }) {
  return (
    <div>
      {rentals.map((rental) => (
        <RentalExtract key={rental.id} rental={rental} />
      ))}
    </div>
  );
}

export default FutureRentals;
