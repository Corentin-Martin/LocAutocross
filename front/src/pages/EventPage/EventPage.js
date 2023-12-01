import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { setElementToDisplay } from '../../actions/dashboard';
import AxiosPublic from '../../utils/AxiosPublic';
import CardComponent from '../../components/CardComponent/CardComponent';
import EventComponent from '../../components/CardComponent/EventComponent/EventComponent';
import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function EventPage() {
  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (elementToDisplay === null) {
      AxiosPublic.get(`events/${eventId}`)
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
    }
    else {
      setIsLoading(false);
    }
  }, [elementToDisplay]);

  if (elementToDisplay === null) {
    return <LoadingSpinner />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (

    <GeneralLayout
      pageTitle={`${elementToDisplay.title !== null ? `${elementToDisplay.title} - ` : ''}${elementToDisplay.track.city} - ${moment(elementToDisplay).format('DD/MM/YYYY')}`}
      description={`Découvrez les informations et véhicules à louer pour : ${elementToDisplay.title !== null ? `${elementToDisplay.title} - ` : ''}${elementToDisplay.track.city} - ${moment(elementToDisplay).format('DD/MM/YYYY')}`}
      childComponent={(
        <CardComponent
          childComponent={<EventComponent event={elementToDisplay} />}
        />
            )}
    />

  );
}

export default EventPage;
