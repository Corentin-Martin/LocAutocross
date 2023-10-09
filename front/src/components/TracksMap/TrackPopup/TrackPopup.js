import { useEffect, useState } from 'react';
import { Popup } from 'react-leaflet';
import { Spinner } from 'react-bootstrap';
import moment from 'moment';
import AxiosPublic from '../../../utils/AxiosPublic';

function TrackPopup({ trackId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [track, setTrack] = useState(null);

  useEffect(() => {
    AxiosPublic.get(`tracks/${trackId}`)
      .then((response) => {
        setTrack(response.data);
        setIsLoading(false);
      }).catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <Popup>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <>
          <div>{track.city} - {track.postCode} - {track.department}</div>
          {track.name !== null && <div>{track.name}</div>}
          {track.events !== '' && (
          <ul>
            {track.events.map((event) => (
              <li>{moment(event.start).format('DD/MM/YYYY')}</li>))}
          </ul>
          )}
        </>
      )}
    </Popup>
  );
}

export default TrackPopup;
