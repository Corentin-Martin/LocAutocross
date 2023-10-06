import { Form, Row, Spinner } from 'react-bootstrap';
import './TracksMap.scss';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';
import AxiosPublic from '../../utils/AxiosPublic';

function TracksMap() {
  const getZoomLevel = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) {
      return 5;
    } if (screenWidth >= 768) {
      return 4;
    }
    return 3;
  };

  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AxiosPublic.get('tracks')
      .then((response) => {
        setTracks(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const custom = new Icon({ iconUrl: 'https://cdn.icon-icons.com/icons2/930/PNG/512/cross_icon-icons.com_72347.png', iconSize: [38, 38] });
  return (
    <div style={{ height: '50vh' }}>

      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <MapContainer center={[46.603354, 1.888334]} zoom={getZoomLevel()} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {tracks.map((oneTrack) => (
            <Marker
              key={oneTrack.id}
              position={[oneTrack.latitude, oneTrack.longitude]}
              icon={custom}
            >
              <Popup>
                <div>{oneTrack.city} - {oneTrack.postCode} - {oneTrack.department}</div>
                {oneTrack.name !== null && <div>{oneTrack.name}</div>}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}

export default TracksMap;
