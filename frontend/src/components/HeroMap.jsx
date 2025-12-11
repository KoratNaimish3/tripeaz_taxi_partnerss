import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import anime from "animejs";

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom red pin icon for Rajkot
const redPinIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom yellow car icon
const createCarIcon = () => {
  return L.divIcon({
    className: "custom-car-icon",
    html: `<div style="
      background-color: #facc15;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      font-size: 18px;
    ">🚕</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

// Major cities in Gujarat with coordinates
const gujaratCities = [
  { name: "Rajkot", lat: 22.3039, lng: 70.8022, icon: "red", isMain: true },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714, icon: "default" },
  { name: "Surat", lat: 21.1702, lng: 72.8311, icon: "default" },
  { name: "Vadodara", lat: 22.3072, lng: 73.1812, icon: "default" },
  { name: "Bhavnagar", lat: 21.7645, lng: 72.1519, icon: "car" },
  { name: "Jamnagar", lat: 22.4707, lng: 70.0586, icon: "default" },
  { name: "Gandhinagar", lat: 23.2156, lng: 72.6369, icon: "default" },
  { name: "Junagadh", lat: 21.5222, lng: 70.4579, icon: "default" },
  { name: "Porbandar", lat: 21.6419, lng: 69.6293, icon: "default" },
  { name: "Anand", lat: 22.5645, lng: 72.9289, icon: "default" },
  { name: "Morbi", lat: 22.8173, lng: 70.8372, icon: "default" },
  { name: "Gondal", lat: 21.9667, lng: 70.8000, icon: "default" },
  { name: "Jetpur", lat: 21.7500, lng: 70.6167, icon: "default" },
  { name: "Surendranagar", lat: 22.7275, lng: 71.6278, icon: "default" },
  { name: "Bhuj", lat: 23.2419, lng: 69.6667, icon: "default" },
  { name: "Gandhidham", lat: 23.0833, lng: 70.1333, icon: "default" },
  { name: "Amreli", lat: 21.6000, lng: 71.2167, icon: "default" },
];

export default function HeroMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    // Animate map entrance
    if (mapRef.current) {
      anime({
        targets: mapRef.current,
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 1000,
        delay: 500,
        easing: "easeOutExpo",
      });
    }
  }, []);

  // Center of Gujarat
  const gujaratCenter = [23.0225, 71.5];
  const defaultZoom = 7;

  return (
    <div ref={mapRef} className="relative w-full h-96 lg:h-[500px] rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200">
      <MapContainer
        center={gujaratCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-full w-full z-0"
        style={{ borderRadius: "0.75rem" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topleft" />

        {/* City Markers */}
        {gujaratCities.map((city, index) => {
          let icon;
          if (city.icon === "red") {
            icon = redPinIcon;
          } else if (city.icon === "car") {
            icon = createCarIcon();
          } else {
            icon = L.icon({
              iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
              shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            });
          }

          return (
            <Marker
              key={index}
              position={[city.lat, city.lng]}
              icon={icon}
            >
              <Popup>
                <div className="text-center">
                  <strong className="text-brand-yellow">{city.name}</strong>
                  <br />
                  <span className="text-sm text-gray-600">Gujarat, India</span>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}



