import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import moment from 'moment';
import RentalComponent from '../../components/CardComponent/RentalComponent/RentalComponent';
import { setElementToDisplay } from '../../actions/dashboard';
import AxiosPublic from '../../utils/AxiosPublic';
import CardComponent from '../../components/CardComponent/CardComponent';
import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function Rental() {
  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);
  const { rentalId } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (elementToDisplay === null) {
      AxiosPublic.get(`rentals/${rentalId}`)
        .then((response) => {
          dispatch(setElementToDisplay(response.data));
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    else {
      setIsLoading(false);
    }
  }, [location.pathname]);

  // eslint-disable-next-line no-prototype-builtins
  if (elementToDisplay !== null && location.pathname === `/location/${rentalId}` && !elementToDisplay.hasOwnProperty('tenantUser')) {
    dispatch(setElementToDisplay(null));
    setIsLoading(true);
    return <LoadingSpinner />;
  }

  if (elementToDisplay === null && isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <GeneralLayout
      pageTitle={`Proposition de location pour ${elementToDisplay.event.title !== null ? `${elementToDisplay.event.title} - ` : ''}${elementToDisplay.event.track.city} - ${elementToDisplay.vehicle.brand.name} ${moment(elementToDisplay.vehicle.brand.year).format('YYYY')}`}
      description={`Proposition de location pour ${elementToDisplay.event.title !== null ? `${elementToDisplay.event.title} - ` : ''}${elementToDisplay.event.track.city} - ${elementToDisplay.vehicle.brand.name} ${moment(elementToDisplay.vehicle.brand.year).format('YYYY')}`}
      childComponent={(

        <CardComponent
          childComponent={<RentalComponent rental={elementToDisplay} />}
        />
        )}

    />

  );
}

export default Rental;
