import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icons
const taxiIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png",
  iconSize: [40, 40],
});

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  iconSize: [40, 40],
});

export default function MapSection() {
  const positionRajkot = [22.3039, 70.8022];
  const positionBhavnagar = [21.7645, 72.1519];

  return (
    <section
      id="map"
      className="w-full flex flex-col items-center justify-center py-16 bg-gradient-to-b from-yellow-50 to-white"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Live Taxi Partner Map
      </h2>

      <div className="w-[90%] md:w-[70%] h-[450px] rounded-2xl shadow-2xl overflow-hidden border-4 border-yellow-400">
        <MapContainer
          center={[22.3039, 70.8022]}
          zoom={8}
          scrollWheelZoom={false}
          className="h-full w-full z-10"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Taxi Marker */}
          <Marker position={positionRajkot} icon={taxiIcon}>
            <Popup>🚖 Taxi Available in Rajkot</Popup>
          </Marker>

          {/* User Marker */}
          <Marker position={positionBhavnagar} icon={userIcon}>
            <Popup>👤 Customer in Bhavnagar</Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
}
