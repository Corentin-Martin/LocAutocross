import { useEffect, useState } from 'react';
import { Popup } from 'react-leaflet';
import { Spinner } from 'react-bootstrap';
import AxiosPublic from '../../../utils/AxiosPublic';
import TrackComponent from '../../CardComponent/TrackComponent/TrackComponent';
import CardComponent from '../../CardComponent/CardComponent';
import './TrackPopup.scss';

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

        <CardComponent childComponent={<TrackComponent extract track={track} />} />

      )}
    </Popup>
  );
}

export default TrackPopup;
