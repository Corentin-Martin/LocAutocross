import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    AxiosPublic.get(`rentals/${rentalId}`)
      .then((response) => {
        dispatch(setElementToDisplay(response.data));
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          navigate('/*');
        }
        else {
          console.error(err);
        }
      });
  }, []);

  if (isLoading) {
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
