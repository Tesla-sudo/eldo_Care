import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function GeoHeatmap({ points }) {
  return (
    <MapContainer center={[0.52, 35.27]} zoom={11} className="h-96 w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {points.map((p, i) => (
        <Circle
          key={i}
          center={[p.lat, p.lng]}
          radius={p.intensity * 200}
          pathOptions={{ color: "red" }}
        />
      ))}
    </MapContainer>
  );
}
