import { Spinner } from 'react-bootstrap';
import './MyEvents.scss';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

import AxiosPrivate from '../../utils/AxiosPrivate';
import MasterMy from '../MasterMy/MasterMy';

function MyEvents() {
  const eventDetail = useSelector((state) => state.dashboard.event);
  const [isLoading, setIsLoading] = useState(true);
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    AxiosPrivate.get('events?my')
      .then((response) => {
        const past = [];
        const future = [];
        const allEvents = [];

        response.data.forEach((event) => (
          (moment(event.start) > moment())
            ? future.push(event)
            : past.push(event)
        ));

        allEvents.push(past);
        allEvents.push(future);

        setMyEvents(allEvents);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [eventDetail]);

  return (
    <div className="d-flex flex-column align-items-center col-12 col-md-8 mt-3">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <MasterMy myThings={myEvents} type="event" />
      )}
    </div>
  );
}

export default MyEvents;
