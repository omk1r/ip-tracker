import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ lat, lng }) => (
  <MapContainer
    center={[lat, lng]}
    zoom={13}
    scrollWheelZoom={false}
    style={{ height: '100vh', width: '100%' }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />
    <Marker position={[lat, lng]}>
      <Popup>Location found here.</Popup>
    </Marker>
  </MapContainer>
);

export default Map;
