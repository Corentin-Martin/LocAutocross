import 'leaflet/dist/leaflet.css';
import {
  MapContainer, TileLayer, Marker,
} from 'react-leaflet';
import { Icon } from 'leaflet';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import TrackPopup from './TrackPopup/TrackPopup';

function TracksMap({ fromTrackPage }) {
  const tracks = useSelector((state) => state.map.tracks);

  const custom = new Icon({ iconUrl: 'https://cdn.icon-icons.com/icons2/656/PNG/512/pin_gps_location_find_map_search_icon-icons.com_59982.png', iconSize: [24, 24] });
  return (
    <div style={{ height: '50vh', width: '100%' }} className={fromTrackPage ? 'mb-3' : ''}>

      <MapContainer center={[46.603354, 1.888334]} zoom="5" scrollWheelZoom style={{ height: '100%', width: '100%' }}>
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
            {!fromTrackPage && <TrackPopup trackId={oneTrack.id} />}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

TracksMap.defaultProps = {
  fromTrackPage: false,
};

export default TracksMap;
