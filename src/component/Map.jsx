import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customMarkerIcon from '../assets/images/icon-location.svg';

const customIcon = L.icon({
  iconUrl: customMarkerIcon,
  iconSize: [30, 30], // Size of the icon
  iconAnchor: [19, 38], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -38], // Point from which the popup should open relative to the iconAnchor
});

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
    <Marker position={[lat, lng]} icon={customIcon}>
      <Popup>Location found here.</Popup>
    </Marker>
  </MapContainer>
);

export default Map;
