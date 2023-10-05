import { Form, Row } from 'react-bootstrap';
import './TracksMap.scss';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer, TileLayer, Marker,
} from 'react-leaflet';
import { Icon } from 'leaflet';
import { useState } from 'react';

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

  const searchQuery = 'Elne';

  const apiUrl = `http://api.geonames.org/postalCodeSearchJSON?placename=${encodeURIComponent(searchQuery)}&maxRows=10&username=locautocross`;

  const [geo, setGeo] = useState([]);

  // Effectuer la requête HTTP pour obtenir les résultats
  fetch(apiUrl)
    .then(async (response) => {
      const data = await response.json();
      console.log(data);
      setGeo([data.postalCodes[0].lat, data.postalCodes[0].lng]);
    })
    .catch((error) => {
      console.error('Erreur lors de la requête API :', error);
    });

  if (geo.length === 0) {
    return null;
  }

  console.log(geo);

  const custom = new Icon({ iconUrl: 'https://cdn.icon-icons.com/icons2/930/PNG/512/cross_icon-icons.com_72347.png', iconSize: [38, 38] });
  return (
    <div style={{ height: '50vh' }}>
      <MapContainer center={[46.603354, 1.888334]} zoom={getZoomLevel()} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={geo} icon={custom} />
      </MapContainer>
    </div>
  );
}

export default TracksMap;
