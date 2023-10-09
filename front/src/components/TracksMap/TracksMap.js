import { Spinner } from 'react-bootstrap';
import './TracksMap.scss';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AxiosPublic from '../../utils/AxiosPublic';
import TrackPopup from './TrackPopup/TrackPopup';

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

  const tracks = useSelector((state) => state.map.tracks);
  const [isLoading, setIsLoading] = useState(false);

  const custom = new Icon({ iconUrl: 'https://cdn.icon-icons.com/icons2/656/PNG/512/pin_gps_location_find_map_search_icon-icons.com_59982.png', iconSize: [24, 24] });
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
          {tracks !== null && tracks.map((oneTrack) => (
            <Marker
              key={oneTrack.id}
              position={[oneTrack.latitude, oneTrack.longitude]}
              icon={custom}
            >
              <TrackPopup trackId={oneTrack.id} />

            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}

export default TracksMap;
