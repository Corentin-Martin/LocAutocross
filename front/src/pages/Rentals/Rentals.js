import AllRentals from '../../components/AllRentals/AllRentals';
import CardText from '../../components/CardText/CardText';
import RentalsText from '../../components/CardText/RentalsText/RentalsText';
import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';

function Rentals() {
  return (
    <GeneralLayout
      title="Les locations"
      pageTitle="Les locations"
      description="Découvrez toutes les locations de France et réservez celle de votre choix !"
      childComponent={(
        <>
          <CardText childComponent={<RentalsText />} />
          <AllRentals />
        </>
  )}
    />
  );
}

export default Rentals;
