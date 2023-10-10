import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { setElementToDisplay } from '../../actions/dashboard';
import AxiosPublic from '../../utils/AxiosPublic';
import CardComponent from '../../components/CardComponent/CardComponent';
import EventComponent from '../../components/CardComponent/EventComponent/EventComponent';

function EventPage() {
  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (elementToDisplay === null) {
      AxiosPublic.get(`events/${eventId}`)
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
  }, []);
  return (
    <div className="d-flex justify-content-center">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <CardComponent
          childComponent={<EventComponent event={elementToDisplay} />}
        />
      )}
    </div>
  );
}

export default EventPage;
