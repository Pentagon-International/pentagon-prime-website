"use client";

import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import RouteLayer from "./RouteLayer";
import "leaflet/dist/leaflet.css";
import "./map.css";
import L from "leaflet";

/* FIX MARKER ICONS (NEXT.JS ISSUE) */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function RouteMap({ origin, destination }) {
  return (
    <MapContainer
        center={[20, 0]}
        zoom={1}
        minZoom={1}
        maxZoom={7}
        zoomControl={false}
        scrollWheelZoom={false}
        style={{ height: "80vh", width: "100%" }}
    >
        <ZoomControl position="bottomright" />
        <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RouteLayer
            origin={origin}
            destination={destination}
        />
    </MapContainer>
  );
}
